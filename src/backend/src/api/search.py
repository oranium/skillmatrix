import sys

import json
from flask import Response
from flask_restful import Resource

from src.controller import database_controller
from src.app import parser


class Search(Resource):
    '''Search-API deserializes the query.
    Takes id of the searching user and an array of skills (currently only one term)'''
    def post(self):
        parser.add_argument("query", type=str)
        args = parser.parse_args()
        try:
            message = database_controller.handle_query(self, args["query"])
            print(message,file=sys.stderr)
            return Response(message, status=200, mimetype="application/json")
        except ValueError:
            print(json.dumps(list()))
            return json.dumps(list())

    def options(self):
        pass