// react
import React from 'react';

import Grid from '@material-ui/core/Grid';
import SimpleCard from 'components/profile/statistics/SimpleCard';

const SkillStatisticsPage = (props) => {
  const { categories } = props;
  // this.props.state.categories["Programming"]["Python"][
  //   "subcategories"
  // ]["PythonFlask"]["milestones"]
  // Loop over # of skills given from Profile and render # of cards --> in SimpleCard is also the Chart rendered
  let index = 0;
  const skillItems = Object.keys(categories).map(category => Object.keys(categories[category]).map(
    skill => (
      (index = 0),
      Object.keys(categories[category][skill].subcategories).map((
        subcategory, // render subcategories
      ) => {
        index += 1;
        return index === 1 ? (
          <Grid key={index} item>
            <SimpleCard
              skill={skill}
              data={categories[category][skill].milestones}
            />
            <SimpleCard
              skill={subcategory}
              data={
                  categories[category][skill].subcategories[subcategory].milestones
                }
            />
          </Grid>
        ) : (
          <Grid key={index} item>
            <SimpleCard
              skill={subcategory}
              data={
                  categories[category][skill].subcategories[subcategory].milestones
                }
            />
            {' '}
          </Grid>
        );
      })
    ),
  ));

  return (
    <Grid container justify="center" spacing={16}>
      {skillItems}
    </Grid>
  );
};

export default SkillStatisticsPage;
