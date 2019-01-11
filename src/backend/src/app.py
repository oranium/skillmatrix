"""Configures and sets up the app connecting frontend to backend via RESTful APIs"""
from flask import Flask
from flask_restful import Api
from flask_restful.utils import cors
from os import environ
import setupdb
import sys
import time
from controller import database


print(environ.keys(), file=sys.stderr)
app = Flask(__name__)
app.config['TESTING'] = environ.get('ENV_TESTING')
app.config['DEBUG'] = environ.get('ENV_DEBUG')
if app.config['TESTING'] == 'True':
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('ENV_TESTDATABASE_URI')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('ENV_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connected = None
while not connected:
    try:
        setupdb.checkdb()
        connected = True
    except Exception as e:
        print("Cannot connect to database. Retrying in 5s", file=sys.stderr)
        time.sleep(5)
database.set_db(app)


from api.login import Login
from api.logout import Logout
from api.search import Search
from api.milestone import Milestone
from api.set_skills import SetSkills
from api.get_skills import GetSkills
from api.create_skill import CreateSkill
from api.guideline import Guideline
from api.remove_skill import RemoveSkill
from api.remove_milestone import RemoveMilestone

api = Api(app)
api.decorators = [cors.crossdomain(origin='*',
                                   headers=['accept', 'Content-Type', 'Access-Control-Allow-Origin'])]
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Search, "/search")
api.add_resource(Milestone, "/milestone")
api.add_resource(SetSkills, "/setSkills")
api.add_resource(GetSkills, "/getSkills")
api.add_resource(CreateSkill, "/createSkill")
api.add_resource(Guideline, "/guideline")
api.add_resource(RemoveSkill, "/deleteSkill")
api.add_resource(RemoveMilestone, "/deleteMilestone")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
