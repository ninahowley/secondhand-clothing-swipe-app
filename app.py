
import math
import numpy as np
import pandas as pd

import algorithm
from flask import Flask, requests, jsonify
import csv
import os

app = (__name__)

CSV_FILE = "swiped.csv"

if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["title", "type", "style", "color", "url", "image", "liked"])

@app.route("/swipe", methods=["POST"]) # Flask decorator that defines an API endpoint
def swipe():
    data = request.json
    '''
    The data from request.json should look like this:
    {
    "title": "top_goth_black",
    "style": "goth",
    "type": "top",
    "color": "black",
    "url": clothes["url"]
    "image": "www.themediawherethispictureresides.com"
    "liked": 1
    }
    '''
    title = data.get("title")
    style = data.get("style")
    type_ = data.get("type")
    color = data.get("color")
    url = data.get("url")
    image = data.get("image")
    liked = data.get("liked")

    with open(CSV_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow([title, style, type_, color, url, image, liked])

        return jsonify({"status": "success", "message": "Swipe saved!"})

@app.route("/recommend_items", methods=["GET"])
def recommend_items():
    return jsonify(algorithm.recommend_items())

@app.route("/recommend_outfits", methods=["GET"])
def recommend_outfits():
    return jsonify(algorithm.recommend_outfits())

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port = 5000, debug = True)