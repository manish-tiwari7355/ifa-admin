import React, { useEffect, useState } from "react";
import { withContext } from "Context";
import { getDashboardFeedAction } from "Actions/feedActions";

import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { RightOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAtom } from "jotai";
import { categorieName } from "../../../../store/categorieName";

const MainDashboard = ({ user }) => {
  const [dataNews, setDataNews] = useState();
  const [dataJob, setDataJob] = useState();
  const [dataEvents, setDataEvents] = useState([]);
  const history = useHistory();
  const [push, setPush] = useAtom(categorieName);
  const ListData = [
    {
      number: dataNews,
      name: "New Leads",
      time: "Since Last Month",
      color: "blue",
      link: "/contact",
    },
    {
      number: dataJob,
      name: "Job application",
      time: "Since Last Month",
      color: "green",
      link: "/jobApplication",
    },
    {
      number: dataEvents.totalCount,
      name: "Active events",
      time: "Since Last Month",
      color: "purple",
      link: "/blogs",
    },
  ];
  async function getDataNews() {
    await axios
      .get("/contact", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        setDataNews(resp.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getDataJob() {
    await axios
      .get("/job", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        setDataJob(resp.data.totalJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function getDataEvents() {
    await axios
      .get("/blog?category=events", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        setDataEvents(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getDataNews();
    getDataJob();
    getDataEvents();
  }, []);
  return (
    <div className="content-panel mx-4">
      <div className="text-4xl font-semibold text-[#15538B] ">
        Welcome back <span className="text-[#FA6210]">{user.name}</span>
      </div>
      <div className="text-base font-semibold mt-1">
        All details about your school is here
      </div>
      <div className="border-b mt-6" />
      <div className="flex justify-center xl:justify-start">
        <div className="grid  md:grid-cols-2 gap-x-10  lg:grid-cols-3">
          {ListData.map((items) => {
            return (
              <div
                onClick={() => {
                  history.push(items.link);
                  if (items.link === "/blogs") {
                    setPush("activities");
                  }
                }}
                className="shadow-md cursor-pointer w-72 md:w-full lg:w-60 xl:w-72 mt-10 rounded-xl py-4 px-4"
              >
                <div className="flex justify-between  ">
                  <div>
                    <div className="  ">
                      <div
                        className={`w-20 h-20 rounded-xl bg-gradient-to-t from-${items.color}-300 to-${items.color}-700 flex justify-center pt-5`}
                      >
                        <div className="border-2 w-10 rounded-full border-white h-10 grid place-item-center items-center">
                          <RightOutlined
                            style={{ fontSize: "16px", color: "white" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-lg text-right text-gray-500">
                      {items.name}
                    </div>
                    <div className="text-right text-4xl">
                      {items.number || 0}
                    </div>
                  </div>
                </div>
                <div className="border-b mt-4 border-gray-300" />
                <div className="text-sm pt-5">{items.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

MainDashboard.propTypes = {
  MainDashboard: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, feeds }, dispatch]) => ({
    user,
    feeds,
    getDashboardFeedFunc: (data) => getDashboardFeedAction(data, dispatch),
  }),
  MainDashboard
);

// export default withContext(([{ user }]) => ({ user }), MainDashboard);
