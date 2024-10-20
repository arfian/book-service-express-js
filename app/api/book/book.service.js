const bookRepository = require("./book.repository");
const AppError = require("../../config/error.config");
const { signUser, guardIsOwner, extractUserId } = require("../../config/authorization.config");

/**
 * @openapi
 * /api/book/{bookId}:
 *   get:
 *     description: Get Book ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: path
 *         name: bookId
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: book data
 */
const bookById = async (id) => {
  const book = await bookRepository.selectById(id);
  if (!book) throw new AppError(`Book with id: ${id} not found `, "NOT_FOUND", "book.service.bookById");
  return book;
};

/**
 * @openapi
 * /api/book/:
 *   get:
 *     description: Get Book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: header
 *         name: x-api-key
 *         type: string
 *         required: true
 *       - in: body
 *         schema:
 *           type: object
 *           required:
 *             - limit
 *             - offset
 *           properties:
 *             limit:
 *               type: integer
 *             offset:
 *               type: integer
 *     responses:
 *       200:
 *         description: book data
 */
const books = async (book) => {
  console.log("asdasd", book);
  const dataBooks = await bookRepository.selectAll(book.limit, book.offset);
  console.log("asdasd", dataBooks);
  if (!dataBooks) throw new AppError(`Book not found `, "NOT_FOUND", "book.service.books");
  return dataBooks;
};

const bookService = {
  bookById,
  books
};

module.exports = bookService;