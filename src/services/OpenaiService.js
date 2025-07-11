// services/openaiService.js

import axios from 'axios'; // ✅ Add this
import dotenv from 'dotenv';
import getPrompt from './PromptTemplate.js';

dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY; // ✅ Must be defined in your .env

/**
 * Sends code to OpenRouter and gets Markdown doc
 */
export async function generateDoc({ code, filename, commitId }) {
    const prompt = getPrompt(code, filename, commitId);
    const url = 'https://openrouter.ai/api/v1/chat/completions';

    try {
        const response = await axios.post(
            url,
            {
                model: "mistralai/mistral-7b-instruct", // Or any other supported model
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI that writes technical documentation.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.4,
                max_tokens: 2048,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                    'HTTP-Referer': 'http://localhost', // Required by OpenRouter
                    'Content-Type': 'application/json'
                }
            }
        );

        const markdown = response.data.choices[0].message.content.trim();
        return markdown;
    } catch (err) {
        console.error('❌ OpenRouter Error:', err.message);
        throw new Error('Failed to generate documentation from OpenRouter.');
    }
}
