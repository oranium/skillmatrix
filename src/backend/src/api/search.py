import json
import traceback
from flask import Response
from flask_restful import Resource, reqparse
from controller.controller import controller


class Search(Resource):
    """Search-API deserializes the query.
    Takes id of the searching user and an array of skills (currently only one term)"""
    def post(self):
            parser = reqparse.RequestParser()
            parser.add_argument("username", type=str)
            parser.add_argument("query", type=dict)
            args = parser.parse_args()
            try:
                message = json.dumps(controller.search(args["username"], args["query"]))
                return Response(message, status=200, mimetype="application/json")
            except ValueError:
                return json.dumps(list())
            except PermissionError:
                return Response(status=401)
            except Exception:
                traceback.print_exc()
                return Response(status=520)

    def options(self):
        pass
