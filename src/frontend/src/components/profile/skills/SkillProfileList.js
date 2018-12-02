import React from 'react';
import ProfileExpansionPanel from 'components/profile/skills/ProfileExpansionPanel';

export default (props) => {
  const { categories } = props;
  const panels = Object.keys(categories).map(category => (
    <div>
      <ProfileExpansionPanel skill={category} />
    </div>
  ));
  return panels;
};
