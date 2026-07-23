import os
import sys
import importlib
from dotenv import load_dotenv

# Ensure environment variables from backend/.env are loaded
load_dotenv()

_local_whisper_model = None

def get_local_whisper_model():
    global _local_whisper_model
    if _local_whisper_model is None:
        try:
            whisper_mod = importlib.import_module("whisper")
            load_model = getattr(whisper_mod, "load_model")
            print("Loading local OpenAI Whisper model ('tiny')...")
            _local_whisper_model = load_model("tiny")
        except Exception as e:
            print(f"Local Whisper model load note: {e}")
            _local_whisper_model = False
    return _local_whisper_model if _local_whisper_model is not False else None

def transcribe_with_groq(target_path: str) -> str:
    groq_key = os.getenv("GROQ_API_KEY")
    if not groq_key or not groq_key.strip():
        return None

    try:
        print(f"Transcribing audio using Groq API (whisper-large-v3-turbo): {target_path}")
        groq_mod = importlib.import_module("groq")
        Groq = getattr(groq_mod, "Groq")
        client = Groq(api_key=groq_key.strip())

        with open(target_path, "rb") as file:
            filename = os.path.basename(target_path)
            transcription = client.audio.transcriptions.create(
                file=(filename, file.read()),
                model="whisper-large-v3-turbo",
                response_format="json",
                language="en",
                temperature=0.0
            )
            text = getattr(transcription, "text", "") or ""
            if isinstance(transcription, dict):
                text = transcription.get("text", "")

            if text.strip():
                print(f"Groq STT Output: {text[:80]}...")
                return text.strip()
    except Exception as e:
        print(f"Groq API transcription note/error: {e}")
    return None

def transcribe_with_speech_recognition(target_path: str) -> str:
    try:
        sr = importlib.import_module("speech_recognition")
        recognizer = sr.Recognizer()
        with sr.AudioFile(target_path) as source:
            audio_data = recognizer.record(source)
            text = recognizer.recognize_google(audio_data)
            if text and text.strip():
                print(f"SpeechRecognition (Google STT) Output: {text[:60]}...")
                return text.strip()
    except Exception as e:
        print(f"SpeechRecognition note/error: {e}")
    return None

def transcribe_audio(audio_path: str) -> str:
    """
    Transcribes audio file to text using available speech-to-text engines:
    1. Groq API (whisper-large-v3-turbo) if GROQ_API_KEY is configured in .env.
    2. Local OpenAI Whisper model (tiny/base) for offline speech recognition.
    3. SpeechRecognition (Google STT).
    """
    # Resolve relative audio_path against backend root directory
    target_path = audio_path
    if not os.path.isabs(target_path):
        base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
        possible_path = os.path.join(base_dir, target_path)
        if os.path.exists(possible_path):
            target_path = possible_path
        else:
            fallback_path = os.path.join(base_dir, "videotranslation", target_path)
            if os.path.exists(fallback_path):
                target_path = fallback_path

    if not os.path.exists(target_path):
        print(f"Audio file not found at: {target_path}")
        return "Audio file could not be found for speech-to-text processing."

    print(f"Processing speech-to-text for: {target_path}")

    # 1. Groq API
    groq_text = transcribe_with_groq(target_path)
    if groq_text:
        return groq_text

    # 2. Local OpenAI Whisper
    model = get_local_whisper_model()
    if model:
        try:
            print(f"Transcribing audio with local OpenAI Whisper: {target_path}")
            result = model.transcribe(target_path, fp16=False, language="en")
            text = result.get("text", "").strip()
            if text:
                print(f"Local Whisper Output: {text[:80]}...")
                return text
        except Exception as e:
            print(f"Local Whisper error: {e}")

    # 3. SpeechRecognition
    sr_text = transcribe_with_speech_recognition(target_path)
    if sr_text:
        return sr_text

    return "No speech detected in audio clip."





