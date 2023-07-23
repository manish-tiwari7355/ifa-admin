import { callApi } from "../utils/apiUtils";
import jobs from "./endpoints/jobApplication";

export const getJobs = () =>
  callApi({ uriEndPoint: jobs.getJobs.v1 });
