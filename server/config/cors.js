/**
 * CORS configuration
 * Allows requests only from specified origins
 */

import cors from 'cors';

/**
 * Explicitly allowed origins
 * Update this list if adding new frontend deployments
 */
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://portfolio-website-psi-eight-bj2g4psdik.vercel.app',
];

/**
 * CORS configuration options
 */
export const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (server-to-server requests)
    if (!origin) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[CORS] Allowing request with no origin (server-to-server)');
      }
      return callback(null, true);
    }

    // Log origin for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log(`[CORS] Request from origin: ${origin}`);
    }

    if (ALLOWED_ORIGINS.includes(origin)) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[CORS] Allowing request from: ${origin}`);
      }
      callback(null, true);
    } else {
      // Log rejected origin
      console.error(`[CORS] Rejected request from origin: ${origin}`);
      console.error(`[CORS] Allowed origins: ${ALLOWED_ORIGINS.join(', ')}`);
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

