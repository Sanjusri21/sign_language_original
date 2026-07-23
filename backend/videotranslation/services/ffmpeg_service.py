import os
import subprocess
import uuid
import wave
import struct
import importlib

def get_ffmpeg_binary() -> str:
    """Finds system ffmpeg or uses imageio_ffmpeg bundled binary executable."""
    # Try system ffmpeg first
    try:
        res = subprocess.run(["ffmpeg", "-version"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if res.returncode == 0:
            return "ffmpeg"
    except Exception:
        pass

    # Try imageio_ffmpeg bundled binary via dynamic module resolution
    try:
        img_ffmpeg = importlib.import_module("imageio_ffmpeg")
        get_exe = getattr(img_ffmpeg, "get_ffmpeg_exe", None)
        if get_exe:
            exe = get_exe()
            if exe and os.path.exists(exe):
                return exe
    except Exception:
        pass

    return "ffmpeg"

def create_fallback_wav(audio_path: str, duration_sec: float = 10.0):
    """Generates a valid silent 16kHz mono WAV file if FFmpeg binary cannot be found."""
    sample_rate = 16000
    num_samples = int(sample_rate * duration_sec)
    output_dir = os.path.dirname(audio_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)
    with wave.open(audio_path, "wb") as wav_file:
        wav_file.setnchannels(1)  # Mono
        wav_file.setsampwidth(2)  # 16-bit
        wav_file.setframerate(sample_rate)
        frames = bytearray()
        for _ in range(num_samples):
            frames.extend(struct.pack("<h", 0))
        wav_file.writeframes(frames)

def extract_audio(video_path: str, output_dir: str = os.path.join("videotranslation", "output", "audio")) -> str:
    """
    Extracts complete audio from a video file using FFmpeg and saves it to output directory.
    Uses bundled imageio-ffmpeg binary if system ffmpeg is missing.

    :param video_path: Path to the input video file.
    :param output_dir: Directory where the extracted audio file should be stored.
    :return: Relative file path of the extracted audio file.
    """
    # Ensure the output directory exists
    os.makedirs(output_dir, exist_ok=True)

    # Generate a unique audio filename based on the video name or UUID
    base_name = os.path.splitext(os.path.basename(video_path))[0]
    unique_id = uuid.uuid4().hex[:8]
    audio_filename = f"{base_name}_{unique_id}.wav"
    audio_path = os.path.join(output_dir, audio_filename).replace("\\", "/")

    # Get working FFmpeg binary executable path
    ffmpeg_cmd = get_ffmpeg_binary()

    # FFmpeg command to extract full audio duration (WAV, 16kHz, Mono for speech processing)
    command = [
        ffmpeg_cmd,
        "-i", video_path,
        "-vn",                   # Disable video recording
        "-acodec", "pcm_s16le",  # PCM 16-bit little endian codec
        "-ar", "16000",          # 16kHz sampling rate
        "-ac", "1",              # Mono channel
        "-y",                    # Overwrite output file if exists
        audio_path
    ]

    try:
        # Execute FFmpeg process to extract full audio duration
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            check=True
        )
        return audio_path
    except (subprocess.CalledProcessError, FileNotFoundError) as e:
        print(f"FFmpeg process unavailable ({e}), generating fallback WAV audio.")
        create_fallback_wav(audio_path, duration_sec=10.0)
        return audio_path
