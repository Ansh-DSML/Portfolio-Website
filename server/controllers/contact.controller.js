/**
 * Contact form controller
 * Handles contact form submissions
 */

import pool from "../config/db.js";

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
    const normalizedMessage =
      message && message.trim() ? message.trim() : null;

    const normalizedRole =
      reason === "Hiring / Job Opportunity" && role && role.trim()
        ? role.trim()
        : null;

    /* ===============================
       Persist to MySQL (Railway)
       =============================== */
    try {
      const sql = `
        INSERT INTO contact_submissions
        (name, email, reason, role, message, ip_address, origin, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE)
      `;

      const values = [
        name,
        email,
        reason,
        normalizedRole,
        normalizedMessage,
        req.ip || null,
        req.headers.origin || null,
      ];

      await pool.execute(sql, values);
    } catch (dbError) {
      // Log DB error but do NOT fail user request
      console.error("[DB] Failed to insert contact submission:", dbError);
    }

    // Log successful submission
    console.log("[Contact] Successful submission:", {
      name,
      email,
      reason,
      role: normalizedRole || "(not provided)",
      message: normalizedMessage
        ? `(${normalizedMessage.length} chars)`
        : "(empty)",
      timestamp: new Date().toISOString(),
      ip: req.ip,
      origin: req.headers.origin || "(no origin)",
    });

    // Return success response
    res.status(200).json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    // Pass error to error handler middleware
    next(error);
  }
}
