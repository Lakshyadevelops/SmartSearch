import React, { useState, useRef } from "react";
import { CirclePauseIcon, ImagePlusIcon, MicIcon, XIcon } from "lucide-react";
import { TextareaAutosize } from "@mui/material";

const SearchBox = ({ onSendMessage }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [promptText, setPromptText] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [audioURL, setAudioURL] = useState(null);

    const mediaRecorderRef = useRef(null);
    const recordedChunks = useRef([]);
    const fileInputRef = useRef(null);

    const handleImageClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };

    const handleTextChange = (e) => {
        setPromptText(e.target.value);
    };

    const handleMicClick = async () => {
        if (!isRecording) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                recordedChunks.current = [];

                mediaRecorderRef.current.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        recordedChunks.current.push(e.data);
                    }
                };

                mediaRecorderRef.current.onstop = () => {
                    const blob = new Blob(recordedChunks.current, { type: "audio/webm" });
                    const url = URL.createObjectURL(blob);
                    setAudioURL(url);
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (err) {
                console.error("Microphone access error:", err);
                alert("Could not access microphone. Check permissions.");
            }
        } else {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const handleSendClick = () => {
        if (onSendMessage) {
            onSendMessage(promptText);
        }
        setPromptText("");
    };

    const lineHeight = 24;
    const maxLines = 7;
    const maxHeight = lineHeight * maxLines;

    return (
        <div className="max-w-full p-4 border border-gray-300 rounded-[10px] bg-white">
            <div className="flex items-center w-full">
                <div>
                    {selectedImage && (
                        <div className="relative inline-block">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="w-20 h-20 object-cover rounded"
                            />
                            <button
                                onClick={handleRemoveImage}
                                className="absolute -top-3 -right-3 bg-white text-gray-500 hover:text-gray-700 rounded-full p-1 shadow-md"
                                title="Remove Image"
                            >
                                <XIcon size={16} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="ml-auto">
                    {audioURL && (
                        <div className="relative">
                            <audio controls src={audioURL} className="outline-none">
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
                </div>
            </div>

            {/* Top row: 3 columns (image icon, text area, mic icon) */}
            <div className="flex items-center justify-between">
                {/* Left: Image upload icon */}
                <button
                    onClick={handleImageClick}
                    className="text-gray-700 hover:text-gray-900 focus:outline-none"
                    title="Upload Image"
                >
                    <ImagePlusIcon size={24} />
                </button>
                {/* Hidden file input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />

                {/* Center: Text area */}
                <div className="flex w-full m-2 p-2 border border-gray-700 rounded">
                    <TextareaAutosize
                        value={promptText}
                        onChange={handleTextChange}
                        placeholder="How can I assist you in planning your next hotel booking experience?"
                        minRows={1}
                        maxRows={7}
                        className="flex w-full rounded focus:outline-none resize-none custom-scrollbar placeholder-black"
                        title="Prompt Box"
                    />
                </div>

                {/* Right 1: Audio record icon */}
                <button
                    onClick={handleMicClick}
                    className={`text-gray-700 hover:text-gray-900 focus:outline-none ${isRecording ? "animate-pulse text-red-600 hover:text-red-700" : ""
                        }`}
                    title="Record Audio"
                >
                    {!isRecording ? (
                        <MicIcon size={24} />
                    ) : (
                        <CirclePauseIcon size={24} className="text-gray-800" />
                    )}
                </button>

                {/* Right 2: Send button */}
                <button
                    onClick={handleSendClick}
                    className="ml-2 bg-[#307fe2] hover:bg-[#f26b25] text-white py-1 px-4 rounded font-semibold"
                    title="Send"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default SearchBox;
