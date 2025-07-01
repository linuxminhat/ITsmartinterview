//Receive audio files from the client and send them to Google Speech-to-Text to convert them into Vietnamese text.
import formidable from 'formidable';
import fs from 'fs';
//SDK for calling Google Speech-to-Text API.
import { SpeechClient } from '@google-cloud/speech';

export const config = {
    api: { bodyParser: false },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    const form = formidable({
        multiples: false,
        keepExtensions: true,
        allowEmptyFiles: false,
        maxFileSize: 10 * 1024 * 1024,
    });
    try {
        const { fields, files } = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const file = Array.isArray(files.file) ? files.file[0] : files.file;
        if (!file || !file.filepath) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const buffer = fs.readFileSync(file.filepath);
        // Gửi đến Google Speech-to-Text API
        const client = new SpeechClient();
        const [response] = await client.recognize({
            audio: { content: buffer.toString('base64') },
            config: {
                encoding: 'WEBM_OPUS',
                sampleRateHertz: 48000,
                languageCode: 'vi-VN',
                enableAutomaticPunctuation: true,
            },
        });
        const text = response.results
            .map(r => r.alternatives[0].transcript)
            .join(' ');

        return res.status(200).json({ text });
    } catch (error) {
        console.error('Transcribe error:', error);
        if (error.code === 1010) {
            return res
                .status(400)
                .json({ error: 'Uploaded file is empty or too small.' });
        }
        return res
            .status(500)
            .json({ error: error.message || 'Internal Server Error' });
    }
}
