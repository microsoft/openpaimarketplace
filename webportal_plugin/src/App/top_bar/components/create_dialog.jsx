import PropTypes from "prop-types";
import React, { useState, useCallback, useContext, useEffect } from "react";
import {
  DefaultButton,
  PrimaryButton,
  IconButton,
  Dialog,
  DialogFooter,
  DialogType,
  TextField,
  Stack,
  FontSizes,
  FontWeights,
  Text
} from "office-ui-fabric-react";
import { getTheme } from "@uifabric/styling";
import { isNil } from "lodash";
import yaml from "js-yaml";

import { MarketItem } from "App/models/market_item";
import { TagBar } from "App/components/tag_bar";
import ImportYamlFile from "./import_yaml_file";
import Context from "App/context";
import { createMarketItem } from "App/utils/marketplace_api";
import YamlFileRender from "App/components/yaml_file_render";

export default function CreateItemDialog(props) {
  const { setHideCreateDialog, setItemCreated, initJobConfig } = props;
  const { user } = useContext(Context);
  const { spacing } = getTheme();

  const [jobConfigExpanded, setJobConfigExpanded] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("custom");
  const [tags, setTags] = useState([]);
  const [introduction, setIntroduction] = useState("");
  const [description, setDescription] = useState("");
  const [jobConfig, setJobConfig] = useState(initJobConfig);

  const checkRequired = () => {
    if (name === "") {
      alert("name required");
      return false;
    }
    if (introduction === "") {
      alert("introduction required");
      return false;
    }
    if (description === "") {
      alert("description required");
      return false;
    }
    if (isNil(jobConfig)) {
      alert("job config required");
      return false;
    }

    return true;
  };

  const onConfirm = async () => {
    if (!checkRequired()) {
      return;
    }

    const marketItem = new MarketItem({
      name: name,
      author: user,
      category: category,
      tags: tags,
      introduction: introduction,
      description: description,
      jobConfig: jobConfig
    });

    await createMarketItem(marketItem);
    setItemCreated(true);
    setHideCreateDialog(true);
  };

  const closeDialog = useCallback(() => {
    setHideCreateDialog(true);
  });

  return (
    <div>
      <Dialog
        hidden={false}
        onDismiss={closeDialog}
        minWidth={800}
        dialogContentProps={{
          type: DialogType.normal,
          showCloseButton: false,
          title: (
            <Text
              styles={{
                root: {
                  fontSize: FontSizes.large,
                  fontWeight: FontWeights.semibold,
                  paddingBottom: spacing.m
                }
              }}
            >
              Create Market Item
            </Text>
          )
        }}
        modalProps={{
          isBlocking: true
        }}
      >
        <Stack gap="m">
          <TextField
            label="Name"
            value={name}
            onChange={e => {
              setName(e.target.value);
            }}
            required
          />
          <Stack gap="s1">
            <span>Tags</span>
            <TagBar tags={tags} setTags={setTags} />
          </Stack>
          <TextField
            label="Introduction"
            value={introduction}
            onChange={e => {
              setIntroduction(e.target.value);
            }}
            required
          />
          <TextField label="Author" value={user} disabled />
          <TextField
            label="Description"
            value={description}
            multiline
            rows={20}
            onChange={e => {
              setDescription(e.target.value);
            }}
            required
          />
          <Stack gap="s1">
            {isNil(initJobConfig) && (
              <ImportYamlFile setJobConfig={setJobConfig} />
            )}
            <Stack
              verticalAlign="center"
              horizontal
              gap="s1"
              styles={{ root: { paddingLeft: spacing.s1 } }}
            >
              <div>yaml config</div>
              <div>
                {jobConfigExpanded && (
                  <IconButton
                    iconProps={{ iconName: "ChevronDown" }}
                    onClick={() => setJobConfigExpanded(false)}
                  />
                )}
                {!jobConfigExpanded && (
                  <IconButton
                    iconProps={{ iconName: "ChevronRight" }}
                    onClick={() => setJobConfigExpanded(true)}
                  />
                )}
              </div>
            </Stack>
            {jobConfigExpanded && !isNil(jobConfig) && (
              <YamlFileRender yamlConfig={jobConfig} />
            )}
          </Stack>
        </Stack>
        <DialogFooter>
          <PrimaryButton onClick={onConfirm} text="Confirm" />
          <DefaultButton onClick={closeDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );
}

CreateItemDialog.propTypes = {
  setHideCreateDialog: PropTypes.func.isRequired
};
