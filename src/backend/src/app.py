"""Configures and sets up the app connecting frontend to backend via RESTful APIs"""
import set_root_backend
from src.controller import database
from src.controller import authentication_controller
import sys
from flask import Flask


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
if sys.argv.__len__() > 1:
    configure_app(app, sys.argv[1])
    authentication_controller.set_controller(sys.argv[1])
else:
    print("no argument, defaulting to debug config")
    configure_app(app, 2)
    authentication_controller.set_controller("2")

database.set_db(app)

from src.api.login import Login
from src.api.logout import Logout
from src.api.search import Search
from src.api.milestone import Milestone
from src.api.set_skill import SetSkill
from flask_restful import Api
from flask_restful.utils import cors


api = Api(app)
api.decorators = [cors.crossdomain(origin='http://localhost:3000', headers=['accept', 'Content-Type', 'access-control-allow-origin'])]
api.add_resource(Login, "/login")
api.add_resource(Logout, "/logout")
api.add_resource(Search, "/search")
api.add_resource(Milestone, "/milestone")
api.add_resource(SetSkill, "/skill")


if __name__ == "__main__":
    app.run()
