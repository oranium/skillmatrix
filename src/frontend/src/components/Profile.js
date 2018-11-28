import React, { Component } from "react";
import TabContainer from "./TabContainer";

// die datenstruktur soll so im state gespeichert werden skills: Oberkategorien : Unterkategorien und jeweils actLevel und milestones
const exState = {
  username: "Valdemar Forsberg",
  skills: {
    Python: {
      actLevel: 5,
      milestones: [
        {
          x: "2015-05-01",
          y: 0
        },
        {
          x: "2016-08-03",
          y: 1
        },
        {
          x: "2019-07-06",
          y: 4
        },
        {
          x: "2021-11-23",
          y: 5
        }
      ],
      subcategorys: {
        PythonFlask: {
          actLevel: 5,
          milestones: [
            {
              x: "2015-05-01",
              y: 0
            },
            {
              x: "2016-08-03",
              y: 1
            },
            {
              x: "2019-07-06",
              y: 4
            },
            {
              x: "2021-11-23",
              y: 5
            }
          ]
        }
      }
    },
    Java: {
      actLevel: 5,
      milestones: [
        {
          x: "2016-04-18",
          y: 0
        },
        {
          x: "2017-08-29",
          y: 1
        },
        {
          x: "2019-11-19",
          y: 4
        },
        {
          x: "2020-02-03",
          y: 5
        }
      ]
    }
  }
};

export default class Profile extends Component {
  render() {
    return <TabContainer state={exState} />;
  }
}
