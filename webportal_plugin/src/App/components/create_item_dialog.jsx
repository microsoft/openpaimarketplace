import PropTypes from "prop-types";
import React, { useState, useCallback, useContext } from "react";
import {
  DefaultButton,
  PrimaryButton,
  Dialog,
  DialogFooter,
  Dropdown,
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
import ImportYamlFile from "App/market_list/components/import_yaml_file";
import Context from "App/context";
import { MARKETPLACE_API } from "App/utils/constants";

export default function CreateItemDialog(props) {
  const { hideDialog, setHideDialog } = props;
  const { user, history } = useContext(Context);
  const { spacing } = getTheme();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("custom");
  const [tags, setTags] = useState([]);
  const [introduction, setIntroduction] = useState("");
  const [description, setDescription] = useState("");
  const [yamlText, setYamlText] = useState(null);
  const [hideSuccessDialog, setHideSuccessDialog] = useState(true);

  const CATEGORY_OPTIONS = [
    { key: "custom", text: "custom" },
    { key: "official", text: "official" }
  ];

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
    if (isNil(yamlText)) {
      alert("yaml file required");
      return false;
    }
    return true;
  };

  const onConfirm = async () => {
    if (!checkRequired()) {
      return;
    }
    setHideDialog(true);
    setHideSuccessDialog(false);

    const marketItem = new MarketItem({
      name: name,
      author: user,
      category: category,
      tags: tags,
      introduction: introduction,
      description: description,
      jobConfig: yaml.safeLoad(yamlText)
    });
    const itemId = await createMarketItem(marketItem);
    history.push(`/market_detail?itemId=${itemId}`);
  };

  const closeDialog = useCallback(() => {
    setHideDialog(true);
    setName("");
    setCategory("");
    setTags([]);
    setIntroduction("");
    setDescription("");
    setYamlText(null);
  });

  return (
    <div>
      <Dialog
        hidden={hideDialog}
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
          <Dropdown
            label="Category"
            options={CATEGORY_OPTIONS}
            defaultSelectedKey={"custom"}
            onChange={(e, item) => setCategory(item.text)}
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
          <ImportYamlFile setYamlText={setYamlText} />
        </Stack>
        <DialogFooter>
          <PrimaryButton onClick={onConfirm} text="Confirm" />
          <DefaultButton onClick={closeDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </div>
  );

  function closeSuccessDialog() {
    setHideSuccessDialog(true);
  }

  async function createMarketItem(marketItem) {
    const url = `${MARKETPLACE_API}/items`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: marketItem.name,
        author: marketItem.author,
        category: marketItem.category,
        introduction: marketItem.introduction,
        description: marketItem.description,
        jobConfig: marketItem.jobConfig,
        tags: marketItem.tags,
        status: marketItem.status
      })
    });
    if (res.ok) {
      const result = await res.json();
      return result.id;
    } else {
      throw new Error(res.statusText);
    }
  }
}

CreateItemDialog.propTypes = {
  hideDialog: PropTypes.bool.isRequired,
  setHideDialog: PropTypes.func.isRequired
};
