import { Router } from 'express';
import { noteController } from '../controllers/note.controller';

const router = Router();

router.post('/',
     noteController
     .createNote
     .bind(noteController));

router.get('/',
    noteController
    .getAllNotes
    .bind(noteController));

router.get('/:id', 
    noteController
    .getNoteById
    .bind(noteController));

router.put('/:id',
     noteController
     .updateNote
     .bind(noteController));

router.delete('/:id',
     noteController
     .deleteNote
     .bind(noteController));

router.get('/session/:sessionId',
     noteController
     .getNotesBySession
     .bind(noteController));

router.get('/session/:sessionId/type/:type', 
    noteController
    .getNotesByType
    .bind(noteController));

router.put('/session/:sessionId/reorder',
     noteController
     .reorderNotes
     .bind(noteController));

export default router;
