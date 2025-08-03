import { sql } from "../config/db.config.js";

/**
 * Create activity log
 * @param {number} userId - User ID
 * @param {string} action - Action type (e.g., 'LOGIN', 'LOGOUT')
 * @param {string} ipAddress - User IP address
 * @param {string} userAgent - User agent string
 * @param {object} [metadata] - Additional metadata (optional)
 * @returns {Promise<object>} Created log entry
 */
export const createLog = async (
  userId,
  action,
  ipAddress,
  userAgent,
  metadata = {}
) => {
  try {
    const [logEntry] = await sql`
      INSERT INTO logs (
        user_id,
        action,
        ip_address,
        user_agent,
        metadata
      ) VALUES (
        ${userId},
        ${action},
        ${ipAddress},
        ${userAgent},
        ${metadata}
      ) RETURNING *
    `;

    return logEntry;
  } catch (error) {
    console.error("Error creating log:", error);

    // Fallback to console logging if database fails
    console.log({
      timestamp: new Date().toISOString(),
      userId,
      action,
      ipAddress,
      userAgent,
      metadata,
    });

    throw new Error("Failed to create log entry");
  }
};

/**
 * Get logs for a specific user
 * @param {number} userId - User ID
 * @param {number} [limit=100] - Maximum number of logs to return
 * @returns {Promise<Array>} Array of log entries
 */
export const getUserLogs = async (userId, limit = 100) => {
  try {
    const logs = await sql`
      SELECT * FROM logs 
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return logs;
  } catch (error) {
    console.error("Error fetching user logs:", error);
    throw new Error("Failed to fetch user logs");
  }
};

/**
 * Get all logs (admin only)
 * @param {number} [limit=100] - Maximum number of logs to return
 * @param {string} [actionFilter] - Filter by specific action
 * @returns {Promise<Array>} Array of log entries
 */
export const getAllLogs = async (limit = 100, actionFilter) => {
  try {
    let query = sql`
      SELECT * FROM logs
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;

    if (actionFilter) {
      query = sql`
        SELECT * FROM logs
        WHERE action = ${actionFilter}
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
    }

    const logs = await query;
    return logs;
  } catch (error) {
    console.error("Error fetching all logs:", error);
    throw new Error("Failed to fetch logs");
  }
};
