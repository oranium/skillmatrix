"""Singleton. contains the DB model from SQLAlchemy, gets created by the App and used by DatabaseController"""
from flask_sqlalchemy import SQLAlchemy
db = None


def set_db(app):
    global db
    db = SQLAlchemy(app)
