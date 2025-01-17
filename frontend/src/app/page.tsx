'use client'

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner';

const fileTypes = ["M4A"];

export default function Home() {

  const [isConvertingFiles, setIsConvertingFiles] = useState(false);

  const baseUrl = "http://localhost:3030/files";

  const handleChange = async (files: FileList) => {
    try {
      const form = new FormData();

      for (let i = 0; i < files.length; i++) {
        form.append('file', files[i]);
      }

      setIsConvertingFiles(true);
      const { data } = await axios.post(`${baseUrl}/convert`, form);
      setIsConvertingFiles(false);

      window.location.href = `${baseUrl}/download/${data.fileName}`;
    } catch (error) {
      console.error("Error converting file:", error);
      setIsConvertingFiles(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        {isConvertingFiles ?
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
          />
          :
          <FileUploader multiple={true} handleChange={handleChange} name="file" types={fileTypes} />
        }

      </main>
    </div>
  );
}