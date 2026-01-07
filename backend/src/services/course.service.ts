import { Course, ICourse } from '../models/course';
import { Book } from '../models/book';

export class CourseService {
  async createCourse(courseData: Partial<ICourse>) {
    const course = new Course(courseData);
    return await course.save();
  }

  async getAllCourses() {
    return await Course
    .find()
    .sort({ createdAt: -1 });
  }

  async getCourseById(id: string) {
    return await Course.findById(id);
  }

  async updateCourse(id: string, updateData: Partial<ICourse>) {
    return await Course.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );
  }

  async deleteCourse(id: string) {
    await Book.deleteMany({ course: id });
    return await Course.findByIdAndDelete(id);
  }

  async getCourseWithBooks(courseId: string) {
    const course = await Course.findById(courseId);
    if (!course) return null;
    
    const books = await Book.find({ course: courseId })
      .select('name pdfUrl createdAt updatedAt');
    
    return {
      ...course.toObject(),
      books
    };
  }

  async getCoursesByIds(courseIds: string[]) {
    if (!courseIds || courseIds.length === 0) {
      return [];
    }

    return await Course.find({ _id: { $in: courseIds } })
      .sort({ createdAt: -1 });
  }

  async getUserCoursesWithBooks(courseIds: string[]) {
    if (!courseIds || courseIds.length === 0) {
      return [];
    }

    const courses = await Course.find({ _id: { $in: courseIds } })
      .sort({ createdAt: -1 });

    // Fetch books for each course
    const coursesWithBooks = await Promise.all(
      courses.map(async (course) => {
        const books = await Book.find({ course: course._id })
          .select('_id name pdfUrl createdAt updatedAt');
        
        return {
          _id: course._id,
          name: course.name,
          description: course.description,
          createdAt: course.createdAt,
          updatedAt: course.updatedAt,
          books
        };
      })
    );

    return coursesWithBooks;
  }
}
