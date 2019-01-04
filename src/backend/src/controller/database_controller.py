import sys
from controller.database import db
from model.profile_model import ProfileModel
from model.skill_model import SkillModel
from model.milestone_model import MilestoneModel
from model.database_model import Association, MilestoneAssociation, Skill, Date, Users, Hierarchy


class DatabaseController:
    """Class to handle everything about table-manipulation"""

    @staticmethod
    def search(query):
        """Search through all users with a query from the backend controller.
        Finds all users that fulfill all restrictions, and all users that fulfill some but not all.
            Args:
                query(`dict(str=int)`): search terms in form skillname:min_level
            Returns:
                `dict("has_all"=[ProfileModel],"has_some"=[ProfileModel]`): sorted dictionary of results.

        """
        has_some = []
        # list of all users
        users = database_controller.get_all_users()
        # has_all starts off with every user, removes those who don't have one of the required skills
        has_all = users.copy()
        # iterate through every user and look up their skills
        for user in users:
            for skill, min_level in query.items():
                # get the skill_id from the database
                skill_id = database_controller.get_skill_id(skill)
                # get the association of the user with current skill and according minimum level
                skill_assoc = database_controller.get_assocs(users_id=user.id,
                                                             skill_id=skill_id,
                                                             level=min_level,
                                                             type="first")
                # skill_assoc will be None if the user does not have the skill on the desired level or higher
                if skill_assoc is not None:
                    print("{0} has {1} at least on level {2}".format(user.username, skill, min_level))
                    # adds user to has_some, in case he does not have other skills
                    if user not in has_some:
                        has_some.append(user)
                # if the user does not have the current skill at the required level, he gets removed from has_all
                else:
                    print("{0} has {1} not on level {2}".format(user.username, skill, min_level))
                    if user in has_all:
                        has_all.remove(user)
        # remove intersection of has_all and has_some
        for user in has_all:
            if user in has_some:
                has_some.remove(user)
        # extract ProfileModels from the results and return them in a dictionary
        has_all = database_controller.get_profile_models(has_all)
        has_some = database_controller.get_profile_models(has_some)
        # sort the results by descending order of sum of queried skills
        has_all.sort(key=lambda p: database_controller.sum_relevant_skills(p, list(query.keys())), reverse=True)
        has_some.sort(key=lambda p: database_controller.sum_relevant_skills(p, list(query.keys())), reverse=True)
        return dict(has_all=has_all, has_some=has_some)

    @staticmethod
    def set_skills(username, skills):
        """ Set a number of skills to given level for given user.
            Args:
                username (str): username to set skill for.
                skills (dict(str=int)): The skill names and levels to add.
            Raises:
                NameError: if skill name is not in the database.
        """
        cdate = Date()
        user = database_controller.get_user(username)
        db.session.add(cdate)
        db.session.commit()
        for skill, level in skills.items():
            new_skill = database_controller.get_skill(skill)
            if not new_skill:
                raise NameError('The Skill {0} does not exist in the database!'.format(skill))
            database_controller.add_milestone(username, skill, cdate.date, "Level {0}".format(level), level)
            assoc = Association(level=level)
            assoc.skill_assoc = new_skill
            assoc.date_assoc = cdate
            assoc.users_assoc = user
        db.session.commit()

    @staticmethod
    def add_milestone(username, skill, date, comment, level):
        """ Adds a milestone to a user.
            Args:
                  username(`str`): name of the user
                  skill(`str`): name of the skill
                  date(`date`): date of milestone
                  comment(`str`): comment/title of milestone
                  level(`int`) level of user at time of milestone
        """
        user = database_controller.get_user(username)
        mskill = database_controller.get_skill(skill)
        mdate = Date(date=date)
        db.session.add(mdate)
        m = MilestoneAssociation(comment=comment, level=level)
        m.skill_milestone_assoc = mskill
        m.date_milestone_assoc = mdate
        m.users_milestone_assoc = user
        db.session.commit()

    @staticmethod
    def get_milestones(username, skillname):
        """Gets all milestones of a user as `MilestoneModel`s.
            Args:
                  username(`str`): name of the user
                  skillname(`str`): name of the skill
            Returns:
                [MilestoneModel]: all milestones of user for skill
        """
        muser = database_controller.get_user_id(username)
        mskillid = database_controller.get_skill_id(skillname)
        milestonelist = MilestoneAssociation.query.filter(MilestoneAssociation.milestone_users_id == muser,
                                                          MilestoneAssociation.milestone_skill_id == mskillid).all()
        milestone_models = []
        for milestone in milestonelist:
            date = database_controller.get_date_from_id(milestone.milestone_date_id).date
            level = milestone.level
            milestone_models.append(MilestoneModel(date, milestone.comment, level))
        return milestone_models

    @staticmethod
    def get_assocs(**kwargs):
        """Checks if user has skill at certain level or returns all skill levels.
           It is probably best to replace this method.
            Args:
                  **kwargs: type,level,users_id,skill_id
            Returns:
                 Association or [Association]
         """
        if kwargs["type"] == "first":
            assoc = Association.query.filter(Association.level >= kwargs["level"],
                                             Association.users_id == kwargs["users_id"],
                                             Association.skill_id == kwargs["skill_id"]).first()
        else:
            assoc = Association.query.filter_by(users_id=kwargs["users_id"]).all(
            )

        return assoc

    @staticmethod
    def get_all_users():
        """Returns all Users objects."""
        return Users.query.all()

    @staticmethod
    def get_subcategories(parent_skillname, username=None):
        """Takes a skillname and gets all subcategories. Only returns subcategories that user has, if given
            Args:
                  parent_skillname(`str`): find children of skill with given name
                  username(`str`): username as a filter for subcategories
            Returns:
                [str]: list of all child skills
        """
        parentid = database_controller.get_skill_id(parent_skillname)
        childlist = Hierarchy.query.filter_by(parent_skill_id=parentid).all()
        skill_names = []
        for hier in childlist:
            skill = database_controller.get_skill_from_id(hier.child_skill_id)
            if not username or \
                    (username and
                     Association.query.filter(
                         Association.users_id == database_controller.get_user_id(username),
                         Association.skill_id == database_controller.get_skill_id(skill.name)
                     ).first()):
                skill_names.append(skill.name)
        return skill_names

    @staticmethod
    def create_hierarchy(parent, child):
        """Creates a parent/child relation in the database.
            Args:
                  parent(`str`): skillname of parent skill.
                  child(`str`): skillname of child skill
        """
        x = Hierarchy()
        if parent:
            parentobject = database_controller.get_skill(parent)
            x.parent_skill_assoc = parentobject
        childobject = database_controller.get_skill(child)
        x.child_skill_assoc = childobject
        db.session.add(x)
        db.session.commit()

    @staticmethod
    def get_all_skill_names(username=None):
        """Gets names of all skills as two lists (root, non-root) disregarding hierarchy.
           Only checks for skills of the user, if username is given
            Args:
                  username(`str`, optional): name of the user, defaults to None"""
        skills = Skill.query.all()
        # the first list contains all skills, the second list contains all categories (if username)
        skill_list = [[], []]
        # get skill names of specific user
        if username:
            for skill in skills:
                # check if user has the skill
                if Association.query.filter_by(user_id=database_controller.get_user_id(username),
                                               skill_id=skill.id).first():
                    skill_list[0].append(skill.name)
        # get every skill
        else:
            for skill in skills:
                if skill.root:
                    skill_list[1].append(skill.name)
                else:
                    skill_list[0].append(skill.name)
        return skill_list

    @staticmethod
    def get_skill_id(skillname):
        """Gets id of skill, given name of the skill"""
        return Skill.query.filter_by(name=skillname).first().id

    @staticmethod
    def get_skill(skillname):
        """Gets Skill object, given name of the skill"""
        return Skill.query.filter_by(name=skillname).first()

    @staticmethod
    def get_user_id(username):
        """Gets id of user, given name of the user"""
        return Users.query.filter_by(username=username).first().id

    @staticmethod
    def get_user(username):
        """Gets Users object, given name of the user"""
        return Users.query.filter_by(username=username).first()

    @staticmethod
    def get_date_from_id(date_id):
        """Gets Date object, given id"""
        return Date.query.filter_by(id=date_id).first()

    @staticmethod
    def get_user_from_id(user_id):
        """Gets Users object, given id of the user"""
        return Users.query.filter_by(id=user_id).first()

    @staticmethod
    def get_skill_from_id(skill_id):
        """Gets Skill object, given id of the skill"""
        return Skill.query.filter_by(id=skill_id).first()

    @staticmethod
    def create_skill(skillname, category):
        """Create a skill in the database.
           Args:
                skillname (str): Name of the skill to add.
                category (str, None): Category that the skill belongs to. Root level category if None
        """
        new_skill = Skill(name=skillname)
        if not category:
            new_skill.root = True
        db.session.add(new_skill)
        db.session.commit()
        database_controller.create_hierarchy(category, skillname)

    @staticmethod
    def exists(username):
        """Check if a user exists in the database.
           Args:
               username (str): the username to check
            Returns:
                bool: True if user exists, false otherwise.
        """
        if Users.query.filter_by(username=username).first():
            return True
        return False

    @staticmethod
    def get_skills(username):
        """Get all skills of a user and return them as a `list` of `SkillModel`s
        Args:
            username (`str`): whose skills to return
        Returns:
            `[dict]`: each dict is created by SkillModel.jsonable()
        """
        root_categories = Skill.query.filter_by(root=True).all()
        skill_models = []
        for root in root_categories:
            skill_model = database_controller.build_subcategories(username, root.name)
            if skill_model:
                skill_models.append(skill_model)
        return skill_models

    @staticmethod
    def create_user(username, name):
        """Create a user in the database.
           Args:
               username (`str`): the username of the user to add - should be identical to the Active Directory username.
               name (`str`): The full name of the user to add.
        """
        db.session.add(Users(username=username, name=name))
        db.session.commit()

    @staticmethod
    def get_recent_level(user_id, skill_id):
        """Gets most recent level of user for given skill id.
            Args:
                  user_id(`int`): id of the Users object
                  skill_id(`int`):id of the Skill object
            Returns:
                  `int`: most recent level of user for skill"""
        return Association.query.filter(Association.skill_id == skill_id,
                                        Association.users_id == user_id).all()[-1].level

    @staticmethod
    def get_profile_models(users):
        """Takes a list of `Users` and converts them to `ProfileModel`s
            Args:
                users(`[Users]`): `list` of `Users` objects
            Returns:
                 `[ProfileModel]`: `ProfileModel` of each user.
         """
        profile_models = []
        # iterate over the users
        for user in users:
            # gets the SkillModels of the user
            skill_models = database_controller.get_skills(user.username)
            # creates ProfileModel from username and list of SkillModel
            profile_models.append(ProfileModel(user.username, user.username, skill_models))
        return profile_models

    @staticmethod
    def sum_relevant_skills(profile, skills):
        """ProfileModel,[str] -> int
        Takes a ProfileModel and a list of skills and checks for the sum of the levels of corresponding skills.
        Used as a key for ordering search results.
        """
        rel_sum = 0
        # look for every skill in list of skills
        for skill in skills:
            for skill_model in profile.skills:
                if skill_model.skill_name.lower() == skill.lower():
                    rel_sum += skill_model.level
        return rel_sum

    @staticmethod
    def build_subcategories(username, skillname):
        """str, str -> SkillModel
            Takes a username and skillname, recursively builds skill hierarchy for given user.
            Args:
                username (str): the username as a string.
                skillname (str): the skill name as a string.

            Returns:
                if skill is root:
                dict:Exactly one jsonable SkillModel that contains all Skills that are below it in the hierarchy.
                     The user needs to have to skill for it to show up.
                else:
                SkillModel

        """
        subcategories_string = database_controller.get_subcategories(skillname, username=username)
        subcategories_model = []
        # case 1: category is a root element
        if Skill.query.filter_by(name=skillname).first().root:
            print(subcategories_string, file=sys.stderr)
            for category in subcategories_string:
                print(subcategories_string, file=sys.stderr)
                subcategories_model.append(database_controller.build_subcategories(username, category))
            if subcategories_model:
                return SkillModel(skillname,
                                  subcategories=subcategories_model,
                                  milestones=database_controller.get_milestones(username, skillname),
                                  root=True
                                  )
            return
        # case 2: category is a node
        if subcategories_string:
            for category in subcategories_string:
                subcategories_model.append(database_controller.build_subcategories(username, category))

                level = database_controller.get_recent_level(database_controller.get_user_id(username),
                                                             database_controller.get_skill_id(skillname)
                                                             )
            return SkillModel(skillname,
                              level=level,
                              subcategories=subcategories_model,
                              milestones=database_controller.get_milestones(username, skillname)
                              )
        # case 3: category is a leaf
        print(skillname, file=sys.stderr)
        level = database_controller.get_recent_level(database_controller.get_user_id(username),
                                                     database_controller.get_skill_id(skillname)
                                                     )
        return SkillModel(skillname,
                          level=level,
                          milestones=database_controller.get_milestones(username, skillname)
                          )

    @staticmethod
    def add_guidelines(skillname, guidelines):
        """Adds guideline for each level of given skill.
            Args:
                  skillname(`str`): the name of the skill
                  guidelines(`dict(int=level)`: each level gets assigned a guideline text
        """
        skill_id = database_controller.get_skill_id(skillname)
        for level, text in guidelines.items():
            # TODO: create Guideline association or similar
            pass
        db.session.commit()

    @staticmethod
    def remove_skill_from_database(skillname):
        """Removes a skill and all its subcategories from the database.
            Args:
                  skillname(`str`): name of the skill
        """
        to_remove = database_controller.get_subcategories(skillname)
        to_remove.append(skillname)
        subcategories_to_check = to_remove.copy()
        while subcategories_to_check:
            new_subcategories = database_controller.get_subcategories(subcategories_to_check.pop())
            to_remove.extend(new_subcategories)
            subcategories_to_check.extend(new_subcategories)
        for skillname in to_remove:
            sid = database_controller.get_skill_id(skillname)
            Hierarchy.query.filter_by(parent_skill_id=sid).delete()
            MilestoneAssociation.query.filter_by(milestone_skill_id=sid).delete()
            Association.query.filter_by(skill_id=sid).delete()
            # duplicate names WILL get removed here
            Skill.query.filter_by(name=skillname).delete()
        db.session.commit()

    @staticmethod
    def remove_skill(username, skillname):
        """Removes skill and all subcategories of it for a user
            Args:
                  username(`str`): name of the user
                  skillname(`str`): name of the skill
        """
        to_remove = database_controller.get_subcategories(skillname, username=username)
        subcategories_to_check = to_remove.copy()
        uid = database_controller.get_user_id(username)
        while subcategories_to_check:
            new_subcategories = database_controller.get_subcategories(subcategories_to_check.pop())
            to_remove.extend(new_subcategories)
            subcategories_to_check.extend(new_subcategories)
        for skillname in to_remove:
            sid = database_controller.get_skill_id(skillname)
            MilestoneAssociation.query.filter_by(milestone_skill_id=sid, milestone_users_id=uid)
            Association.query.filter_by(skill_id=sid, users_id=uid)
        db.session.commit()
        
    @staticmethod
    def remove_milestone(username, skillname, level, date):
        """Removes a milestone from user.
            Args:
                  username(`str`): name of the user
                  skillname(`str`): name of the skill
                  level(`int`): level of skill at milestone date
                  date(`date`): date of milestone
        """
        pass


database_controller = DatabaseController()
