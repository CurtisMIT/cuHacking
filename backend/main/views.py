import os
from flask import Flask, jsonify, request, abort, make_response
from . import main
import json


@main.route("/", methods=["GET"])
def index():
    return 'hello world'

@main.route("/clean", methods=["GET"])
def clean():
    f = open('Murder-on-the-2nd-Floor-Raw-Data.json')
    data = json.load(f)
    f.close()

    return data