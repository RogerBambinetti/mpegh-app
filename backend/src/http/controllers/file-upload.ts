import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import path from "node:path";
import { FastifyReply, FastifyRequest } from "fastify";

export async function FileUpload(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    try {
        const parts = request.files();

        if (!parts) {
            return reply.status(400).send({ message: "No files uploaded" });
        }

        for await (const part of parts) {
            const uploadPath = path.join(__dirname, '../../uploads', part.filename);
            await pipeline(part.file, fs.createWriteStream(uploadPath));
        }

        return reply.status(200).send({ message: "File uploaded successfully" });
    } catch (err: any) {
        console.log(err)
        return reply.status(400).send({ message: err.message });
    }
}