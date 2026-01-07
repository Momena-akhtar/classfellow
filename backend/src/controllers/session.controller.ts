import { Request, Response } from "express";
import { SessionService } from "../services/session.service";

const sessionService = new SessionService();

export class SessionController {

  async startSession(req: Request, res: Response) {
    try {
      const { courseId, studentId } = req.body;

      if (!courseId || !studentId) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_REQUIRED_FIELDS",
            message: "courseId and studentId are required"
          }
        });
      }

      const result = await sessionService.startSession(courseId, studentId);

      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(500).json(result);
      }
    } catch (error) {
      console.error("Error in startSession controller:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to start session"
        }
      });
    }
  }

  async endSession(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_SESSION_ID",
            message: "Session ID is required"
          }
        });
      }

      const result = await sessionService.endSession(sessionId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in endSession controller:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to end session"
        }
      });
    }
  }

  async addChunk(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const { text, timestamp } = req.body;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_SESSION_ID",
            message: "Session ID is required"
          }
        });
      }

      if (!text || typeof text !== 'string' || text.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: {
            code: "INVALID_TEXT",
            message: "Valid text is required"
          }
        });
      }

      if (!timestamp || typeof timestamp !== 'number') {
        return res.status(400).json({
          success: false,
          error: {
            code: "INVALID_TIMESTAMP",
            message: "Valid timestamp is required"
          }
        });
      }

      const result = await sessionService.addChunk(sessionId, text.trim(), timestamp);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in addChunk controller:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to add chunk"
        }
      });
    }
  }

  async getSessionData(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_SESSION_ID",
            message: "Session ID is required"
          }
        });
      }

      const result = await sessionService.getSessionData(sessionId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in getSessionData controller:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve session data"
        }
      });
    }
  }

  async getSessionStatus(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_SESSION_ID",
            message: "Session ID is required"
          }
        });
      }

      const result = await sessionService.getSessionStatus(sessionId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in getSessionStatus controller:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to retrieve session status"
        }
      });
    }
  }

  async triggerAI(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          error: {
            code: "MISSING_SESSION_ID",
            message: "Session ID is required"
          }
        });
      }

      const result = await sessionService.triggerAI(sessionId);

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(404).json(result);
      }
    } catch (error) {
      console.error("Error in triggerAI controller:", error);
      res.status(500).json({
        success: false,
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to trigger AI processing"
        }
      });
    }
  }

  async getUserSessions(req: Request, res: Response) {
    try {
      const studentId = req.user?._id?.toString() || req.user?.id;

      if (!studentId) {
        return res.status(401).json({
          success: false,
          message: 'Not authenticated'
        });
      }

      const result = await sessionService.getUserSessions(studentId);

      if (result.success) {
        res.status(200).json({
          success: true,
          message: result.message,
          sessions: result.sessions
        });
      } else {
        res.status(500).json({
          success: false,
          message: result.message
        });
      }
    } catch (error) {
      console.error('Error in getUserSessions controller:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch sessions'
      });
    }
  }
}

export const sessionController = new SessionController();
