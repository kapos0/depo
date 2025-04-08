"use client";
import { UploadDropzone } from "@/lib/uploadthing";

interface ImageUploadProps {
    onChange: (url: string) => void;
    value: string;
    endpoint: "imageUploader";
}

function ImageUpload({ endpoint, onChange, value }: ImageUploadProps) {
    if (value) {
        return (
            <div className="relative flex items-center justify-center overflow-hidden">
                <img
                    src={value}
                    alt="Upload"
                    className="rounded-md object-contain"
                />
                <button
                    onClick={() => onChange("")}
                    className="absolute top-3 right-2 p-1 bg-red-500 rounded-full shadow-sm"
                    type="button"
                >
                    <span className="h-4 w-4 text-white">X</span>
                </button>
            </div>
        );
    }
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].ufsUrl);
            }}
            onUploadError={(error: Error) => {
                console.log(error);
            }}
            className="bg-black text-white"
        />
    );
}
export default ImageUpload;
