import { makeStyles } from "@material-ui/core";
import dayjs from "dayjs";
import React from "react";
import { DurationText } from "../../common/DurationText";
import Loading from "../../components/Loading";
import { MetadataSection } from "../../components/MetadataSection";
import { StatusChip } from "../../components/StatusChip";
import TitleCard from "../../components/TitleCard";
import ActorList from "../actor/ActorList";
import PlacementGroupList from "../state/PlacementGroup";
import TaskList from "../state/task";

import { useJobDetail } from "./hook/useJobDetail";
import { JobProgressBar } from "./JobProgressBar";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export const JobDetailChartsPage = () => {
  const classes = useStyle();
  const { job, msg, params } = useJobDetail();
  const jobId = params.id;

  if (!job) {
    return (
      <div className={classes.root}>
        <Loading loading={msg.startsWith("Loading")} />
        <TitleCard title={`JOB - ${params.id}`}>
          <StatusChip type="job" status="LOADING" />
          <br />
          Request Status: {msg} <br />
        </TitleCard>
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <TitleCard title={`JOB - ${params.id}`}>
        <MetadataSection
          metadataList={[
            {
              label: "Entrypoint",
              content: job.entrypoint
                ? {
                    value: job.entrypoint,
                    copyableValue: job.entrypoint,
                  }
                : { value: "-" },
            },
            {
              label: "Status",
              content: <StatusChip type="job" status={job.status} />,
            },
            {
              label: "Job ID",
              content: job.job_id
                ? {
                    value: job.job_id,
                    copyableValue: job.job_id,
                  }
                : { value: "-" },
            },
            {
              label: "Submission ID",
              content: job.submission_id
                ? {
                    value: job.submission_id,
                    copyableValue: job.submission_id,
                  }
                : {
                    value: "-",
                  },
            },
            {
              label: "Duration",
              content: job.start_time ? (
                <DurationText
                  startTime={job.start_time}
                  endTime={job.end_time}
                />
              ) : (
                <React.Fragment>-</React.Fragment>
              ),
            },
            {
              label: "Started at",
              content: {
                value: job.start_time
                  ? dayjs(Number(job.start_time)).format("YYYY/MM/DD HH:mm:ss")
                  : "-",
              },
            },
            {
              label: "Ended at",
              content: {
                value: job.end_time
                  ? dayjs(Number(job.end_time)).format("YYYY/MM/DD HH:mm:ss")
                  : "-",
              },
            },
          ]}
        />
      </TitleCard>
      <TitleCard title="Tasks">
        <JobProgressBar jobId={jobId} job={job} />
      </TitleCard>
      <TitleCard title="Task Table">
        <TaskList jobId={jobId} />
      </TitleCard>
      <TitleCard title="Actors">{<ActorList jobId={jobId} />}</TitleCard>
      <TitleCard title="Placement Groups">
        <PlacementGroupList jobId={jobId} />
      </TitleCard>
    </div>
  );
};
