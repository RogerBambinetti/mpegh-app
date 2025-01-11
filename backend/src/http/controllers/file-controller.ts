import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import path from "node:path";
import { FastifyReply, FastifyRequest } from "fastify";

import { bulkDecode } from 'mpegh-decoder';

export async function FileConvert(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const parts = request.files();

        if (!parts) {
            return reply.status(400).send({ message: "No files uploaded" });
        }

        const inputs = [];

        for await (const part of parts) {
            const uploadPath = path.join(__dirname, '../../uploads', part.filename);

            await pipeline(part.file, fs.createWriteStream(uploadPath));

            inputs.push({ input: uploadPath });
        }

        const decodeResult = await bulkDecode(inputs);
        inputs.forEach(({ input }) => fs.unlinkSync(input));

        const outputFilePaths = decodeResult.map((result) => result.outputFilePath);

        return reply.status(200).send({ message: "Files converted successfully" });
    } catch (err: any) {
        return reply.status(400).send({ message: err.message });
    }
}

export async function FileDownload(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const { fileName } = request.params as { fileName: string };

        if (!fileName) {
            return reply.status(400).send({ message: "No file name provided" });
        }

        const filePath = path.join(__dirname, '../../uploads', fileName);

        if (!fs.existsSync(filePath)) {
            return reply.status(404).send({ message: "File not found" });
        }

        const stream = fs.createReadStream(filePath);

        reply.header('Content-Disposition', `attachment; filename=${fileName}`);
        reply.type('application/octet-stream');

        await reply.send(stream);

        fs.unlinkSync(filePath);

        return reply.status(200);
    } catch (err: any) {
        return reply.status(500).send({ message: "Internal Server Error" });
    }
}