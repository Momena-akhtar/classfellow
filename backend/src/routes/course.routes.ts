import { Router } from 'express';
import { courseController } from '../controllers/course.controller';

const router = Router();

router.post('/',
     courseController
     .createCourse
     .bind(courseController));

router.get('/', 
    courseController
    .getAllCourses
    .bind(courseController));

router.get('/:id', 
    courseController
    .getCourseById
    .bind(courseController));

router.get('/:id/books',
     courseController
     .getCourseWithBooks
     .bind(courseController));

router.put('/:id',
     courseController
     .updateCourse
     .bind(courseController));

router.delete('/:id',
     courseController
     .deleteCourse
     .bind(courseController));

export default router;
