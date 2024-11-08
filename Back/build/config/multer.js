"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerConfig = void 0;
var multer = require("multer");
var path_1 = require("path");
var path = require("path");
var guidGenerator = require("uuid");
exports.multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, (0, path_1.resolve)(__dirname, "..", "..", "..", "Front", "public", "media"));
        },
        filename: function (req, file, callback) {
            var guid = guidGenerator.v4();
            callback(null, guid + path.extname(file.originalname));
        },
    }),
    fileFilter: function (req, file, callback) {
        var allowedExtensions = [
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
        var ext = path.extname(file.originalname).toLowerCase();
        if (!allowedExtensions.includes(ext)) {
            return callback(new Error("Only JPEG, JPG, PNG, MP4, MOV are allowed"));
        }
        callback(null, true);
    },
};
//# sourceMappingURL=multer.js.map