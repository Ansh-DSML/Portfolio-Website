/**
 * Contact form routes
 * Defines API endpoints for contact form
 */

import express from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import { validateContactInput } from '../middleware/validateInput.js';
import { contactRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * POST /api/contact
 * Submit contact form
 * 
 * Body:
 * - name (required, string, 2-100 chars)
 * - email (required, valid email)
 * - reason (required, one of allowed values)
 * - message (optional, string, max 2000 chars)
 */
router.post(
  '/',
  contactRateLimiter, // Apply rate limiting
  validateContactInput, // Validate and sanitize input
  submitContact // Handle submission
);

export default router;

