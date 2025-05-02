import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react';
import Button from './Button';
import { UploadedImage } from '../../types';

interface ImageUploaderProps {
  onImageSelect: (image: UploadedImage) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, className = '' }) => {
  const [dragActive, setDragActive] = useState(false);
  const [image, setImage] = useState<UploadedImage>({ file: null, preview: null });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    if (file.type.match('image.*')) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          const newImage = {
            file: file,
            preview: e.target.result
          };
          setImage(newImage);
          onImageSelect(newImage);
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage({ file: null, preview: null });
    onImageSelect({ file: null, preview: null });
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={`w-full ${className}`}>
      {!image.preview ? (
        <div
          className={`upload-zone relative ${dragActive ? 'border-orange-500 bg-navy-700/50' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="text-center">
            {isLoading ? (
              <>
                <Loader2 className="mx-auto h-12 w-12 text-orange-500 mb-4 animate-spin" />
                <h3 className="text-lg font-bold text-cream-100 mb-2">Processing Image...</h3>
                <p className="text-cream-200 text-sm mb-4">Please wait while we prepare your image</p>
              </>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-cream-200 mb-4" />
                <h3 className="text-lg font-bold text-cream-100 mb-2">Upload an image</h3>
                <p className="text-cream-200 text-sm mb-4">Drag and drop or click to browse</p>
                <Button variant="outline" size="sm" type="button">
                  Select Image
                </Button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={image.preview} 
            alt="Uploaded room" 
            className="w-full h-64 object-cover"
          />
          <button
            onClick={clearImage}
            className="absolute top-2 right-2 bg-navy-900/80 text-white p-1 rounded-full hover:bg-navy-800 transition-all"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-900/90 to-transparent">
            <p className="text-white text-sm truncate">
              {image.file?.name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;