import { drizzle } from 'drizzle-orm/node-postgres';
import pkg from 'pg';
import * as schema from './schema.ts';
import fs from 'fs';
import path from 'path';
import { getTableConfig } from 'drizzle-orm/pg-core';

const { Pool } = pkg;

export const createPool = () => {
  return new Pool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB_NAME,
    connectionTimeoutMillis: 15000,
  });
};

let realDb: any = null;
const isSqlConfigured = !!process.env.SQL_HOST;

if (isSqlConfigured) {
  try {
    const pool = createPool();
    pool.on('error', (err) => {
      console.error('Unexpected error on idle SQL pool client:', err);
    });
    realDb = drizzle(pool, { schema });
  } catch (err) {
    console.error('Error initializing PostgreSQL pool, falling back to local file db:', err);
    realDb = null;
  }
}

// ==========================================
// MOCK JSON-FILE DATABASE ENGINE FALLBACK
// ==========================================

const DB_FILE_PATH = path.join(process.cwd(), 'src/db/local_db.json');

function ensureDbFile() {
  if (!fs.existsSync(DB_FILE_PATH)) {
    const parentDir = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
      users: [],
      products: [],
      cart: [],
      orders: []
    }, null, 2), 'utf-8');
  }
}

function loadDbData() {
  ensureDbFile();
  try {
    const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading local_db.json, recreating:', err);
    const initial = { users: [], products: [], cart: [], orders: [] };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initial, null, 2), 'utf-8');
    return initial;
  }
}

function saveDbData(data: any) {
  ensureDbFile();
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function getNextId(tableData: any[]): number {
  const ids = tableData.map(item => item.id).filter(id => typeof id === 'number');
  if (ids.length === 0) return 1;
  return Math.max(...ids) + 1;
}

function dbToJsName(name: string): string {
  if (name === 'uid') return 'uid';
  return name.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
}

function parseSqlExpression(expr: any): any {
  if (!expr) return null;
  if (!expr.queryChunks) return null;
  
  const chunks = expr.queryChunks;
  const columns = chunks.filter((c: any) => c && typeof c.name === 'string');
  const params = chunks.filter((c: any) => c && c.constructor && c.constructor.name === 'Param');
  
  if (columns.length === 1 && params.length === 1) {
    return { type: 'eq', field: columns[0].name, value: params[0].value };
  }
  
  const sqlObjects = chunks.filter((c: any) => c && c.queryChunks);
  if (sqlObjects.length > 0) {
    const parsedParts = sqlObjects.map((s: any) => parseSqlExpression(s)).filter(Boolean);
    if (parsedParts.length > 0) {
      const conditions: any[] = [];
      for (const part of parsedParts) {
        if (part.type === 'and') {
          conditions.push(...part.conditions);
        } else {
          conditions.push(part);
        }
      }
      return { type: 'and', conditions };
    }
  }
  
  const allColumns: string[] = [];
  const allParams: any[] = [];
  function traverse(item: any) {
    if (!item) return;
    if (typeof item.name === 'string') {
      allColumns.push(item.name);
    } else if (item.constructor && item.constructor.name === 'Param') {
      allParams.push(item.value);
    } else if (item.queryChunks) {
      item.queryChunks.forEach(traverse);
    }
  }
  chunks.forEach(traverse);
  
  if (allColumns.length === 1 && allParams.length === 1) {
    return { type: 'eq', field: allColumns[0], value: allParams[0] };
  } else if (allColumns.length > 1 && allParams.length === allColumns.length) {
    const conditions = allColumns.map((col, idx) => ({ type: 'eq', field: col, value: allParams[idx] }));
    return { type: 'and', conditions };
  }
  return null;
}

function matchesCondition(item: any, cond: any): boolean {
  if (!cond) return true;
  if (cond.type === 'eq') {
    const jsName = dbToJsName(cond.field);
    const itemValue = item[jsName];
    return String(itemValue) === String(cond.value);
  }
  if (cond.type === 'and') {
    return cond.conditions.every((c: any) => matchesCondition(item, c));
  }
  return true;
}

class MockQueryBuilder {
  private tableName: string = '';
  private isCount: boolean = false;
  private condition: any = null;
  private sorting: boolean = false;
  private valuesToInsertOrSet: any = null;
  private onConflictDoUpdateConfig: any = null;

  constructor(private operation: 'select' | 'insert' | 'update' | 'delete', tableOrFields?: any) {
    if (operation === 'select') {
      if (tableOrFields && typeof tableOrFields === 'object') {
        const keys = Object.keys(tableOrFields);
        if (keys.length > 0 && tableOrFields[keys[0]] && tableOrFields[keys[0]].constructor && tableOrFields[keys[0]].constructor.name === 'SQL') {
          this.isCount = true;
        }
      }
    } else if (tableOrFields) {
      try {
        this.tableName = getTableConfig(tableOrFields).name;
      } catch {
        this.tableName = '';
      }
    }
  }

  from(table: any) {
    try {
      this.tableName = getTableConfig(table).name;
    } catch {
      this.tableName = '';
    }
    return this;
  }

  where(expr: any) {
    this.condition = parseSqlExpression(expr);
    return this;
  }

  orderBy(expr: any) {
    this.sorting = true;
    return this;
  }

  set(values: any) {
    this.valuesToInsertOrSet = values;
    return this;
  }

  values(values: any) {
    this.valuesToInsertOrSet = values;
    return this;
  }

  onConflictDoUpdate(config: any) {
    this.onConflictDoUpdateConfig = config;
    return this;
  }

  returning() {
    return this;
  }

  async then(onfulfilled?: (value: any) => any, onrejected?: (reason: any) => any): Promise<any> {
    try {
      const result = await this.execute();
      if (onfulfilled) {
        return onfulfilled(result);
      }
      return result;
    } catch (err) {
      if (onrejected) {
        return onrejected(err);
      }
      throw err;
    }
  }

  async execute(): Promise<any> {
    const data = loadDbData();
    const tableData = data[this.tableName] || [];

    if (this.operation === 'select') {
      if (this.isCount) {
        return [{ value: tableData.length }];
      }

      let results = [...tableData];
      if (this.condition) {
        results = results.filter((item: any) => matchesCondition(item, this.condition));
      }

      if (this.sorting) {
        results.sort((a: any, b: any) => {
          const t1 = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const t2 = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return t2 - t1;
        });
      }

      return results;
    }

    if (this.operation === 'insert') {
      let payload = this.valuesToInsertOrSet;
      if (!payload) return [];

      const payloads = Array.isArray(payload) ? payload : [payload];
      const insertedRows: any[] = [];

      for (const singlePayload of payloads) {
        const itemToInsert = { ...singlePayload };

        if (itemToInsert.id === undefined && (this.tableName === 'users' || this.tableName === 'cart')) {
          itemToInsert.id = getNextId(tableData);
        }
        if (itemToInsert.createdAt === undefined) {
          itemToInsert.createdAt = new Date().toISOString();
        }

        let handledConflict = false;
        if (this.onConflictDoUpdateConfig) {
          const targetCol = this.onConflictDoUpdateConfig.target;
          let targetField = '';
          if (targetCol && typeof targetCol.name === 'string') {
            targetField = dbToJsName(targetCol.name);
          } else if (targetCol && targetCol.constructor && targetCol.constructor.name === 'Column') {
            targetField = targetCol.name;
          }

          if (targetField && itemToInsert[targetField] !== undefined) {
            const conflictIndex = tableData.findIndex(
              (item: any) => String(item[targetField]) === String(itemToInsert[targetField])
            );

            if (conflictIndex !== -1) {
              const setValues = this.onConflictDoUpdateConfig.set || {};
              const updatedItem = {
                ...tableData[conflictIndex],
                ...setValues,
              };
              tableData[conflictIndex] = updatedItem;
              insertedRows.push(updatedItem);
              handledConflict = true;
            }
          }
        }

        if (!handledConflict) {
          tableData.push(itemToInsert);
          insertedRows.push(itemToInsert);
        }
      }

      data[this.tableName] = tableData;
      saveDbData(data);

      return insertedRows;
    }

    if (this.operation === 'update') {
      const setValues = this.valuesToInsertOrSet || {};
      const updatedRows: any[] = [];

      for (let i = 0; i < tableData.length; i++) {
        if (!this.condition || matchesCondition(tableData[i], this.condition)) {
          const updatedItem = {
            ...tableData[i],
            ...setValues,
          };
          tableData[i] = updatedItem;
          updatedRows.push(updatedItem);
        }
      }

      data[this.tableName] = tableData;
      saveDbData(data);

      return updatedRows;
    }

    if (this.operation === 'delete') {
      const remainingRows: any[] = [];
      const deletedRows: any[] = [];

      for (const item of tableData) {
        if (!this.condition || matchesCondition(item, this.condition)) {
          deletedRows.push(item);
        } else {
          remainingRows.push(item);
        }
      }

      data[this.tableName] = remainingRows;
      saveDbData(data);

      return deletedRows;
    }

    return [];
  }
}

const mockDbInstance = {
  select: (fields?: any) => new MockQueryBuilder('select', fields),
  insert: (table: any) => new MockQueryBuilder('insert', table),
  update: (table: any) => new MockQueryBuilder('update', table),
  delete: (table: any) => new MockQueryBuilder('delete', table),
  execute: async (statement: any) => {
    console.log('[Mock DB] executing raw statement:', statement);
    return { rows: [] };
  }
};

export const db = isSqlConfigured && realDb ? realDb : mockDbInstance;
