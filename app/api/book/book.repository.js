const Book = require("./book.model");
const AppError = require("../../config/error.config");

const selectById = async (id) => {
  try {
    const book = await Book.findOne({
      where: {
        id,
      },
    });
    return book.toJSON();
  } catch (error) {
    throw new AppError(error);
  }
};

const selectAll = async (limit, offset) => {
  try {
    const books = await Book.findAll({
      limit: limit,
      offset: offset,
      order: ["title"],
      raw: true,
    });
    return books;
  } catch (error) {
    throw new AppError(error);
  }
}

const bookRepository = {
  selectById,
  selectAll
};
module.exports = bookRepository;