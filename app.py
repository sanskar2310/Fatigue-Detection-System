from flask import Flask, render_template, jsonify, send_from_directory
from flask_cors import CORS
import threading
import Drowsiness_detector
import pygame
import gunicorn

#Intialize Pygame
pygame.init()

#load the alram sound
alarm_sound = pygame.mixer.Sound("alram.wav")

#flask app initialization
app = Flask(__name__, static_url_path="/static")
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/start_detection', methods=['GET'])
def start_detection():
    detection_thread = threading.Thread(target=Drowsiness_detector.detect_drowsiness)
    detection_thread.start()
    return jsonify({"status": "success"})


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(debug=False)

