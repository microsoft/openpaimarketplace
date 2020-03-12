import PropTypes from "prop-types";
import React, { useState, useCallback } from "react";
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
  Text,
  getTheme
} from "office-ui-fabric-react";

import { TagBar } from "../../components/tag_bar";
import { updateItem } from "../../utils/marketplace_api";

const { spacing } = getTheme();

export default function EditMarketItem(props) {
  const { hideDialog, setHideDialog, marketItem } = props;

  const [name, setName] = useState(marketItem.name);
  const [category, setCategory] = useState(marketItem.category);
  const [tags, setTags] = useState(marketItem.tags);
  const [introduction, setIntroduction] = useState(marketItem.introduction);
  const [description, setDescription] = useState(marketItem.description);

  const CATEGORY_OPTIONS = [
    { key: "custom", text: "custom" },
    { key: "official", text: "official" }
  ];

  const checkRequired = () => {
    if (name === "") {
      alert("Title required");
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
    return true;
  };

  async function onConfirm() {
    if (!checkRequired()) {
      return;
    }
    setHideDialog(true);

    await updateItem(
      marketItem.id,
      name,
      marketItem.author,
      category,
      introduction,
      description,
      marketItem.jobConfig,
      marketItem.submits,
      marketItem.stars,
      tags
    );
    window.location.reload(true);
  }

  const closeDialog = useCallback(() => {
    setHideDialog(true);
  });

  return (
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
            Edit MarketItem
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
          defaultSelectedKey={category}
          onChange={(e, item) => {
            setCategory(item.text);
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
        <TextField label="Author" value={marketItem.author} disabled />
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
      </Stack>
      <DialogFooter>
        <PrimaryButton onClick={onConfirm} text="Confirm" />
        <DefaultButton onClick={closeDialog} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
}

EditMarketItem.propTypes = {
  hideDialog: PropTypes.bool.isRequired,
  setHideDialog: PropTypes.func.isRequired,
  marketItem: PropTypes.object
};
