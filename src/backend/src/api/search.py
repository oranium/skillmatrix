import sys
import json
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class Search(Resource):
    """Search-API deserializes the query.
    Takes id of the searching user and an array of skills (currently only one term)"""
    def post(self):
            parser = reqparse.RequestParser()
            parser.add_argument("query", type=dict)
            args = parser.parse_args()
            print(args, file=sys.stderr)
            try:
                message = json.dumps(controller.search(args["query"]))
                print(message, file=sys.stderr)
                return Response(message, status=200, mimetype="application/json")
            except ValueError:
                print(json.dumps(list()))
                return json.dumps(list())

    def options(self):
        pass
