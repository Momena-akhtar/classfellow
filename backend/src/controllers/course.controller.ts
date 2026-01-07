import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';

const courseService = new CourseService();

export class CourseController {
  async createCourse(req: Request, res: Response) {
    try {
      const { name, description } = req.body;

      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Course name is required'
        });
      }

      const course = await courseService.createCourse({
        name,
        description
      });

      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        course
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating course',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getAllCourses(req: Request, res: Response) {
    try {
      const courses = await courseService.getAllCourses();
      
      res.status(200).json({
        success: true,
        message: 'Courses retrieved successfully',
        courses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving courses',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getCourseById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Course ID is required'
        });
      }

      const course = await courseService.getCourseById(id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Course retrieved successfully',
        course
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving course',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getCourseWithBooks(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Course ID is required'
        });
      }

      const course = await courseService.getCourseWithBooks(id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Course with books retrieved successfully',
        course
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving course with books',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async updateCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Course ID is required'
        });
      }

      const course = await courseService.updateCourse(id, updateData);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Course updated successfully',
        course
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating course',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async deleteCourse(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          message: 'Course ID is required'
        });
      }

      const course = await courseService.deleteCourse(id);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: 'Course not found'
        });
      }

      res.status(200).json({
        success: true,
        message: 'Course deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting course',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getUserCourses(req: Request, res: Response) {
    try {
      const courseIds = req.body.courseIds || [];

      if (!Array.isArray(courseIds) || courseIds.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'No courses found',
          data: []
        });
      }

      const courses = await courseService.getCoursesByIds(courseIds);

      res.status(200).json({
        success: true,
        message: 'User courses retrieved successfully',
        data: courses
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving user courses',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getUserCoursesWithBooks(req: Request, res: Response) {
    try {
      const courseIds = req.body.courseIds || [];

      if (!Array.isArray(courseIds) || courseIds.length === 0) {
        return res.status(200).json({
          success: true,
          message: 'No courses found',
          data: []
        });
      }

      const coursesWithBooks = await courseService.getUserCoursesWithBooks(courseIds);

      res.status(200).json({
        success: true,
        message: 'User courses with books retrieved successfully',
        data: coursesWithBooks
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error retrieving user courses with books',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

}

export const courseController = new CourseController();
