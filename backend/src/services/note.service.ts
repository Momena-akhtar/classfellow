import { Note, INote } from '../models/note';
import { Session } from '../models/session';

export class NoteService {
  async createNote(noteData: Partial<INote>) {
    const session = await Session.findById(noteData.session);
    if (!session) {
      throw new Error('Session not found');
    }

    const note = new Note(noteData);
    return await note.save();
  }

  async getAllNotes() {
    return await Note.find()
    .populate('session', 'title startTime endTime')
    .sort({ createdAt: -1 });
  }

  async getNoteById(id: string) {
    return await Note
    .findById(id)
    .populate('session', 'title startTime endTime');
  }

  async getNotesBySession(sessionId: string) {
    return await Note.find({ session: sessionId })
      .populate('session', 'title startTime endTime')
      .sort({ order: 1, timestamp: 1 });
  }

  async updateNote(id: string, updateData: Partial<INote>) {
    return await Note.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('session', 'title startTime endTime');
  }

  async deleteNote(id: string) {
    return await Note.findByIdAndDelete(id);
  }

  async getNotesByType(sessionId: string, 
    type: 'text' | 'ai_summary' | 'ai_explanation' | 'highlight') {
    return await Note.find({ session: sessionId, type })
      .populate('session', 'title startTime endTime')
      .sort({ order: 1, timestamp: 1 });
  }

  async reorderNotes(sessionId: string, noteIds: string[]) {
    const updatePromises = noteIds.map((noteId, index) => 
      Note.findByIdAndUpdate(noteId, { order: index }, { new: true })
    );
    return await Promise.all(updatePromises);
  }
}
