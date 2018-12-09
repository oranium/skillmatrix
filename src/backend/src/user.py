from flask_sqlalchemy import SQLAlchemy
from database_manager import db

class Users(db.Model):
    '''SQL-Alchemy object users. Has an autoincremented id, an username, a surname, a forename and a place which can be NULL'''
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), nullable=False)
    #surname = db.Column(db.String(45), nullable=False)
    #forename = db.Column(db.String(45), nullable=False)
    #place = db.Column(db.String(45), nullable=True)
    has_skill = db.relationship('skill', secondary=user_skill, backref=db.backref('has_user', lazy = 'dynamic'))

    def give_name(self):
        return self.username

    def __repr__(self):
        return '<id = {0} und username = {1}>'.format(self.id, self.username)
