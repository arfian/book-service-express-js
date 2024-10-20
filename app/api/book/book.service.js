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
const bookById = async (id, userId) => {
  const book = await bookRepository.selectById(id);
  console.log("asdasd", book);
  if (!book) throw new AppError(`Book with id: ${id} not found `, "NOT_FOUND", "book.service.bookById");
  return book;
};

const bookService = {
  bookById
};

module.exports = bookService;