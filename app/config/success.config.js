/**
 * A wrapper for the System Success class.
 * @description Adds properties for the kind and the source of the success.
 */

const successRes = (data) => {
    return {
        message: "Success",
        success: true,
        data: data
    }
}

module.exports = { successRes };