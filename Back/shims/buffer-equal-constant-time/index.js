// Replacement for buffer-equal-constant-time, which crashes on Node >= 25 (SlowBuffer removed).
const crypto = require('crypto');

module.exports = function bufferEq(a, b) {
	if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b) || a.length !== b.length) {
		return false;
	}
	return crypto.timingSafeEqual(a, b);
};
