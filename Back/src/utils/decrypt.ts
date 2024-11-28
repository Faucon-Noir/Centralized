import * as crypto from "crypto";

export function decryptData(encryptedData: string): string {
	const decipher = crypto.createDecipheriv(process.env.CIPHER_ALGO, process.env.CIPHER_KEY, process.env.CIPHER_IV);
	let decrypted = decipher.update(encryptedData, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}
