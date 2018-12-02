import sys

import json
from flask import Response, request
from flask_restful import Resource, reqparse

from src.controller.controller import controller


class Search(Resource):
    '''Search-API deserializes the query.
    Takes id of the searching user and an array of skills (currently only one term)'''
    def post(self):
            query = json.loads(request.json)
            try:
                message = controller.search(query)
                print(message, file=sys.stderr)
                return Response(message, status=200, mimetype="application/json")
            except ValueError:
                print(json.dumps(list()))
                return json.dumps(list())

    def options(self):
        pass
