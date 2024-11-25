import * as crypto from 'crypto';

export function decryptData(encryptedData: string): string {
	const algorithm = process.env.NEXT_PUBLIC_CIPHER_ALGO;
	const key = process.env.NEXT_PUBLIC_CIPHER_KEY;
	const iv = process.env.NEXT_PUBLIC_CIPHER_IV;
	console.log('decipher', algorithm, key, iv);

	if (!algorithm || !key || !iv) {
		throw new Error('Missing environment variables for decryption');
	}

	const ivBuffer = Buffer.from(iv, 'hex');
	console.log('IV Buffer:', ivBuffer);
	console.log('IV Buffer Length:', ivBuffer.length);

	if (Buffer.from(iv, 'hex').length !== 16) {
		console.log('ivBuffer', Buffer.from(iv, 'hex'));
		throw new Error('Invalid IV length');
	}

	const decipher = crypto.createDecipheriv(
		algorithm,
		Buffer.from(key, 'hex'),
		ivBuffer
	);

	let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
	decrypted += decipher.final('utf8');
	return decrypted;
}
