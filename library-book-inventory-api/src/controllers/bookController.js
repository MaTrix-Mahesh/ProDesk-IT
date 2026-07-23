const asyncWrapper = require('../middleware/asyncWrapper');
const Book = require('../models/Book');
const { successResponse } = require('../utils/response');
const analyticsLogger = require('../middleware/analyticsLogger');

// Create a new book
const createBook = asyncWrapper(async (req, res) => {
  const book = await Book.create(req.body);
  analyticsLogger('create', req);
  return successResponse(res, 201, 'Book created successfully', book);
});

// Get all books
const getBooks = asyncWrapper(async (req, res) => {
  const books = await Book.find();
  analyticsLogger('read_all', req);
  return successResponse(res, 200, 'Books retrieved', books);
});

// Get a single book by ID
const getBookById = asyncWrapper(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  analyticsLogger('read_one', req);
  return successResponse(res, 200, 'Book retrieved', book);
});

// Update a book
const updateBook = asyncWrapper(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  analyticsLogger('update', req);
  return successResponse(res, 200, 'Book updated', book);
});

// Delete a book
const deleteBook = asyncWrapper(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  analyticsLogger('delete', req);
  return successResponse(res, 200, 'Book deleted', null);
});

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
};
