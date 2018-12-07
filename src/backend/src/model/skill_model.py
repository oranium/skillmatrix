"""Contains model for Skills"""
import set_root_backend
from model.model import Model


class SkillModel(Model):

    """This class converts a skill to a JSON which is a component of a Profile """

    def __init__(self, skill_name, level, milestones=None):
        self.skill_name = skill_name
        self.level = level
        self.milestones = milestones

    def jsonable(self):
        jsonable_milestones = list()
        if self.milestones:
            for milestone in self.milestones:
                jsonable_milestones.append(milestone.jsonable())
        return dict(skillname=self.skill_name, level=self.level, milestones=jsonable_milestones)
