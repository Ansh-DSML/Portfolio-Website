/**
 * Input sanitization utilities
 * Protects against XSS and injection attacks
 */

/**
 * Sanitizes a string by removing potentially dangerous characters
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export function sanitizeString(input) {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers (onclick, onerror, etc.)
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: protocol
    .replace(/javascript:/gi, '')
    // Remove data: URLs that could contain scripts
    .replace(/data:text\/html/gi, '')
    // Remove SQL injection patterns (basic)
    .replace(/(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi, '')
    // Trim whitespace
    .trim();
}

/**
 * Sanitizes an email address
 * @param {string} email - The email to sanitize
 * @returns {string} - Sanitized email (lowercase, trimmed)
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') {
    return '';
  }

  return email
    .toLowerCase()
    .trim()
    // Remove any whitespace
    .replace(/\s/g, '');
}

/**
 * Validates email format and checks for common issues
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid format
 */
export function isValidEmailFormat(email) {
  if (typeof email !== 'string') {
    return false;
  }

  // Basic email regex (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Check format
  if (!emailRegex.test(email)) {
    return false;
  }

  // Reject common disposable email patterns (basic check)
  const disposablePatterns = [
    /^.*@(10minutemail|tempmail|guerrillamail|mailinator|throwaway)\./i,
  ];
  
  for (const pattern of disposablePatterns) {
    if (pattern.test(email)) {
      return false;
    }
  }

  // Check for suspicious patterns
  if (email.length > 254) { // RFC 5321 limit
    return false;
  }

  return true;
}

/**
 * Checks if a string contains potentially malicious content
 * @param {string} input - Input to check
 * @returns {boolean} - True if potentially malicious
 */
export function containsMaliciousContent(input) {
  if (typeof input !== 'string') {
    return false;
  }

  const maliciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /data:text\/html/i,
    /eval\s*\(/i,
    /expression\s*\(/i,
    /\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b/i,
  ];

  return maliciousPatterns.some(pattern => pattern.test(input));
}

