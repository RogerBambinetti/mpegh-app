'use-client';

import React, { useState, useEffect } from "react";
import path from 'path';

interface FileUploadProps {
    onChange: (files: FileList) => void;
    validFormats: string[];
}

export default function FileUpload({ onChange, validFormats }: FileUploadProps) {

    const [files, setFiles] = useState<FileList | null>(null);
    useEffect(() => {

        if (files) {
            onChange(files);
        }

    }, [files]);

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;

        if (droppedFiles.length) {

            const file = droppedFiles[0];
            const formatIsValid = validFormats.includes(path.extname(file.name));

            if (formatIsValid) {
                setFiles(droppedFiles);
            }
        }

    }

    return (
        <div onDrop={handleDrop} onDragOver={event => event.preventDefault()} className="flex items-center w-full justify-center w p-10 rounded-md bg-purple-200">
            <h1>File Upload {files?.length && files.length}</h1>
        </div>
    );
}