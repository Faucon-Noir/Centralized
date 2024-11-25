import * as crypto from "crypto";

export function encryptData(data: string): string {
	const cipher = crypto.createCipheriv(process.env.CIPHER_ALGO, process.env.CIPHER_KEY, process.env.CIPHER_IV);
	let encrypted = cipher.update(data, "utf8", "hex");
	encrypted += cipher.final("hex");
	return encrypted;
}
