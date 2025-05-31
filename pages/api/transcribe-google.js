// pages/api/transcribe-google.js
import formidable from 'formidable';
import fs from 'fs';
import { SpeechClient } from '@google-cloud/speech';

export const config = {
    api: { bodyParser: false },
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Khởi formidable với allowEmptyFiles = true và các tuỳ chọn an toàn
    const form = formidable({
        multiples: false,
        keepExtensions: true,
        allowEmptyFiles: false, // nếu bạn muốn từ chối file rỗng, để false sẽ ném lỗi; để true sẽ chấp nhận
        maxFileSize: 10 * 1024 * 1024, // ví dụ giới hạn 10MB
    });

    // Đóng gói parse vào Promise để dễ await và catch lỗi
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

        // Đọc buffer
        const buffer = fs.readFileSync(file.filepath);

        // Gọi Google Speech-to-Text
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

        // Nếu Formidable error về file empty, trả 400
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
