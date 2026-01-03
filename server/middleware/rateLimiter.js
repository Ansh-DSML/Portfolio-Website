/**
 * Rate limiting middleware
 * Protects against abuse and spam
 */

import rateLimit from 'express-rate-limit';

/**
 * Configuration from environment variables with defaults
 */
const WINDOW_MS = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10); // 1 minute
const MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '5', 10);

/**
 * Rate limiter for contact form endpoint
 * Limits: 5 requests per minute per IP (default)
 */
export const contactRateLimiter = rateLimit({
  windowMs: WINDOW_MS,
  max: MAX_REQUESTS,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  // Skip rate limiting for development (optional - remove in production)
  skip: (req) => {
    if (process.env.NODE_ENV === 'development' && req.ip === '::1') {
      return false; // Still apply in development
    }
    return false;
  },
  // Custom handler
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Too many requests. Please try again later.',
    });
  },
});

