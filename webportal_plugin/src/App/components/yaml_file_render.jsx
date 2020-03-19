import React, { useContext } from "react";
import { FontClassNames } from "@uifabric/styling";
import Context from "App/context";
import Card from "./card";
import yaml from "js-yaml";

const YamlFileRender = props => {
  const { yamlConfig } = props;
  return (
    <Card
      style={{
        whiteSpace: "pre-wrap",
        paddingTop: 10,
        paddingLeft: 10,
        backgroundColor: "#f8f8f8"
      }}
      className={FontClassNames.mediumPlus}
    >
      <div>{yaml.safeDump(yamlConfig)}</div>
    </Card>
  );
};

export default YamlFileRender;
