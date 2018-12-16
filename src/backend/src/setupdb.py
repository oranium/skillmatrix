#it was so nice i build it twice
import os
import sys
import datetime
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine, Text
from sqlalchemy import Date as DateType
from sqlalchemy.orm import sessionmaker
from os import environ

def checkdb(): 
    engine = create_engine(environ.get('ENV_DATABASE_URI'))

    if not engine.dialect.has_table(engine, 'association'):
        Base = declarative_base()
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
            description = Column(Text, nullable=True)
            category = Column(String(127), nullable=False)
            skill_association = relationship("Association", back_populates="skill_assoc")
            skill_milestone_association = relationship("MilestoneAssociation", back_populates="skill_milestone_assoc")

            def give_name(self):
                return self.name

            def __repr__(self):
                return '<name {0}>'.format(self.name)


        class Date(Base):
            """SQL-Alchemy object date."""
            __tablename__ = 'date'
            id = Column(Integer, primary_key=True)
            date = Column(DateType, nullable=False, default=datetime.date.today())
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


        
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(engine)
        DBSession = sessionmaker(bind=engine)
        session = DBSession()

        def create_skill(level, skill, date, username):
            a = Association(level=level)
            a.skill_assoc = skill
            a.date_assoc = date
            a.users_assoc = username

        valdemar = Users(username='Valdemar-Forsberg',name="Valdemar Forsberg")
        karl = Users(username='Karl-Kalagin', name="Karl Kalagin")
        isaac = Users(username='Isaac-Hunt', name="Isaac Hunt")
        session.add(valdemar)
        session.add(karl)
        session.add(isaac)
        java1 = Skill(name='Java', category="Programming")
        python1 = Skill(name='Python', category="Programming")
        js1 = Skill(name='JavaScript', category="Programming")
        session.add(java1)
        session.add(python1)
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
        session.commit()
        return 'new setup'
        
    else:
        return 'db already exists'
        


