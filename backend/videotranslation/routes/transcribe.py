import os
from flask import Blueprint, request, jsonify
from videotranslation.services.whisper_service import transcribe_audio

transcribe_bp = Blueprint("transcribe", __name__)

@transcribe_bp.route("/api/transcribe", methods=["POST"])
def transcribe():
    data = request.get_json(silent=True) or {}
    audio_path = data.get("audioPath") or data.get("videoPath")

    if not audio_path:
        return jsonify({"status": "error", "message": "Missing audioPath or videoPath parameter"}), 400

    try:
        transcript = transcribe_audio(audio_path)
        return jsonify({
            "status": "success",
            "audioPath": audio_path,
            "transcript": transcript
        }), 200
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
