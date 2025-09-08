import { Router } from 'express';
import { bookController } from '../controllers/book.controller';

const router = Router();

router.post('/',
     bookController
     .createBook
     .bind(bookController));

router.get('/',
     bookController
     .getAllBooks
     .bind(bookController));

router.get('/:id',
      bookController
     .getBookById
     .bind(bookController));

router.put('/:id',
     bookController
     .updateBook
     .bind(bookController));

router.delete('/:id',
     bookController
     .deleteBook
     .bind(bookController));

router.get('/course/:courseId',
     bookController
     .getBooksByCourse
     .bind(bookController));

export default router;
