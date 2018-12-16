"""Configures and sets up the app connecting frontend to backend via RESTful APIs"""
from flask import Flask
from flask_restful import Api
from flask_restful.utils import cors
from os import environ
import setupdb
import sys
from controller import database


print(environ.keys(), file=sys.stderr)
app = Flask(__name__)
app.config['TESTING'] = environ.get('ENV_TESTING')
app.config['DEBUG'] = environ.get('ENV_DEBUG')
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('ENV_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

fail = True
while (fail):
    try:
        setupdb.checkdb()
        fail = False
    except Exception as e:
        print(str(e))
        fail = True
database.set_db(app)


from api.login import Login
from api.logout import Logout
from api.search import Search
from api.milestone import Milestone
from api.set_skill import SetSkill


api = Api(app)
api.decorators = [cors.crossdomain(origin='*',
                                   headers=['accept', 'Content-Type', 'Access-Control-Allow-Origin'])]
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Search, "/search")
api.add_resource(Milestone, "/milestone")
api.add_resource(SetSkill, "/skill")


if __name__ == "__main__":
    app.run(host="0.0.0.0")
