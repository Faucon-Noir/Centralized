import * as crypto from 'crypto';

export function encryptData(data: string): string {
	console.log(
		'cipher',
		process.env.NEXT_PUBLIC_CIPHER_ALGO,
		process.env.NEXT_PUBLIC_CIPHER_KEY,
		process.env.NEXT_PUBLIC_CIPHER_IV
	);
	const algorithm = process.env.NEXT_PUBLIC_CIPHER_ALGO;
	const key = process.env.NEXT_PUBLIC_CIPHER_KEY;
	const iv = process.env.NEXT_PUBLIC_CIPHER_IV;
	if (!algorithm || !key || !iv) {
		throw new Error('Missing encryption configuration');
	}
	const cipher = crypto.createCipheriv(
		algorithm,
		Buffer.from(key, 'hex'),
		Buffer.from(iv, 'hex')
	);

	let encrypted = cipher.update(data, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}
