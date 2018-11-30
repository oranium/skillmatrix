import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import SimpleCard from './SimpleCard';
import ProfileExpansionPanel from './ProfileExpansionPanel';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.props;
    //Loop over # of skills given from Profile and render # of cards --> in SimpleCard ist also the Chart rendered
    const skillItems = Object.keys(this.props.state.skills).map(key => (
      <div>
        {' '}
        <SimpleCard skill={key} data={this.props.state.skills[key]['milestones']} />{' '}
      </div>
    ));

    const panels = Object.keys(this.props.state.skills).map(key => (
      <div>
        <ProfileExpansionPanel skill={key}> </ProfileExpansionPanel>
      </div>
    ));
    const { classes, onChange, view } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={view} onChange={onChange} centered fullWidth>
            <Tab label="Profil" />
            <Tab label="Statistics" />
          </Tabs>
        </AppBar>

        {view === 0 && <TabContainer>{panels}</TabContainer>}
        {view === 1 && <TabContainer>{skillItems}</TabContainer>}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
