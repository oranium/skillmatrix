import React from 'react';
import ProfileExpansionPanel from 'components/profile/skills/ProfileExpansionPanel';

export default (props) => {
  const { categories } = props;
  // console.log(categories);
  const panels = categories.map(skill => (
    <div>
      <ProfileExpansionPanel skill={skill} levelChange={props.levelChange} />
    </div>
  ));
  return panels;
};
