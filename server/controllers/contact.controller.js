/**
 * Contact form controller
 * Handles contact form submissions
 */

/**
 * Handle contact form submission
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next function
 */
export async function submitContact(req, res, next) {
  try {
    const { name, email, reason, message, role } = req.body;

    // Normalize optional fields (set to null if empty or undefined)
    const normalizedMessage = message && message.trim() ? message.trim() : null;
    const normalizedRole = role && role.trim() ? role.trim() : null;

    // TODO: Add database insertion here
    // Example:
    // const contactData = {
    //   name,
    //   email,
    //   reason,
    //   message: normalizedMessage,
    //   role: normalizedRole,
    //   createdAt: new Date(),
    //   ipAddress: req.ip,
    // };
    // await db.contacts.create(contactData);

    // TODO: Add notification/webhook here (e.g., n8n webhook)
    // Example:
    // await fetch(process.env.N8N_WEBHOOK_URL, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(contactData),
    // });

    // For now, just log the submission (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', {
        name,
        email,
        reason,
        role: normalizedRole || '(not provided)',
        message: normalizedMessage || '(empty)',
        timestamp: new Date().toISOString(),
        ip: req.ip,
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Message received successfully',
    });
  } catch (error) {
    // Pass error to error handler middleware
    next(error);
  }
}

