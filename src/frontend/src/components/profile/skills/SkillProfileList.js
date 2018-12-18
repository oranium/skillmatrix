import React from 'react';
import ProfileExpansionPanel from 'components/profile/skills/ProfileExpansionPanel';

function includeCategory(array, category, skill) {
  array.map((index) => {
    if (index.skill === category) {
      index.subcategories.join(skill);
      return true;
    }
    return false;
  });
}
export default (props) => {
  const { categories } = props;

  let index = 0;
  // const counter = 0;
  // const panel = [{skill:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          null, subcategories: []}];
  // categories.map((skill) => {
  //   if (skill.category === null) {
  //     panel.push({ skill: skill.skillname });
  //   } else if (includeCategory(panel, skill.category, skill.skillname)) {
  //     panel[panel.indexOf(skill.category)][skill.category] = [skill.skillname];
  //   } else {
  //     console.log(panel);
  //   }
  // }, console.log(panel));

  // return <div>31er</div>;

  const panels = categories.map(skill => (
    <ProfileExpansionPanel
      skill={skill}
      key={(index += 1)}
      levelChange={props.levelChange}
      isEditable={props.isEditable}
    />
  ));

  return panels;
};
