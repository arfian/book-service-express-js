const bookRepository = require("./book.repository");
const AppError = require("../../config/error.config");
const res = require("../../config/success.config");
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
  return res.successRes(book);
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
  const dataBooks = await bookRepository.selectAll(book.limit, book.offset);
  if (!dataBooks) throw new AppError(`Book not found `, "NOT_FOUND", "book.service.books");
  return res.successRes(dataBooks);
};

/**
 * @openapi
 * /api/book/:
 *   post:
 *     description: Create Book
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
 *             - title
 *             - author
 *             - description
 *             - image
 *           properties:
 *             title:
 *               type: string
 *             author:
 *               type: string
 *             description:
 *               type: string
 *             image:
 *               type: string
 *     responses:
 *       200:
 *         description: book data
 */
const bookCreate = async (book) => {
  const dataBooks = await bookRepository.create(book);
  if (!dataBooks) throw new AppError(`Book create error `, "ERROR", "book.service.books");
  return res.successRes(dataBooks);
};

/**
 * @openapi
 * /api/book/:
 *   put:
 *     description: Update Book
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
 *             - id
 *             - title
 *             - author
 *             - description
 *             - image
 *           properties:
 *             id:
 *               type: integer
 *             title:
 *               type: string
 *             author:
 *               type: string
 *             description:
 *               type: string
 *             image:
 *               type: string
 *     responses:
 *       200:
 *         description: book data
 */
const bookUpdate = async (book) => {
  const dataBooks = await bookRepository.update(book.id, book);
  if (!dataBooks) throw new AppError(`Book create error `, "ERROR", "book.service.books");
  return res.successRes(dataBooks);
}

/**
 * @openapi
 * /api/book/{bookId}:
 *   delete:
 *     description: Delete Book ID
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
const bookDelete = async (id) => {
  const book = await bookRepository.deleteById(id);
  if (!book) throw new AppError(`Book with id: ${id} not found `, "NOT_FOUND", "book.service.bookById");
  return res.successRes(book);
};

const bookService = {
  bookById,
  books,
  bookCreate,
  bookUpdate,
  bookDelete
};

module.exports = bookService;