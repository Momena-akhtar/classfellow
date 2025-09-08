import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

const bookService = new BookService();

export class BookController {
  async createBook(req: Request, res: Response) {
    try {
      const { name, pdfUrl, course } = req.body;

      if (!name || !pdfUrl || !course) {
        return res.status(400).json({
          success: false,
          message: 'Name, PDF URL, and course are required'
        });
      }

      const book = await bookService.createBook({
        name,
        pdfUrl,
        course
      });

      res.status(201).json({
        success: true,
        message: 'Book created successfully',
        book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating book',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getAllBooks(req: Request, res: Response) {
    try {
      const books = await bookService.getAllBooks();
      
      res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving books',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getBookById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      
      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Book ID is required'
        });
      }

      const book = await bookService.getBookById(id);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Book retrieved successfully',
        book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving book',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getBooksByCourse(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      
      if (!courseId) {
        return res.status(400).json({
          success: false,
          message: 'Course ID is required'
        });
      }

      const books = await bookService.getBooksByCourse(courseId);

      res.status(200).json({
        success: true,
        message: 'Books retrieved successfully',
        books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving books',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async updateBook(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Book ID is required'
        });
      }

      const book = await bookService.updateBook(id, updateData);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Book updated successfully',
        book
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating book',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Book ID is required'
        });
      }

      const book = await bookService.deleteBook(id);

      if (!book) {
        return res.status(404).json({
          success: false,
          message: 'Book not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Book deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting book',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const bookController = new BookController();
