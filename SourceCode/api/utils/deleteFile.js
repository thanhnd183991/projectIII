const { unlink } = require("fs/promises");

const deleteFile = async (filePath) => {
  try {
    await unlink(filePath);
    // console.log(`successfully deleted ${filePath}`);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
};
module.exports = deleteFile;
