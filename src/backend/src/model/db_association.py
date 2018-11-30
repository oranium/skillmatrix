from src.controller.database import db


class Association(db.Model):
    __tablename__ = 'association'
    users_id = db.Column(db.Integer, db.ForeignKey('users.id'), primary_key=True)
    skill_id = db.Column(db.Integer, db.ForeignKey('skill.id'), primary_key=True)
    level = db.Column(db.Integer, nullable=False)
    time_id = db.Column(db.Integer, db.ForeignKey('time.id'), nullable=False)
    milestone_id = db.Column(db.Integer, db.ForeignKey('milestone.id'), nullable=True)
    users_assoc = db.relationship("Users", back_populates="users_association")
    skill_assoc = db.relationship("Skill", back_populates="skill_association")
    time_assoc = db.relationship("Time", back_populates="time_association")
    milestone_assoc = db.relationship("Milestone", back_populates="milestone_association")