import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../lib/firebase-admin.ts';
import { DecodedIdToken } from 'firebase-admin/auth';

export interface AuthRequest extends Request {
  user?: DecodedIdToken;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing token' });
  }

  const token = authHeader.split('Bearer ')[1];

  // If it's a mock token from local auth or fallback, decode it directly
  if (token.startsWith('mock_token_')) {
    try {
      const payloadStr = Buffer.from(token.slice(11), 'base64').toString('utf-8');
      const userData = JSON.parse(payloadStr);
      req.user = {
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        auth_time: Math.floor(Date.now() / 1000),
        iss: 'https://securetoken.google.com/galvanic-chassis-298sv',
        aud: 'galvanic-chassis-298sv',
        sub: userData.uid,
        exp: Math.floor(Date.now() / 1000) + 3600,
        firebase: {
          identities: {},
          sign_in_provider: 'custom'
        }
      } as any;
      return next();
    } catch (e) {
      console.error('Error decoding mock token:', e);
      return res.status(401).json({ error: 'Unauthorized: Invalid mock token' });
    }
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};
