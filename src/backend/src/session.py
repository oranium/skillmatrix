from flask_sqlalchemy import SQLAlchemy
from database_manager import db


class Session(db.Model):
    __tablename__ = 'session'
    id = db.Column(db.Integer, primary_key=True)
    val = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return '<id {0}>'.format(self.id) 

