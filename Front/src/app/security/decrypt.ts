import * as crypto from 'crypto';

export function decryptData(encryptedData: string): string {
	const decipher = crypto.createDecipheriv(
		process.env.NEXT_PUBLIC_CIPHER_ALGO || 'default_algo',
		process.env.NEXT_PUBLIC_CIPHER_KEY || 'default_key',
		process.env.NEXT_PUBLIC_CIPHER_IV || 'default_iv'
	);
	console.log(
		'decipher',
		process.env.NEXT_PUBLIC_CIPHER_ALGO,
		process.env.NEXT_PUBLIC_CIPHER_KEY,
		process.env.NEXT_PUBLIC_CIPHER_IV
	);
	let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}
