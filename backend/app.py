import os
from flask import Flask, send_from_directory
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Enable CORS for frontend integration
CORS(app)

# Ensure required directories exist
os.makedirs(os.path.join("videotranslation", "uploads", "videos"), exist_ok=True)
os.makedirs(os.path.join("videotranslation", "output", "audio"), exist_ok=True)

# Register routes
from videotranslation.routes.upload import upload_bp
from videotranslation.routes.transcribe import transcribe_bp

app.register_blueprint(upload_bp)
app.register_blueprint(transcribe_bp)

# Static file serving routes for video and audio playback
@app.route("/uploads/videos/<filename>")
def serve_video(filename):
    return send_from_directory(os.path.join("videotranslation", "uploads", "videos"), filename)

@app.route("/output/audio/<filename>")
def serve_audio(filename):
    return send_from_directory(os.path.join("videotranslation", "output", "audio"), filename)

@app.route("/favicon.ico")
def favicon():
    return "", 204

@app.route("/")
def index():
    return {
        "service": "SignAura Backend API",
        "version": "1.0.0",
        "status": "running"
    }

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
