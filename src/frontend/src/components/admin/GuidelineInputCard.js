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
    return Object.keys(guideline).map(level => (
      <ListItem key={level}>
        <TextField
          label={'Level ' + level + ': '}
          id={'level' + level}
          placeholder={guideline[level]}
          onChange={event => this.handleGuidelineChange(level, event)}
          fullWidth
        />
      </ListItem>
    ));
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
