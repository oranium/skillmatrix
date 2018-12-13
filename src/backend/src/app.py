"""Configures and sets up the app connecting frontend to backend via RESTful APIs"""
import sys
from flask import Flask
from flask_restful import Api
from flask_restful.utils import cors
from controller import database
from controller import authentication_controller


def configure_app(capp, arg):
    if arg == "0":
        print("PRODUCTION MODE")
        capp.config.from_object("config.ProductionConfig")
    if arg == "1":
        print("TEST MODE")
        capp.config.from_object("config.TestConfig")
    if arg == "2":
        print("DEBUGGING MODE")
        capp.config.from_object("config.DebugConfig")


app = Flask(__name__)
# set the configurations for testing/debugging/database with 0: production, 1: test, 2: debugging
# configuration is mandatory before local imports
if sys.argv.__len__() > 1:
    configure_app(app, sys.argv[1])
    authentication_controller.set_controller(sys.argv[1])
else:
    print("no argument, defaulting to debug config")
    configure_app(app, "2")
    authentication_controller.set_controller("2")

database.set_db(app)

# pylint: disable=wrong-import-position

from api.login import Login
from api.logout import Logout
from api.search import Search
from api.milestone import Milestone
from api.set_skill import SetSkill

# pylint: enable=wrong-import-position


api = Api(app)
api.decorators = [cors.crossdomain(origin='*',
                                   headers=['accept', 'Content-Type', 'access-control-allow-origin'])]
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Search, "/search")
api.add_resource(Milestone, "/milestone")
api.add_resource(SetSkill, "/skill")


if __name__ == "__main__":
    app.run()
