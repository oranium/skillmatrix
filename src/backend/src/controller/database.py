"""Singleton. contains the DB model from SQLAlchemy, gets created by the App and used by DatabaseController"""
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


def set_db(app):
    db.init_app(app)
