import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function requireAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Sign in to continue.' } });
    const { sub } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(sub);
    if (!req.user) return res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'Account not found.' } });
    next();
  } catch { res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'Please sign in again.' } }); }
}
export const allowRoles = (...roles) => (req, res, next) => roles.includes(req.user?.role) ? next() : res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'Your account role cannot perform this action.' } });
