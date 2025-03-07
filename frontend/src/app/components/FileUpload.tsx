'use-client';

import React, { useState, useEffect } from "react";

interface FileUploadProps {
    onChange: (files: FileList) => void;
}

export default function FileUpload({ onChange }: FileUploadProps) {

    const [files, setFiles] = useState<FileList | null>(null);
    useEffect(onChange.bind(null, files), [files]);

    function handleDrop(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;

        if (droppedFiles.length) {
            setFiles(droppedFiles);
        }

    }

    return (
        <div onDrop={handleDrop} onDragOver={event => event.preventDefault()} className="flex items-center w-full justify-center w p-10 rounded-md bg-purple-200">
            <h1>File Upload {files?.length && files.length}</h1>
        </div>
    );
}