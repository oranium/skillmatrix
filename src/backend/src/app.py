'''The rest_api module provides REST-APIs for communication to the SkillMatrix frontend.'''
from src.api.login import Login
from src.api.logout import Logout
from src.api.search import Search
from src.api.milestone import Milestone
from src.api.set_skill import SetSkill
from src.controller.authentication_controller import Authentication
from flask import Flask
from flask_restful import Api, reqparse
from flask_restful.utils import cors
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
parser = reqparse.RequestParser()
api.decorators=[cors.crossdomain(origin='http://localhost:3000', headers=['accept', 'Content-Type', 'access-control-allow-origin'])]
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
AUTH = Authentication("ldap://vm01-azure-ad.westeurope.cloudapp.azure.com:389")
db = SQLAlchemy(app)

api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Search, "/search")
api.add_resource(Milestone, "/milestone")
api.add_resource(SetSkill, "/skill")

if __name__ == "__main__":
    app.run(debug=True)
