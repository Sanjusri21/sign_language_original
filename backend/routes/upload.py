import os
import uuid
from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from services.ffmpeg_service import extract_audio

upload_bp = Blueprint("upload", __name__)

UPLOAD_FOLDER = os.path.join("uploads", "videos")
ALLOWED_EXTENSIONS = {"mp4", "mov", "avi", "mkv", "webm"}

def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@upload_bp.route("/api/upload", methods=["POST"])
def upload_video():
    # Validate request has video file field
    if "video" not in request.files:
        return jsonify({"status": "error", "message": "No video file provided in request field 'video'"}), 400

    file = request.files["video"]

    if file.filename == "":
        return jsonify({"status": "error", "message": "No file selected"}), 400

    if not allowed_file(file.filename):
        return jsonify({"status": "error", "message": "Invalid file format. Allowed: mp4, mov, avi, mkv, webm"}), 400

    try:
        # Ensure uploads/videos directory exists
        os.makedirs(UPLOAD_FOLDER, exist_ok=True)

        # Sanitize and create unique filename
        filename = secure_filename(file.filename)
        base_name, ext = os.path.splitext(filename)
        unique_id = uuid.uuid4().hex[:8]
        saved_filename = f"{base_name}_{unique_id}{ext}"
        video_path = os.path.join(UPLOAD_FOLDER, saved_filename).replace("\\", "/")

        # Save uploaded video
        file.save(video_path)

        # Extract audio using FFmpeg service
        audio_path = extract_audio(video_path)

        # Return success JSON response
        return jsonify({
            "status": "success",
            "videoPath": video_path,
            "audioPath": audio_path
        }), 200

    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
