import { Book, IBook } from '../models/book';
import { Course } from '../models/course';

export class BookService {
  async createBook(bookData: Partial<IBook>) {
    const course = await Course.findById(bookData.course);
    if (!course) {
      throw new Error('Course not found');
    }

    const book = new Book(bookData);
    const savedBook = await book.save();

    return await Book.findById(savedBook._id)
    .populate('course', 'name description');
  }

  async getAllBooks() {
    return await Book.find()
    .populate('course', 'name description')
    .sort({ createdAt: -1 });
  }

  async getBookById(id: string) {
    return await Book.findById(id).populate('course', 'name description');
  }

  async getBooksByCourse(courseId: string) {
    return await Book.find({ course: courseId })
    .populate('course', 'name description')
    .sort({ createdAt: -1 });
  }

  async updateBook(id: string, updateData: Partial<IBook>) {
    if (updateData.course) {
      const course = await Course.findById(updateData.course);
      if (!course) {
        throw new Error('Course not found');
      }
    }

    return await Book.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('course', 'name description');
  }

  async deleteBook(id: string) {
    return await Book.findByIdAndDelete(id);
  }
}
