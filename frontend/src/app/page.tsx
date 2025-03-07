'use client'

import { useState } from "react";
import FileUpload from "./components/FileUpload";

import Select from 'react-select';
import { TailSpin } from 'react-loader-spinner';
import axios from "axios";

interface SelectOption {
  value: string;
  label: string;
}

const options = [
  { value: '6', label: 'CICP INDEX 6' },
  { value: '12', label: 'CICP INDEX 12' },
  { value: '20', label: 'CICP INDEX 20' },
];

export default function Home() {

  const [selectedOption, setSelectedOption] = useState<SelectOption>({ value: '6', label: 'CICP INDEX 6' });
  const [isConvertingFiles, setIsConvertingFiles] = useState(false);

  const baseUrl = "http://localhost:3030/files";

  const handleChange = async (files: FileList) => {

    if (!files) {
      return;
    }

    try {
      const form = new FormData();

      for (let i = 0; i < files.length; i++) {
        form.append('file', files[i]);
      }

      setIsConvertingFiles(true);
      const { data } = await axios.post(`${baseUrl}/convert?cicp=${selectedOption.value}`, form);
      setIsConvertingFiles(false);

      data.fileNames.forEach((fileName: string) => {
        window.open(`${baseUrl}/download/${fileName}`);
      });
    } catch (error) {
      console.error("Error converting file:", error);
      setIsConvertingFiles(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <Select
          defaultValue={selectedOption}
          onChange={(newValue) => setSelectedOption(newValue as SelectOption)}
          options={options}
          className="w-80"
        />

        {isConvertingFiles ?
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
          />
          :
          <FileUpload onChange={handleChange} />
        }

      </main>
    </div>
  );
}