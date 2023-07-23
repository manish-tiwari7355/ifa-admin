import { defaults } from "./default";


const Jobs = {
getJobs: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/job",
    },
  }
}

export default Jobs;