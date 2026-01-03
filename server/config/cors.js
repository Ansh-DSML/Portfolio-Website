/**
 * CORS configuration
 * Allows requests only from specified origins
 */

import cors from 'cors';

/**
 * Get allowed origins from environment variables
 * @returns {string[]} - Array of allowed origins
 */
function getAllowedOrigins() {
  const origin = process.env.ALLOWED_ORIGIN;
  
  if (!origin) {
    // Fallback to localhost for development
    return ['http://localhost:3000'];
  }

  // Support multiple origins (comma-separated)
  return origin.split(',').map(o => o.trim()).filter(Boolean);
}

/**
 * CORS configuration options
 */
export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server requests)
    if (!origin) {
      return callback(null, true);
    }

    const allowedOrigins = getAllowedOrigins();
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
  credentials: false,
  maxAge: 86400, // 24 hours
};

/**
 * CORS middleware
 */
export default cors(corsOptions);

