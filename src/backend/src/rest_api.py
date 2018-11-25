'''The rest_api module provides REST-APIs for communication to the SkillMatrix frontend.'''
import parentdir
from src.authentication import Authentication
from flask import Flask, Response
import json
from flask_restful import Resource, Api, reqparse
from flask_restful.utils import cors
from flask_sqlalchemy import SQLAlchemy
import sys


app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()
api.decorators=[cors.crossdomain(origin='http://localhost:3000', headers=['accept', 'Content-Type', 'access-control-allow-origin'])]
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
AUTH = Authentication("ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389")
db = SQLAlchemy(app)

from src import database_manager


class Login(Resource):
    '''Login-API deserializes JSON and hands it to the Authentication class of authentication module'''
    def post(self):
        parser.add_argument("username", type=str)
        parser.add_argument("password", type=str)
        args = parser.parse_args()
        try:
            message = AUTH.login(args["username"], args["password"])
            return Response(message, status=200, mimetype="application/json")
        except AttributeError:
            return Response(status=400)
        except TimeoutError:
            return Response(status=504)
        except Exception as e:
            print(e,file=sys.stderr)
            return Response(status=520)
    
    def options(self):
        pass

class Logout(Resource):
    '''Login-API deserializes JSON and hands it to the Authentication class of authentication module'''
    def post(self):
        parser.add_argument("username", type=str)
        args = parser.parse_args()
        try:
            AUTH.logout(args["username"])
            return Response(status=200)
        except Exception:
            return Response(status=520)
    
    def options(self):
        pass
        
            
class Search(Resource):
    '''Search-API deserializes the query. 
    Takes id of the searching user and an array of skills (currently only one term)'''
    def post(self):
        parser.add_argument("query", type=str)
        args = parser.parse_args()
        try:
            return database_manager.handle_query(self,args["query"])
        except ValueError:
            return json.dumps(list())

    def options(self):
        pass

api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Search,"/search")

if __name__ == "__main__":
    app.run(debug=True)
