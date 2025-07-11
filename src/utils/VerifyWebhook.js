// utils/verifyWebhook.js

import { createHmac, timingSafeEqual } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Verifies GitHub webhook signature using HMAC SHA-256
 * @param {string} signature - 'sha256=...' header from GitHub
 * @param {string} rawBody - Raw JSON stringified payload
 * @returns {boolean}
 */
function verifyWebhook(signature, rawBody) {
    const secret = process.env.WEBHOOK_SECRET;

    if (!signature || !secret) return false;

    const hmac = createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(rawBody).digest('hex');

    return timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export default verifyWebhook;
