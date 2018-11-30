import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

import SimpleCard from "./SimpleCard";
import ProfileExpansionPanel from "./ProfileExpansionPanel";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
  render() {
    const { value } = this.props;
    // this.props.state.categories["Programming"]["Python"][
    //   "subcategories"
    // ]["PythonFlask"]["milestones"]
    //Loop over # of skills given from Profile and render # of cards --> in SimpleCard is also the Chart rendered
    var index = 0;
    const skillItems = Object.keys(this.props.state.categories).map(category =>
      Object.keys(this.props.state.categories[category]).map(
        skill => (
          (index = 0),
          Object.keys(
            this.props.state.categories[category][skill]["subcategories"]
          ).map((
            subcategory //render subcategories
          ) => {
            index = index + 1;
            return index < 2 ? (
              <div>
                {" "}
                <SimpleCard
                  skill={skill}
                  data={
                    this.props.state.categories[category][skill]["milestones"]
                  } //skill = Java, Python ... = key
                // data -> data for every milestone
                />{" "}
                <SimpleCard
                  skill={subcategory}
                  data={
                    this.props.state.categories[category][skill][
                    "subcategories"
                    ][subcategory]["milestones"]
                  } //skill = Java, Python ... = key
                // data -> data for every milestone
                />
              </div>
            ) : (
                <div>
                  {" "}
                  <SimpleCard
                    skill={subcategory}
                    data={
                      this.props.state.categories[category][skill][
                      "subcategories"
                      ][subcategory]["milestones"]
                    } //skill = Java, Python ... = key
                  // data -> data for every milestone
                  />{" "}
                </div>
              );
          })
        )
      )
    );
    const panels = Object.keys(this.props.state.categories).map(category => (
      <div>
        <ProfileExpansionPanel skill={category}> </ProfileExpansionPanel>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
