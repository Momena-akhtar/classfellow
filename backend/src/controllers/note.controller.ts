import { Request, Response } from 'express';
import { NoteService } from '../services/note.service';

const noteService = new NoteService();

export class NoteController {
  async createNote(req: Request, res: Response) {
    try {
      const { session, content, timestamp, order, type } = req.body;

      if (!session || !content || timestamp === undefined || order === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Session, content, timestamp, and order are required'
        });
      }

      const note = await noteService.createNote({
        session,
        content,
        timestamp,
        order,
        type: type || 'text'
      });

      res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating note',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getAllNotes(req: Request, res: Response) {
    try {
      const notes = await noteService.getAllNotes();
      
      res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        notes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving notes',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getNoteById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Note ID is required'
        });
      }

      const note = await noteService.getNoteById(id);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Note retrieved successfully',
        note
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving note',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getNotesBySession(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          message: 'Session ID is required'
        });
      }

      const notes = await noteService.getNotesBySession(sessionId);

      res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        notes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving notes',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getNotesByType(req: Request, res: Response) {
    try {
      const { sessionId, type } = req.params;

      if (!sessionId || !type) {
        return res.status(400).json({
          success: false,
          message: 'Session ID and type are required'
        });
      }

      const notes = await noteService.getNotesByType(sessionId, type as any);

      res.status(200).json({
        success: true,
        message: 'Notes retrieved successfully',
        notes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving notes',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async updateNote(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Note ID is required'
        });
      }

      const note = await noteService.updateNote(id, updateData);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Note updated successfully',
        note
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating note',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteNote(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Note ID is required'
        });
      }

      const note = await noteService.deleteNote(id);

      if (!note) {
        return res.status(404).json({
          success: false,
          message: 'Note not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Note deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting note',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async reorderNotes(req: Request, res: Response) {
    try {
      const { sessionId } = req.params;
      const { noteIds } = req.body;

      if (!sessionId) {
        return res.status(400).json({
          success: false,
          message: 'Session ID is required'
        });
      }

      if (!Array.isArray(noteIds)) {
        return res.status(400).json({
          success: false,
          message: 'noteIds must be an array'
        });
      }

      const notes = await noteService.reorderNotes(sessionId, noteIds);

      res.status(200).json({
        success: true,
        message: 'Notes reordered successfully',
        notes
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error reordering notes',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const noteController = new NoteController();
