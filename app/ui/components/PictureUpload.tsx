import React, { useState } from 'react';
import Image from "next/image"; // Import Image from next/image for optimized image display

// Existing uploadImage function (will be used by the component)
export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
    });
    const body = await res.json()
    console.log(body)
    return body.data.url
    // URL of the uploaded file
}

interface PictureUploadProps {
    onUploadComplete: (url: string) => void;
}

export const PictureUpload: React.FC<PictureUploadProps> = ({ onUploadComplete }) => {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreviewUrl(URL.createObjectURL(selectedFile)); // Create a preview URL
            setError(null); // Clear any previous errors
        } else {
            setFile(null);
            setPreviewUrl(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a file to upload.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const url = await uploadImage(file);
            onUploadComplete(url); // Notify parent component of successful upload
            setFile(null);
            setPreviewUrl(null);
            alert("Image uploaded successfully!");
        } catch (err) {
            console.error("Error uploading image:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-4 mt-4 border-gray-200 border-0.5 rounded-md shadow-sm">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
                />
                {previewUrl && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Image Preview:</h3>
                        <Image src={previewUrl} alt="Preview" width={200} height={200} className="max-w-full h-auto rounded-md" />
                    </div>
                )}
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                    type="button"
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-500 disabled:cursor-not-allowed"
                >
                    {loading ? "Uploading..." : "Upload Image"}
                </button>
            </div>
        </>
    );
};