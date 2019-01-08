import datetime
from controller.database import db


class Guidelines(db.Model):
    __tablename__ = 'guidelines'
    skill_id = db.Column(db.Integer, primary_key=True)
    level = db.Column(db.Integer, primary_key=True)
    information = db.Column(db.Text, nullable=True, default='')

class Hierarchy(db.Model):
    __tablename__ = 'hierarchy'
    parent_skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), nullable=True)
    child_skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    parent_skill_assoc =db.relationship("Skill", foreign_keys=[parent_skill_id])
    child_skill_assoc =db.relationship("Skill", foreign_keys=[child_skill_id])


class Association(db.Model):
    __tablename__ = 'association'
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    date_id = db.Column(db.Integer, db.ForeignKey('date.id'), primary_key=True)
    level = db.Column(db.Integer, primary_key=True)
    users_assoc = db.relationship("Users", back_populates="users_association")
    skill_assoc = db.relationship("Skill", back_populates="skill_association")
    date_assoc = db.relationship("Date", back_populates="date_association")


class MilestoneAssociation(db.Model):
    __tablename__ = 'milestoneassociation'
    milestone_users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    milestone_skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    milestone_date_id = db.Column(db.Integer, db.ForeignKey('date.id'), primary_key=True)
    comment = db.Column(db.String(85), primary_key=True)
    level = db.Column(db.Integer, nullable=False)
    users_milestone_assoc = db.relationship("Users", back_populates="users_milestone_association")
    skill_milestone_assoc = db.relationship("Skill", back_populates="skill_milestone_association")
    date_milestone_assoc = db.relationship("Date", back_populates="date_milestone_association")


class Skill(db.Model):
    __tablename__ = 'skill'
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.Text, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    root = db.Column(db.Boolean, unique=False, default=False)
    skill_association = db.relationship("Association", back_populates="skill_assoc")
    skill_milestone_association = db.relationship("MilestoneAssociation", back_populates="skill_milestone_assoc")

    def give_name(self):
        return self.name

    def __repr__(self):
        return '<name {0}>'.format(self.name)


class Date(db.Model):
    """SQL-Alchemy object date."""
    __tablename__ = 'date'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, nullable=False, default=datetime.date.today())
    # z.B. '9999-12-12'
    date_association = db.relationship("Association", back_populates="date_assoc")
    date_milestone_association = db.relationship("MilestoneAssociation", back_populates="date_milestone_assoc")

    def get_id(self):
        return self.id

    def get_date(self):
        return self.date


class Users(db.Model):
    """SQL-Alchemy object users. Has an autoincremented id, an username and a name"""
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(45), nullable=False)
    name = db.Column(db.String(80), nullable=False)
    users_association = db.relationship("Association", back_populates="users_assoc")
    users_milestone_association = db.relationship("MilestoneAssociation", back_populates="users_milestone_assoc")

    def give_name(self):
        return self.username

    def __repr__(self):
        return '<id = {0} und username = {1}>'.format(self.id, self.username)
