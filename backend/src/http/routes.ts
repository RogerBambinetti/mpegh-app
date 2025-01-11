import { FastifyInstance } from "fastify";
import { FileUpload } from "./controllers/file-upload";

export default function Routes(app: FastifyInstance) {

    app.post("/files/upload", FileUpload);

    return app;
}