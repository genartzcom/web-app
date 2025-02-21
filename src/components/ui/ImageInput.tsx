'use client';

import { useState } from 'react';

interface ImageUploadProps {
  onUpload: (file: File | null) => void;
}

const ImageInput: React.FC<ImageUploadProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      onUpload(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0] || null;
    if (droppedFile) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      onUpload(droppedFile);
    }
  };

  return (
    <div
      className="flex aspect-square w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-[24px] border-2 border-dashed border-neutral-500 bg-neutral-600 p-2"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input type="file" accept="image/*" className="hidden" id="fileInput" onChange={handleFileChange} />
      <label htmlFor="fileInput" className="block h-full w-full cursor-pointer">
        {preview ? (
          <img src={preview} alt="Preview" className="h-full w-full rounded-2xl object-cover" />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center leading-none select-none">
            <i className={'ri-upload-2-fill mb-3 text-[32px]'} />
            <p>Upload Image</p>
            <p className={'text-neutral-400'}>png, webp, jpg, jpeg</p>
          </div>
        )}
      </label>
    </div>
  );
};

export default ImageInput;
