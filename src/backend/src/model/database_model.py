import datetime
import set_root_backend

from src.controller.database import db


class Association(db.Model):
    __tablename__ = 'association'
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    time_id = db.Column(db.Integer, db.ForeignKey('time.id'), nullable=False)
    level = db.Column(db.Integer, primary_key=True)
    users_assoc = db.relationship("Users", back_populates="users_association")
    skill_assoc = db.relationship("Skill", back_populates="skill_association")
    time_assoc = db.relationship("Time", back_populates="time_association")


class MilestoneAssociation(db.Model):
    __tablename__ = 'milestoneassociation'
    milestone_users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    milestone_skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    milestone_time_id = db.Column(db.Integer, db.ForeignKey('time.id'), nullable=False)
    name = db.Column(db.String(85), primary_key=True)
    users_milestone_assoc = db.relationship("Users", back_populates="users_milestone_association")
    skill_milestone_assoc = db.relationship("Skill", back_populates="skill_milestone_association")
    time_milestone_assoc = db.relationship("Time", back_populates="time_milestone_association")


class Skill(db.Model):
    __tablename__ = 'skill'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(127), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(127), nullable=False)
    skill_association = db.relationship("Association", back_populates="skill_assoc")
    skill_milestone_association = db.relationship("MilestoneAssociation", back_populates="skill_milestone_assoc")

    def give_name(self):
        return self.name

    def __repr__(self):
        return '<name {0}>'.format(self.name)


class Time(db.Model):
    """SQL-Alchemy object time."""
    __tablename__ = 'time'
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.Date, nullable=False, default=datetime.date.today())
    # z.B. '9999-12-12'
    time_association = db.relationship("Association", back_populates="time_assoc")
    time_milestone_association = db.relationship("MilestoneAssociation", back_populates="time_milestone_assoc")

    def get_id(self):
        return self.id

    def get_time(self):
        return self.time


class Users(db.Model):
    """SQL-Alchemy object users. Has an autoincremented id, an username, a surname, a forename and a place
     which can be NULL"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), nullable=False)
    surname = db.Column(db.String(45), nullable=False)
    forename = db.Column(db.String(45), nullable=False)
    users_association = db.relationship("Association", back_populates="users_assoc")
    users_milestone_association = db.relationship("MilestoneAssociation", back_populates="users_milestone_assoc")

    def give_name(self):
        return self.username

    def __repr__(self):
        return '<id = {0} und username = {1}>'.format(self.id, self.username)
