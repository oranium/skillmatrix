import React from 'react';
import ProfileExpansionPanel from 'components/profile/skills/ProfileExpansionPanel';

export default (props) => {
  const { categories } = props;
  // console.log(categories);
  let index = 0;
  const panels = categories.map(skill => (
    <div>
      <ProfileExpansionPanel
        skill={skill}
        key={(index += 1)}
        levelChange={props.levelChange}
        isEditable={props.isEditable}
      />
    </div>
  ));
  return panels;
};
