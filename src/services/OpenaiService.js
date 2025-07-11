// services/openaiService.js

import dotenv from 'dotenv';
import { OpenAI } from 'openai';
import getPrompt from './PromptTemplate.js';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

/**
 * Sends code to OpenAI and gets Markdown doc
 * @param {Object} params
 * @param {string} params.code - The code to document
 * @param {string} params.filename - Name of the file (e.g., App.jsx)
 * @param {string} params.commitId - The Git commit hash
 * @returns {string} Markdown documentation
 */
export async function generateDoc({ code, filename, commitId }) {
    const prompt = getPrompt(code, filename, commitId);

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // or 'gpt-3.5-turbo' if cost/performance needed
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional technical writer assistant.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.4,
            max_tokens: 800
        });

        const markdown = response.choices[0].message.content.trim();
        return markdown;
    } catch (err) {
        console.error('❌ OpenAI Error:', err.message);
        throw new Error('Failed to generate documentation.');
    }
}


