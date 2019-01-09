// react
import React from 'react';

// components
import SingleSelect from 'components/common/SingleSelect';

// redux
import Store from 'Store';

const SingleSkillSelect = (props) => {
  const { placeholder } = props;
  const { allSkills, allCategories } = Store.getState();
  const skillList = [...allCategories, ...Object.keys(allSkills)];
  return <SingleSelect placeholder={placeholder} allSkills={skillList} fullWidth />;
};

export default SingleSkillSelect;
