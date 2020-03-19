import { isNil } from "lodash";
import { FontClassNames } from "@uifabric/styling";
import { Stack } from "office-ui-fabric-react";
import {
  DetailsList,
  SelectionMode,
  DetailsListLayoutMode
} from "office-ui-fabric-react/lib/DetailsList";
import React from "react";

import Card from "./card";

const TaskRoles = props => {
  const { marketItem } = props;

  function getTaskRoles() {
    const items = [];
    const taskRoles = marketItem.jobConfig.taskRoles;
    for (const taskRole in taskRoles) {
      let item = {};
      item.name = taskRole;
      item.instances = taskRoles[taskRole].instances;
      item.dockerImage = taskRoles[taskRole].dockerImage;
      item.resourcePerInstance = taskRoles[taskRole].resourcePerInstance;
      item.commands = taskRoles[taskRole].commands;
      items.push(item);
    }
    return items;
  }

  function getColumns() {
    const columns = [
      {
        key: "number",
        name: "No.",
        headerClassName: FontClassNames.medium,
        minWidth: 50,
        maxWidth: 50,
        isResizable: true,
        onRender: (item, idx) => {
          return (
            !isNil(idx) && (
              <div className={FontClassNames.mediumPlus}>{idx}</div>
            )
          );
        }
      },
      {
        key: "name",
        name: "name",
        fieldName: "name",
        className: FontClassNames.mediumPlus,
        headerClassName: FontClassNames.mediumPlus,
        minWidth: 50,
        maxWidth: 70,
        isResizable: true
      },
      {
        key: "instances",
        name: "instances",
        fieldName: "instances",
        className: FontClassNames.mediumPlus,
        headerClassName: FontClassNames.mediumPlus,
        minWidth: 50,
        maxWidth: 70,
        isResizable: true
      },
      {
        key: "dockerImage",
        name: "dockerImage",
        fieldName: "dockerImage",
        className: FontClassNames.mediumPlus,
        headerClassName: FontClassNames.mediumPlus,
        minWidth: 100,
        maxWidth: 120,
        isResizable: true
      },
      {
        key: "resourcePerInstance",
        name: "resourcePerInstance",
        fieldName: "resourcePerInstance",
        className: FontClassNames.mediumPlus,
        headerClassName: FontClassNames.mediumPlus,
        minWidth: 100,
        maxWidth: 150,
        isResizable: true,

        onRender: item => {
          const resources = item.resourcePerInstance;
          const stacks = [];
          for (const key in resources) {
            stacks.push(
              <Stack key={key}>
                {key}: {resources[key]}
              </Stack>
            );
          }
          return <Stack>{stacks}</Stack>;
        }
      }
    ];

    return columns;
  }

  return (
    <Card style={{ paddingTop: 15, paddingLeft: 10 }}>
      <DetailsList
        columns={getColumns()}
        disableSelectionZone
        items={getTaskRoles()}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
      />
    </Card>
  );
};

export default TaskRoles;
