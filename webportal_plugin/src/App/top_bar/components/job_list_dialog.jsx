import React, { useState, useContext, useEffect } from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  FontClassNames,
  FontWeights,
  Stack
} from "office-ui-fabric-react";
import { isEmpty } from "lodash";
import c from "classnames";

import t from "App/components/tachyons.scss";
import { fetchSucessJobs, fetchJobConfig } from "App/utils/pai_api";
import Context from "App/context";
import JobTable from "./job_table";
import CreateItemDialog from "./create_dialog";

const JobListDialog = props => {
  const {
    setHideListDialog,
    setHideCreateDialog,
    setJobConfig
  } = props;
  const { api, user } = useContext(Context);

  const [jobs, setJobs] = useState(null);
  const [selectedJob, setSelectedJob] = useState();

  function getSucessJobs() {
    setJobs(null);
    fetchSucessJobs(api, user)
      .then(jobs => {
        setJobs(jobs);
      })
      .catch(e => {
        throw e;
      });
  }

  useEffect(getSucessJobs, []);

  async function openCreateDialog() {
    if (isEmpty(selectedJob)) {
      alert("please select a job to create");
    } else {
      setHideListDialog(true);
      const config = await fetchJobConfig(
        api,
        selectedJob[0].username,
        selectedJob[0].name
      );
      setJobConfig(config);
      setHideCreateDialog(false);
    }
  }

  function closeDialog() {
    setHideListDialog(true);
  }

  return (
    <Dialog
      hidden={false}
      onDismiss={closeDialog}
      minWidth={800}
      maxWidth={2000}
      dialogContentProps={{
        styles: {
          title: { padding: "20px 36px 12px 20px" },
          inner: { padding: "0px 40px 20px 20px" },
          topButton: { padding: "20px 20px 0px 0px" }
        },
        title: (
          <span
            className={c(t.mb2, t.fw6, FontClassNames.semibold)}
            style={{
              fontSize: 16,
              fontWeight: FontWeights.semibold
            }}
          >
            Success Job List
          </span>
        ),
        type: DialogType.normal,
        showCloseButton: false
      }}
      modalProps={{
        isBlocking: true
      }}
    >
      <JobTable jobs={jobs} setSelectedJob={setSelectedJob} />
      <DialogFooter>
        <PrimaryButton onClick={openCreateDialog} text="Create" />
        <DefaultButton onClick={closeDialog} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};

export default JobListDialog;
