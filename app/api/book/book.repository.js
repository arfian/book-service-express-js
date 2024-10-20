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

const bookRepository = {
  selectById
};
module.exports = bookRepository;