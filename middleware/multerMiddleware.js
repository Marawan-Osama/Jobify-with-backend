import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

//multer middleware. It will upload the image to memory and convert it to base64 format before saving it to the database
const storage = multer.memoryStorage();

const upload = multer({ storage });

const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content;
};

export default upload;
