import axios from "axios";
import { API_BASE_URL } from "../config";

export interface UploadResponse {
  status: string;
  videoPath: string;
  audioPath: string;
  message?: string;
}

export interface TranscribeResponse {
  status: string;
  audioPath: string;
  transcript: string;
  message?: string;
}

export interface VideoMetadata {
  videoId: string;
  videoUrl: string;
  fileName: string;
  duration: string;
  resolution: string;
  fileSize: string;
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Upload Video to Flask Backend API
 * POST /api/upload (multipart/form-data)
 */
export async function uploadVideoApi(videoFile: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append("video", videoFile);

  const response = await apiClient.post<UploadResponse>("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
}

/**
 * Transcribe Audio to Text using OpenAI Whisper Backend API
 * POST /api/transcribe
 */
export async function transcribeAudioApi(audioPath: string): Promise<TranscribeResponse> {
  const response = await apiClient.post<TranscribeResponse>("/api/transcribe", {
    audioPath,
  });

  return response.data;
}
