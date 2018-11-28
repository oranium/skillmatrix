import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chart from "./Chart";

const styles = {
  card: {
    minWidth: 150,
    maxWidth: 350
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function openChart(props) {
  return (
    <Chart
      height={400}
      width={800}
      display={false}
      skill={props.skill}
      data={props.data}
    />
  );
}

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Button onClick={props => openChart(props)}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            <Chart
              height={200}
              width={250}
              display={false}
              skill={props.skill}
              data={props.data}
            />
          </Typography>
        </CardContent>
        <CardActions />
      </Card>
    </Button>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
