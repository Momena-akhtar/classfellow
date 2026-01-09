import { Session } from "../models/session";
import { 
  storeSessionData, 
  getSessionData, 
  updateSessionData, 
  deleteSessionData, 
  incrementChunkCount 
} from "../config/redis";

export interface SessionData {
  transcriptionChunks: Array<{timestamp: number, text: string}>;
  summaryArray: Record<string, string>;
  chunkCount: number;
  lastAICall: number;
  sessionStart: number;
}

export interface AddChunkResult {
  success: boolean;
  aiProcessed: boolean;
  summary?: Record<string, string>;
  chunkCount: number;
  message: string;
}

export class SessionService {

  async startSession(courseId: string, studentId: string): Promise<{success: boolean, sessionId: string, message: string}> {
    try {
      const session = new Session({
        course: courseId,
        student: studentId,
        started: new Date(),
        isActive: true,
        meta: {}
      });

      await session.save();

      // Initialize session data in Redis
      const sessionData: SessionData = {
        transcriptionChunks: [],
        summaryArray: {},
        chunkCount: 0,
        lastAICall: Date.now(),
        sessionStart: Date.now()
      };

      await storeSessionData(session._id.toString(), sessionData);

      return {
        success: true,
        sessionId: session._id.toString(),
        message: "Session started successfully"
      };
    } catch (error) {
      console.error("Error starting session:", error);
      return {
        success: false,
        sessionId: "",
        message: "Failed to start session"
      };
    }
  }

  async endSession(sessionId: string, transcription?: string, duration?: number): Promise<{success: boolean, finalSummary: Record<string, string>, message: string}> {
    try {
      const sessionData = await getSessionData(sessionId);
      if (!sessionData) {
        return {
          success: false,
          finalSummary: {},
          message: "Session not found"
        };
      }

      // TODO: Make final AI call with all remaining data
      const finalSummary = sessionData.summaryArray;

      await Session.findByIdAndUpdate(sessionId, {
        ended: new Date(),
        isActive: false,
        meta: {
          aiSummary: JSON.stringify(finalSummary),
          transcription: transcription || sessionData.transcriptionChunks.map((chunk: {timestamp: number, text: string}) => chunk.text).join(' '),
          duration: duration || (Date.now() - sessionData.sessionStart),
          keywords: [],
          additionalLinks: [],
          referenceMaterials: []
        }
      });

  
      await deleteSessionData(sessionId);

      return {
        success: true,
        finalSummary,
        message: "Session ended successfully"
      };
    } catch (error) {
      console.error("Error ending session:", error);
      return {
        success: false,
        finalSummary: {},
        message: "Failed to end session"
      };
    }
  }

  async addChunk(sessionId: string, text: string, timestamp: number): Promise<AddChunkResult> {
    try {
      let sessionData = await getSessionData(sessionId);
      if (!sessionData) {
        return {
          success: false,
          aiProcessed: false,
          chunkCount: 0,
          message: "Session not found"
        };
      }

      sessionData.transcriptionChunks.push({ timestamp, text });
      sessionData.chunkCount = await incrementChunkCount(sessionId);

      const shouldCallAI = this.shouldCallAI(sessionData);
      let aiProcessed = false;
      let newSummary = sessionData.summaryArray;

      if (shouldCallAI) {
        // TODO: Call AI service here
        // For now, just update the last AI call time
        sessionData.lastAICall = Date.now();
        aiProcessed = true;
        console.log("AI processing triggered for session:", sessionId);
      }

      await updateSessionData(sessionId, sessionData);

      return {
        success: true,
        aiProcessed,
        summary: newSummary,
        chunkCount: sessionData.chunkCount,
        message: aiProcessed ? "Chunk added and AI processed" : "Chunk added successfully"
      };
    } catch (error) {
      console.error("Error adding chunk:", error);
      return {
        success: false,
        aiProcessed: false,
        chunkCount: 0,
        message: "Failed to add chunk"
      };
    }
  }

  async getSessionData(sessionId: string): Promise<{success: boolean, data?: SessionData, message: string}> {
    try {
      const sessionData = await getSessionData(sessionId);
      if (!sessionData) {
        return {
          success: false,
          message: "Session not found"
        };
      }

      return {
        success: true,
        data: sessionData,
        message: "Session data retrieved successfully"
      };
    } catch (error) {
      console.error("Error getting session data:", error);
      return {
        success: false,
        message: "Failed to retrieve session data"
      };
    }
  }

  async getSessionStatus(sessionId: string): Promise<{success: boolean, session?: any, message: string}> {
    try {
      const session = await Session.findById(sessionId).populate('course student');
      if (!session) {
        return {
          success: false,
          message: "Session not found"
        };
      }

      const sessionData = await getSessionData(sessionId);
      const chunkCount = sessionData?.chunkCount || 0;
      const lastAICall = sessionData?.lastAICall || session.started.getTime();

      return {
        success: true,
        session: {
          id: session._id,
          isActive: session.isActive,
          started: session.started,
          ended: session.ended,
          chunkCount,
          lastAICall: new Date(lastAICall)
        },
        message: "Session status retrieved successfully"
      };
    } catch (error) {
      console.error("Error getting session status:", error);
      return {
        success: false,
        message: "Failed to retrieve session status"
      };
    }
  }

  async triggerAI(sessionId: string): Promise<{success: boolean, summary: Record<string, string>, message: string}> {
    try {
      const sessionData = await getSessionData(sessionId);
      if (!sessionData) {
        return {
          success: false,
          summary: {},
          message: "Session not found"
        };
      }

      // TODO: Call AI service here
      // For now, return current summary
      const summary = sessionData.summaryArray;

      // Update last AI call time
      await updateSessionData(sessionId, { lastAICall: Date.now() });

      return {
        success: true,
        summary,
        message: "AI processing triggered successfully"
      };
    } catch (error) {
      console.error("Error triggering AI:", error);
      return {
        success: false,
        summary: {},
        message: "Failed to trigger AI processing"
      };
    }
  }

  async getUserSessions(studentId: string): Promise<{success: boolean, sessions?: any[], message: string}> {
    try {
      const sessions = await Session.find({ student: studentId })
        .populate('course', 'name')
        .sort({ started: -1 });

      return {
        success: true,
        sessions: sessions,
        message: 'Sessions retrieved successfully'
      };
    } catch (error) {
      console.error('Error fetching user sessions:', error);
      return {
        success: false,
        message: 'Failed to fetch sessions'
      };
    }
  }


  private shouldCallAI(sessionData: SessionData): boolean {
    const now = Date.now();
    const timeSinceLastAI = now - sessionData.lastAICall;
    const chunkCount = sessionData.chunkCount;

    // Call AI if:
    // 1. 3+ minutes have passed, OR
    // 2. 5+ chunks accumulated, OR  
    // 3. 2+ minutes passed AND 3+ chunks
    return (
      timeSinceLastAI > 180000 || // 3 minutes
      chunkCount >= 5 ||
      (timeSinceLastAI > 120000 && chunkCount >= 3) // 2 min + 3 chunks
    );
  }
}
