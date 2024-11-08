import multer = require("multer");
import { resolve } from "path";
import * as path from "path";
const guidGenerator = require("uuid");

export const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(
        null,
        resolve(__dirname, "..", "..", "..", "media")
      );
    },
    filename: (req, file, callback) => {
      const guid = guidGenerator.v4();
      callback(null, guid + path.extname(file.originalname));
    },
  }),
  fileFilter: function (req, file, callback) {
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".mp4",
      ".mov",
      ".MOV",
      ".JPG",
      ".JPEG",
      ".PNG",
      ".MP4",
    ];
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      return callback(new Error("Only JPEG, JPG, PNG, MP4, MOV are allowed"));
    }
    callback(null, true);
  },
};
