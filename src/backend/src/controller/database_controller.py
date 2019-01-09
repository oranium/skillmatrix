import sys
from controller.database import db
from model.profile_model import ProfileModel
from model.skill_model import SkillModel
from model.milestone_model import MilestoneModel
from model.database_model import Association, MilestoneAssociation, Skill, Date, Users, Hierarchy, Guidelines


class DatabaseController:
    """Class to handle everything about table-manipulation"""

    @staticmethod
    def search(query):
        """Search through all users with a query from the backend controller.
        Finds all users that fulfill all restrictions, and all users that fulfill some but not all.
            Args:
                query(`dict(str=int)`): search terms in form skillpath:min_level
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
            for skillpath, min_level in query.items():
                # get the skill_id from the database
                skill_id = database_controller.get_skill(skillpath).id
                # get the association of the user with current skill and according minimum level
                skill_assoc = database_controller.get_assocs(users_id=user.id,
                                                             skill_id=skill_id,
                                                             level=min_level,
                                                             type="first")
                # skill_assoc will be None if the user does not have the skill on the desired level or higher
                if skill_assoc is not None:
                    print("{0} has {1} at least on level {2}".format(user.username, skillpath, min_level))
                    # adds user to has_some, in case he does not have other skills
                    if user not in has_some:
                        has_some.append(user)
                # if the user does not have the current skill at the required level, he gets removed from has_all
                else:
                    print("{0} has {1} not on level {2}".format(user.username, skillpath, min_level))
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
    def set_skills(username, skillpaths):
        """ Set a number of skills to given level for given user.
            Args:
                username (str): username to set skill for.
                skillpaths (dict(str=int)): The full skillpaths and levels to add.
            Raises:
                NameError: if skill name is not in the database.
        """
        cdate = Date()
        user = database_controller.get_user(username)
        db.session.add(cdate)
        db.session.commit()
        for skillpath, level in skillpaths.items():
            new_skill = database_controller.get_skill(skillpath)
            if not new_skill:
                raise NameError('The Skill {0} does not exist in the database!'.format(skillpath))
            database_controller.add_milestone(username, skillpath, cdate.date, "Level {0}".format(level), level)
            assoc = Association(level=level)
            assoc.skill_assoc = new_skill
            assoc.date_assoc = cdate
            assoc.users_assoc = user
        db.session.commit()

    @staticmethod
    def add_milestone(username, skillpath, date, comment, level):
        """ Adds a milestone to a user.
            Args:
                  username(`str`): name of the user
                  skillpath(`str`): full path of the skill
                  date(`date`): date of milestone
                  comment(`str`): comment/title of milestone
                  level(`int`) level of user at time of milestone
        """
        user = database_controller.get_user(username)
        mskill = database_controller.get_skill(skillpath)
        mdate = Date(date=date)
        db.session.add(mdate)
        m = MilestoneAssociation(comment=comment, level=level)
        m.skill_milestone_assoc = mskill
        m.date_milestone_assoc = mdate
        m.users_milestone_assoc = user
        db.session.commit()

    @staticmethod
    def get_milestones(username, skillpath):
        """Gets all milestones of a user as `MilestoneModel`s.
            Args:
                  username(`str`): name of the user
                  skillpath(`str`): full path of the skill
            Returns:
                [MilestoneModel]: all milestones of user for skill
        """
        muser = database_controller.get_user(username).id
        mskillid = database_controller.get_skill(skillpath).id
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
    def get_subcategories(parent_skillpath, username=None):
        """Takes a skillpath and gets all subcategories. Only returns subcategories that user has, if given
            Args:
                  parent_skillpath(`str`): find children of skill with given full path
                  username(`str`): username as a filter for subcategories
            Returns:
                [str]: list of all child skills
        """
        parentid = database_controller.get_skill(parent_skillpath).id
        childlist = Hierarchy.query.filter_by(parent_skill_id=parentid).all()
        skill_paths = []
        for hier in childlist:
            skill = database_controller.get_skill_from_id(hier.child_skill_id)
            if not username or \
                    (username and
                     Association.query.filter(
                         Association.users_id == database_controller.get_user(username).id,
                         Association.skill_id == database_controller.get_skill(skill.name).id
                     ).first()):
                skill_paths.append(skill.path)
        return skill_paths

    @staticmethod
    def create_hierarchy(parent_path, child_path):
        """Creates a parent/child relation in the database.
            Args:
                  parent_path(`str`): full path of parent skill.
                  child_path(`str`): full path of child skill
        """
        new_hierarchy = Hierarchy()
        if parent_path:
            parent_skill = database_controller.get_skill(parent_path)
            new_hierarchy.parent_skill_assoc = parent_skill
        child_skill = database_controller.get_skill(child_path)
        new_hierarchy.child_skill_assoc = child_skill
        db.session.add(new_hierarchy)
        db.session.commit()

    @staticmethod
    def get_paths_with_guidelines(username=None):
        """Gets names of all skills as two lists (root, non-root) disregarding hierarchy.
           Only checks for skills of the user, if username is given
            Args:
                  username(`str`, optional): name of the user, defaults to None"""
        skills = Skill.query.all()
        # the first list contains all skills, the second list contains all categories (if username)
        skill_list = []
        # get skill names of specific user without guidelines
        if username:
            for skill in skills:
                # check if user has the skill
                if Association.query.filter_by(users_id=database_controller.get_user(username).id,
                                               skill_id=skill.id).first():
                    skill_list.append(skill.path)
        # get every skill with guidelines
        else:
            skill_list.append({})
            skill_list.append([])
            for skill in skills:
                if skill.root:
                    skill_list[1].append(skill.path)
                else:
                    skill_list[0][skill.path] = database_controller.get_guideline_dict(skill.path)
        return skill_list

    @staticmethod
    def get_skill(skillpath):
        """Gets Skill object, given name of the skill"""
        return Skill.query.filter_by(path=skillpath).first()

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
    def create_skill(skillname, skillpath, category):
        """Create a skill in the database.
           Args:
                skillname str: Name of the skill to add.
                skillpath str: Full path of the skill to add.
                category str: Category that the skill belongs to.
        """
        new_skill = Skill(name=skillname, path=skillpath)
        if not category:
            new_skill.root = True
        db.session.add(new_skill)
        db.session.commit()
        database_controller.create_hierarchy(category, skillpath)

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
            skill_model = database_controller.build_subcategories(username, root.path)
            if skill_model:
                skill_models.append(skill_model)
        return skill_models

    @staticmethod
    def get_guideline_dict(skillpath):
        """Returns a dict of all guidelines for a skill
           Args:
                 skillpath `str`: full path of skill
           Returns:
                `dict(str=dict(int=str))`: """
        guidelines = database_controller.get_guidelines(database_controller.get_skill(skillpath).id)
        return {1: guidelines[0],
                2: guidelines[1],
                3: guidelines[2],
                4: guidelines[3],
                5: guidelines[4]
                }

    @staticmethod
    def get_guidelines(skill_id):
        """Give back all 5 different guideline-information for one skill
                Args:
                    skill_id (`str`): id of a certain skill
                Returns:
                    `[str]`: a list with 5 elements where the first element is the guideline-information
                            for the first level
                            Example: ['gar nicht gut', 'neue information', 'mittel', 'schon gut', 'sehr gut']
                """
        guidelines = []
        level = 1
        while level < 6:
            guideline = Guidelines.query.filter(skill_id=skill_id, level=level).first()
            guidelines.append(guideline.information)
            level = level + 1
        # print(guidelines)
        return guidelines

    @staticmethod
    def change_guidelines(skill_id, level, new_guideline):
        """Checks if there is already certain guideline, if the guideline exists, it gets deleted and rebuild with new
            information. Else the function just adds a new guideline.
                Args:
                    skill_id (`int`): id of a certain skill, where the information has to be changed
                    level (`int`): guideline-level, where the information has to be changed
                    new_guideline (`str`): new information for the certain guideline
                """
        if Guidelines.query.filter_by(skill_id=skill_id, level=level).all():
            prev_guideline = Guidelines.query.filter_by(skill_id=skill_id, level=level).first()
            db.session.delete(prev_guideline)
            db.session.commit()
        new_guideline = Guidelines(skill_id=skill_id, level=level, information=new_guideline)
        db.session.add(new_guideline)
        db.session.commit()

    @staticmethod
    def create_guidelines(skillname, guidelines):
        """Create all 5 guidelines for one skill in the database.
                   Args:
                       skillname (`int`): the id of the skill to ad to the guideline table.
                       guidelines `[str]`: a list of strings that should look like this:
                                                    [text for level 1, text for level 2,...,text for level 5]
                """
        level = 1
        if not len(guidelines) == 5:
            raise ValueError("Guidelines does not have 5 elements.")
        skill_id = database_controller.get_skill(skillname).id
        for guideline in guidelines:
            new_guideline = Guidelines(skill_id=skill_id, level=level, information=guideline)
            db.session.add(new_guideline)
            db.session.commit()
            level = level + 1

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
    def sum_relevant_skills(profile, skill_paths):
        """Takes a ProfileModel and a list of skillpaths and checks for the sum of the levels of corresponding skills.
           Used as a key for ordering search results.
            Args:
                profile `ProfileModel`: get sum of given ProfileModel
                skill_paths `[str]`: full paths of every desired skill
            Returns:
                int: sum of levels of relevant skills for given user

        """
        rel_sum = 0
        # look for every skill in list of skill paths
        for skill_path in skill_paths:
            for skill_model in profile.skills:
                if skill_model.skill_path.lower() == skill_path.lower():
                    rel_sum += skill_model.level
        return rel_sum

    @staticmethod
    def build_subcategories(username, skillpath):
        """str, str -> SkillModel
            Takes a username and skillname, recursively builds skill hierarchy for given user.
            Args:
                username (str): the username as a string.
                skillpath (str): full skill path as a string.

            Returns:
                if skill is root:
                dict:Exactly one jsonable SkillModel that contains all Skills that are below it in the hierarchy.
                     The user needs to have to skill for it to show up.
                else:
                SkillModel

        """
        subcategories_string = database_controller.get_subcategories(skillpath, username=username)
        subcategories_model = []
        # case 1: category (current skill) is a root element
        skill = Skill.query.filter_by(path=skillpath).first()
        if skill.root:
            print(subcategories_string, file=sys.stderr)
            for category in subcategories_string:
                print(subcategories_string, file=sys.stderr)
                subcategories_model.append(database_controller.build_subcategories(username, category))
            if subcategories_model:
                return SkillModel(skill.name,
                                  skillpath,
                                  subcategories=subcategories_model,
                                  milestones=database_controller.get_milestones(username, skillpath),
                                  root=True
                                  )
            return
        # case 2: category (current skill) is a node
        if subcategories_string:
            for category in subcategories_string:
                subcategories_model.append(database_controller.build_subcategories(username, category))
                level = database_controller.get_recent_level(database_controller.get_user(username).id,
                                                             database_controller.get_skill(skillpath).id
                                                             )
            return SkillModel(skill.name,
                              skillpath,
                              level=level,
                              subcategories=subcategories_model,
                              milestones=database_controller.get_milestones(username, skillpath)
                              )
        # case 3: category (current skill) is a leaf
        print(skillpath, file=sys.stderr)
        level = database_controller.get_recent_level(database_controller.get_user(username).id,
                                                     database_controller.get_skill(skillpath).id
                                                     )
        return SkillModel(skill.name,
                          skillpath,
                          level=level,
                          milestones=database_controller.get_milestones(username, skillpath)
                          )

    @staticmethod
    def remove_skill_from_database(skillpath):
        """Removes a skill and all its subcategories from the database.
            Args:
                  skillpath(`str`): full path of the skill
        """
        to_remove = database_controller.get_subcategories(skillpath)
        to_remove.append(skillpath)
        subcategories_to_check = to_remove.copy()
        while subcategories_to_check:
            new_subcategories = database_controller.get_subcategories(subcategories_to_check.pop())
            to_remove.extend(new_subcategories)
            subcategories_to_check.extend(new_subcategories)
        for sub_path in to_remove:
            sid = database_controller.get_skill(sub_path).id
            Hierarchy.query.filter_by(parent_skill_id=sid).delete()
            MilestoneAssociation.query.filter_by(milestone_skill_id=sid).delete()
            Association.query.filter_by(skill_id=sid).delete()
            # duplicate names WILL get removed here
            Skill.query.filter_by(path=skillpath).delete()
        db.session.commit()

    @staticmethod
    def remove_skill(username, skillpath):
        """Removes skill and all subcategories of it for a user
            Args:
                  username(`str`): name of the user
                  skillpath(`str`): full path of the skill
        """
        to_remove = database_controller.get_subcategories(skillpath, username=username)
        subcategories_to_check = to_remove.copy()
        uid = database_controller.get_user(username).id
        while subcategories_to_check:
            new_subcategories = database_controller.get_subcategories(subcategories_to_check.pop())
            to_remove.extend(new_subcategories)
            subcategories_to_check.extend(new_subcategories)
        for sub_path in to_remove:
            sid = database_controller.get_skill(sub_path).id
            MilestoneAssociation.query.filter_by(milestone_skill_id=sid, milestone_users_id=uid)
            Association.query.filter_by(skill_id=sid, users_id=uid)
        db.session.commit()
        
    @staticmethod
    def remove_milestone(username, skillpath, level, date):
        """Removes a milestone from user.
            Args:
                  username(`str`): name of the user
                  skillpath(`str`): full path of the skill
                  level(`int`): level of skill at milestone date
                  date(`str`): date of milestone in format "YYYY-MM-DD"
        """
        skill = database_controller.get_skill(skillpath).id
        user = database_controller.get_user(username)
        MilestoneAssociation.query.filter_by(milestone_skill_id=skill.id,
                                             milestone_users_id=user.id,
                                             level=level,
                                             date=date).delete()
        db.session.commit()


database_controller = DatabaseController()
