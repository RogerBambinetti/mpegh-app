import { useState } from "react";

export default function FileUpload() {

    const [files, setFiles] = useState<FileList | null>(null);

    return (
        <div className="flex items-center w-full justify-center w p-10 rounded-md bg-purple-200">
            <h1>File Upload</h1>
        </div>
    );
}