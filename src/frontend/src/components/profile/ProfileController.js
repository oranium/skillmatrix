// react
import React, { Component } from "react";

// redux
import store from 'Store';
import { changeView } from 'actions';

// react components
import TabContainer from "components/profile/TabContainer";
import SkillProfileList from 'components/profile/skills/SkillProfileList';
import SkillStatisticsGrid from 'components/profile/statistics/SkillStatisticsGrid';

// material-ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class ProfileController extends Component {
  getOwnerArticle(){
    const { state } = this.props;
    const { isEditable, username } = state.profile;

    if (isEditable) {
      return 'My ';
    }
    
    return  username + "'s ";
  }

  handleChange = (evt, value) => {
    store.dispatch(changeView(value));
  };

  render() {
    const { state, classes } = this.props;
    // person: array index in profiles
    const { person, profiles, view} = state.profile;
    const categories = profiles[person].categories;
    const ownerArticle = this.getOwnerArticle();
    
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={view} onChange={this.handleChange} centered fullWidth>
            <Tab label={ownerArticle + 'Profile'} />
            <Tab label={ownerArticle + 'Statistics'} />
          </Tabs>
        </AppBar>
        {view === 0 && (
          <TabContainer>
            <SkillProfileList categories={categories} />
          </TabContainer>
        )}
        {view === 1 && (
          <TabContainer>
            <SkillStatisticsGrid categories={categories} />
          </TabContainer>
        )}
      </div>
    );
  }
}

ProfileController.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileController);
