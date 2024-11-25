import * as crypto from "crypto";

export function decryptData(encryptedData: string): string {
	console.log("decipher", process.env.NEXT_PUBLIC_CIPHER_ALGO, process.env.NEXT_PUBLIC_CIPHER_KEY, process.env.NEXT_PUBLIC_CIPHER_IV);
	const algorithm = process.env.NEXT_PUBLIC_CIPHER_ALGO;
	const key = process.env.NEXT_PUBLIC_CIPHER_KEY;
	// const iv = process.env.NEXT_PUBLIC_CIPHER_IV;

	if (!algorithm || !key) {
		throw new Error("Missing environment variables for decryption");
	}
	const decipher = crypto.createDecipher(algorithm, key);

	let decrypted = decipher.update(encryptedData, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}
