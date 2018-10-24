import { Request, Response, NextFunction } from "express";

export default function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const defaultDomain = process.env.APP_BASE_URL;

  const allowedDomains = [
    defaultDomain,
    "http://localhost:5000",
    "https://reactive-ee09d.firebaseapp.com",
    "https://reactivepixels.com",
    "https://www.reactivepixels.com",
    "https://staging.reactivepixels.com",
    "https://preview.reactivepixels.com"
  ];

  const origin = req.headers ? (req.headers.origin as string) : defaultDomain;

  const finalOrigin =
    allowedDomains.indexOf(origin) >= 0 ? origin : defaultDomain;

  res.header("Access-Control-Allow-Origin", finalOrigin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Token, Authorization, Content-Type"
  );

  next();
}
