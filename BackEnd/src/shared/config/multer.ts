import multer = require("multer");
import { resolve } from "path";
import * as path from "path";
const guidGenerator = require("uuid");

export const multerConfig = {
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(
				null,
				resolve(
					__dirname,
					"..",
					"..",
					"..",
					"front_seo",
					"public",
					"media"
				)
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
			".JPG",
			".JPEG",
			".PNG",
		];
		const ext = path.extname(file.originalname).toLowerCase();
		if (!allowedExtensions.includes(ext)) {
			return callback(new Error("Only JPEG, JPG, PNG are allowed"));
		}
		callback(null, true);
	},
};
