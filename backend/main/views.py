import os
from flask import Flask, jsonify, request, abort, make_response
from . import main
from backend.models import Timeframe
import json




@main.route("/", methods=["GET"])
def index():
    return 'hello world'

@main.route("/clean", methods=["GET"])
def clean():
    f = open('Murder-on-the-2nd-Floor-Raw-Data.json')
    data = json.load(f)
    f.close()
    req_data = request.get_json()

    start = req_data['start']
    finish = req_data['finish']
    print(start)
    print(finish)
    t = Timeframe(start=start, finish=finish)
    list_of_frames = []
    list_of_frames.append(t)
    return jsonify(list_of_frames)