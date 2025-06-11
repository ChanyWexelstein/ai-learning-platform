import { Request, Response, NextFunction } from 'express';

/**
 * Middleware לניתוב שגיאות כלליות באפליקציה.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Something went wrong' });
};

/**
 * עטיפה לפונקציות אסינכרוניות שמעבירה שגיאות ל־errorHandler אוטומטית.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
