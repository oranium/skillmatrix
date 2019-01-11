import React, { Component } from 'react';

// material-ui
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';

// redux
import store from 'Store';
import { changeGuideline } from 'actions';

class GuidelineInputCard extends Component {
  handleGuidelineChange = (id, event) => {
    store.dispatch(changeGuideline(id, event.target.value));
  };

  getGuidelineListItems = () => {
    const state = store.getState();
    const { guideline } = state.newSkillToDBDialog;
    const defaultGuideline = {
      1: 'Insufficient',
      2: 'Sufficient/Below Average',
      3: 'Satisfactory / Average',
      4: 'Good',
      5: 'Excellent',
    };
    return Object.keys(guideline).map(level => {
      const guidelineValue = guideline[level];
      const valueProp = {};
      // defaultGuidelines are not displayed as value, but as placeholder
      if (guidelineValue !== defaultGuideline[level]) {
        valueProp.value = guidelineValue;
      }
      return (
        <ListItem key={level}>
          <TextField
            label={'Level ' + level + ': '}
            id={'level' + level}
            placeholder={defaultGuideline[level]}
            onChange={event => this.handleGuidelineChange(level, event)}
            {...valueProp}
            fullWidth
          />
        </ListItem>
      );
    });
  };

  render() {
    return (
      <Card>
        <List
          component="nav"
          subheader={
            <ListSubheader component="div">Add guideline to the skill (Optional)</ListSubheader>
          }
        >
          {this.getGuidelineListItems()}
        </List>
      </Card>
    );
  }
}

export default GuidelineInputCard;
