"""Contains model for Skills"""
from src.model.model import Model
import json


class SkillModel(Model):

    """This class converts a skill to a JSON which is a component of a Profile """

    def __init__(self, skill_name, level, milestones=None):
        self.skill_name = skill_name
        self.level = level
        self.milestones = milestones

    def to_json(self):
        json_milestones = list()
        if self.milestones:
            for milestone in self.milestones:
                json_milestones.append(milestone.to_json())
        model = dict(skillname=self.skill_name, level=self.level, milestones=json_milestones)
        return json.dumps(model)
