import { FastifyInstance } from "fastify";

import { FileConvert, FileDownload } from "./controllers/file-controller";

export default function Routes(app: FastifyInstance) {

    app.post("/files/convert", FileConvert);
    app.get("/files/download/:fileName", FileDownload);

    return app;
}