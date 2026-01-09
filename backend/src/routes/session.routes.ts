import { Router } from "express";
import { SessionController } from "../controllers/session.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();
const sessionController = new SessionController();

// session routes require authentication
router.use(authenticateToken);

router.get("/user", 
    sessionController
    .getUserSessions
    .bind(sessionController));

router.post("/start",
     sessionController
     .startSession
     .bind(sessionController));

router.post("/:sessionId/end", 
    sessionController
    .endSession
    .bind(sessionController));

router.post("/:sessionId/add-chunk", 
    sessionController
    .addChunk
    .bind(sessionController));

router.get("/:sessionId/data", 
    sessionController
    .getSessionData
    .bind(sessionController));

router.get("/:sessionId/status", 
    sessionController
    .getSessionStatus
    .bind(sessionController));

router.post("/:sessionId/trigger-ai", 
    sessionController
    .triggerAI
    .bind(sessionController));

export default router;

