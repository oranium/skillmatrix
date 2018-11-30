'''The rest_api module provides REST-APIs for communication to the SkillMatrix frontend.'''
from src.controller import database
from src.api.login import Login
from src.api.logout import Logout
from src.api.search import Search
from src.api.milestone import Milestone
from src.api.set_skill import SetSkill
from flask import Flask
from flask_restful import Api
from flask_restful.utils import cors

app = Flask(__name__)
database.set_db(app)
api = Api(app)
api.decorators=[cors.crossdomain(origin='http://localhost:3000', headers=['accept', 'Content-Type', 'access-control-allow-origin'])]
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Momomomo2@localhost/sm1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Search, "/search")
api.add_resource(Milestone, "/milestone")
api.add_resource(SetSkill, "/skill")

if __name__ == "__main__":
    app.run(debug=True)
