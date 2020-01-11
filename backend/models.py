import json
from werkzeug.security import generate_password_hash, check_password_hash

class Timeframe:

    def __init__(self, start, finish):
        self.start = start
        self.finish = finish

    def serialize(self):
        return {"start": self.start, "finish": self.finish}