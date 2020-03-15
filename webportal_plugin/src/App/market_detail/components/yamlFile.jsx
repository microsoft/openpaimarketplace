import React, { useContext } from "react";
import { FontClassNames } from "@uifabric/styling";
import Context from "../context";
import Card from "./card";
import yaml from "js-yaml";

const YamlFile = () => {
  const { marketItem } = useContext(Context);
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
      <div>{yaml.safeDump(marketItem.jobConfig)}</div>
    </Card>
  );
};

export default YamlFile;
