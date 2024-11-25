import * as crypto from 'crypto';

export function encryptData(data: string): string {
	const cipher = crypto.createCipheriv(
		process.env.NEXT_PUBLIC_CIPHER_ALGO || 'default_algo',
		process.env.NEXT_PUBLIC_CIPHER_KEY || 'default_key',
		process.env.NEXT_PUBLIC_CIPHER_IV || 'default_iv'
	);
	console.log(
		'cipher',
		process.env.NEXT_PUBLIC_CIPHER_ALGO,
		process.env.NEXT_PUBLIC_CIPHER_KEY,
		process.env.NEXT_PUBLIC_CIPHER_IV
	);
	let encrypted = cipher.update(data, 'utf8', 'hex');
	encrypted += cipher.final('hex');
	return encrypted;
}
