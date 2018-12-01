from src.controller.database import db



class Skill(db.Model):
    __tablename__ = 'skill'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(127), nullable=False)
    description = db.Column(db.Text, nullable=True)
    skill_association = db.relationship("Association", back_populates="skill_assoc")

    def give_level(self):
        return self.level

    def __repr__(self):
        return '<name {0} und level {1}>'.format(self.name, self.level)