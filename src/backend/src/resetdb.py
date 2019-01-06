import os
import sys
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine, Date, Text, Boolean
from sqlalchemy.orm import sessionmaker
from os import environ
 
Base = declarative_base()

class Guidelines(Base):
    __tablename__ = 'guidelines'
    skill_id = Column(Integer, primary_key=True)
    level = Column(Integer, primary_key=True)
    information = Column(Text, nullable=True, default='')

class Hierarchy(Base):
    __tablename__ = 'hierachy'
    parent_skill_id = Column(Integer, ForeignKey('skill.id'), nullable=False)
    child_skill_id = Column(Integer, ForeignKey('skill.id'), primary_key=True)
    parent_skill_assoc = relationship("Skill", foreign_keys=[parent_skill_id])
    child_skill_assoc = relationship("Skill", foreign_keys=[child_skill_id])


class Association(Base):
    __tablename__ = 'association'
    users_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    skill_id = Column(Integer, ForeignKey('skill.id'), primary_key=True)
    date_id = Column(Integer, ForeignKey('date.id'), primary_key=True)
    level = Column(Integer, primary_key=True)
    users_assoc = relationship("Users", back_populates="users_association")
    skill_assoc = relationship("Skill", back_populates="skill_association")
    date_assoc = relationship("Date", back_populates="date_association")


class MilestoneAssociation(Base):
    __tablename__ = 'milestoneassociation'
    milestone_users_id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    milestone_skill_id = Column(Integer, ForeignKey('skill.id'), primary_key=True)
    milestone_date_id = Column(Integer, ForeignKey('date.id'), primary_key=True)
    comment = Column(String(85), primary_key=True)
    level = Column(Integer, nullable = True)
    users_milestone_assoc = relationship("Users", back_populates="users_milestone_association")
    skill_milestone_assoc = relationship("Skill", back_populates="skill_milestone_association")
    date_milestone_assoc = relationship("Date", back_populates="date_milestone_association")


class Skill(Base):
    __tablename__ = 'skill'
    id = Column(Integer, primary_key=True)
    name = Column(String(127), nullable=False)
    root = Column(Boolean, unique=False, default=False)
    skill_association = relationship("Association", back_populates="skill_assoc")
    skill_milestone_association = relationship("MilestoneAssociation", back_populates="skill_milestone_assoc")
    #skill_parent_skill = relationship("Hierarchy", back_populates="parent_skill_assoc")
    #skill_child_skill = relationship("Hierarchy", back_populates="child_skill_assoc")

    def give_name(self):
        return self.name

    def __repr__(self):
        return '<name {0}>'.format(self.name)


class Date(Base):
    """SQL-Alchemy object date."""
    __tablename__ = 'date'
    id = Column(Integer, primary_key=True)
    date = Column(Date, nullable=False, default=datetime.date.today())
    # z.B. '9999-12-12'
    date_association = relationship("Association", back_populates="date_assoc")
    date_milestone_association = relationship("MilestoneAssociation", back_populates="date_milestone_assoc")

    def get_id(self):
        return self.id

    def get_date(self):
        return self.date



class Users(Base):
    """SQL-Alchemy object users. Has an autoincremented id, an username, a name"""
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String(45), nullable=False)
    name = Column(String(80), nullable= False)
    users_association = relationship("Association", back_populates="users_assoc")
    users_milestone_association = relationship("MilestoneAssociation", back_populates="users_milestone_assoc")

    def give_name(self):
        return self.username

    def __repr__(self):
        return '<id = {0} und username = {1}>'.format(self.id, self.username)


engine = create_engine('mysql+pymysql://root:Momomomo2@localhost/sm1')

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(engine)
DBSession = sessionmaker(bind=engine)
session = DBSession()

def create_hiestory(parent, child):
    x = Hierarchy()
    x.parent_skill_assoc= parent
    x.child_skill_assoc= child
    session.add(x)
    session.commit()

def change_guideline(skill_id, level, new_information):
    if session.query(Guidelines).filter(Guidelines.skill_id == skill_id, Guidelines.level == level).all():
        print("gibt es schon")
        d = session.query(Guidelines).filter(Guidelines.skill_id == skill_id, Guidelines.level == level).one()
        session.delete(d)
        session.commit()
    newguideline = Guidelines(skill_id = skill_id, level = level, information = new_information)
    session.add(newguideline)
        

def create_guidelines(skill_id, information_list):
    level = 1
    for information in information_list:
        newguideline = Guidelines(skill_id = skill_id, level = level, information = information)
        session.add(newguideline)
        session.commit()
        level = level +1


def create_skill(level, skill, date, username):
    a = Association(level=level)
    a.skill_assoc = skill
    a.date_assoc = date
    a.users_assoc = username

'''class Setup():

    engine = create_engine(environ.get('ENV_DATABASE_URI_TEST'))

    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(engine)
    DBSession = sessionmaker(bind=engine)
    session = DBSession()


    def create_hiestory(self, parent, child):
        x = Hierarchy()
        x.parent_skill_assoc= parent
        x.child_skill_assoc= child
        self.session.add(x)
        self.session.commit()


    def create_skill(self, level, skill, date, username):
        a = Association(level=level)
        a.skill_assoc = skill
        a.date_assoc = date
        a.users_assoc = username

testSetup = Setup()'''

inforlsite = ["gar nicht gut", "nicht gut", "mittel", "schon gut", "sehr gut"]
pythonlevel1 = Guidelines(skill_id = 2, level = 1, information = "gar nicht gut")
pythonlevel2 = Guidelines(skill_id = 2, level = 2, information = "nicht gut")
pythonlevel3 = Guidelines(skill_id = 2, level = 3, information = "mittel")
pythonlevel4 = Guidelines(skill_id = 2, level = 4, information = "schon gut")
pythonlevel5 = Guidelines(skill_id = 2, level = 5, information = "what a man :O")
session.add(pythonlevel1)
session.add(pythonlevel2)
session.add(pythonlevel3)
session.add(pythonlevel4)
session.add(pythonlevel5)
valdemar = Users(username='Valdemar-Forsberg',name="Valdemar Forsberg")
karl = Users(username='Karl-Kalagin', name="Karl Kalagin")
isaac = Users(username='Isaac-Hunt', name="Isaac Hunt")
session.add(valdemar)
session.add(karl)
session.add(isaac)
prog = Skill(name='Programming', root = True)
java1 = Skill(name='Java')
python1 = Skill(name='Python')
js1 = Skill(name='JavaScript')
session.add(java1)
session.add(python1)
session.add(prog)
session.add(js1)
date1 = Date()
session.add(date1)
a = Association(level=4)
a.skill_assoc = js1
a.date_assoc = date1
a.users_assoc = isaac
b = MilestoneAssociation(comment='bootcamp69')
b.skill_milestone_assoc = js1
b.date_milestone_assoc = date1
b.users_milestone_assoc = isaac
create_skill(3, js1, date1, isaac)
create_skill(3, python1, date1, karl)
create_skill(3, java1, date1, valdemar)
create_skill(4, js1, date1, karl)
create_skill(4, python1, date1, valdemar)
create_skill(2, java1, date1, isaac)
create_skill(2, js1, date1, valdemar)
create_skill(3, python1, date1, isaac)
create_skill(1, java1, date1, karl)
x = Hierarchy()
x.parent_skill_assoc= java1
x.child_skill_assoc= python1
session.add(x)
create_hiestory(python1,js1)
create_guidelines(1,inforlsite)
change_guideline(1,2,"neue information")
session.commit()

