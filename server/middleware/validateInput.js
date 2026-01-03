/**
 * Input validation middleware
 * Validates and sanitizes contact form inputs
 */

import { sanitizeString, sanitizeEmail, isValidEmailFormat, containsMaliciousContent } from '../utils/sanitize.js';

/**
 * Allowed reason values (whitelist)
 */
const ALLOWED_REASONS = [
  'Hiring / Job Opportunity',
  'Project Collaboration',
  'Freelance / Contract Work',
  'General Inquiry',
];

/**
 * Validates contact form input
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
export function validateContactInput(req, res, next) {
  const errors = [];
  const { name, email, reason, message, role } = req.body;

  // Validate name
  if (!name || typeof name !== 'string') {
    errors.push('Name is required and must be a string');
  } else {
    const sanitizedName = sanitizeString(name);
    
    if (sanitizedName.length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (sanitizedName.length > 100) {
      errors.push('Name must be no more than 100 characters long');
    } else if (containsMaliciousContent(name)) {
      errors.push('Name contains invalid characters');
    } else {
      req.body.name = sanitizedName;
    }
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    errors.push('Email is required and must be a string');
  } else {
    const sanitizedEmail = sanitizeEmail(email);
    
    if (!isValidEmailFormat(sanitizedEmail)) {
      errors.push('Invalid email address');
    } else if (containsMaliciousContent(email)) {
      errors.push('Email contains invalid characters');
    } else {
      req.body.email = sanitizedEmail;
    }
  }

  // Validate reason
  if (!reason || typeof reason !== 'string') {
    errors.push('Reason is required and must be a string');
  } else {
    const sanitizedReason = sanitizeString(reason);
    
    if (!ALLOWED_REASONS.includes(sanitizedReason)) {
      errors.push(`Reason must be one of: ${ALLOWED_REASONS.join(', ')}`);
    } else {
      req.body.reason = sanitizedReason;
    }
  }

  // Validate message (optional)
  if (message !== undefined && message !== null) {
    if (typeof message !== 'string') {
      errors.push('Message must be a string');
    } else {
      const sanitizedMessage = sanitizeString(message);
      
      if (sanitizedMessage.length > 2000) {
        errors.push('Message must be no more than 2000 characters long');
      } else if (containsMaliciousContent(message)) {
        errors.push('Message contains invalid characters');
      } else {
        // Store sanitized message (normalization happens in controller)
        req.body.message = sanitizedMessage;
      }
    }
  }
  // Note: Message is optional - if not provided, it stays undefined (normalization in controller)

  // Validate role (optional)
  if (role !== undefined && role !== null) {
    if (typeof role !== 'string') {
      errors.push('Role must be a string');
    } else {
      const sanitizedRole = sanitizeString(role);
      
      if (sanitizedRole.length > 100) {
        errors.push('Role must be no more than 100 characters long');
      } else if (containsMaliciousContent(role)) {
        errors.push('Role contains invalid characters');
      } else {
        // Store sanitized role (normalization happens in controller)
        req.body.role = sanitizedRole;
      }
    }
  }
  // Note: Role is optional - if not provided, it stays undefined (normalization in controller)

  // If there are validation errors, return them
  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: errors[0], // Return first error for simplicity
    });
  }

  // All validation passed, continue to next middleware
  next();
}

