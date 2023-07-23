/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
/* eslint-disable no-unused-vars */
import {
  Breadcrumb,
  Select,
  Spin,
  Button,
  Table,
  Tooltip,
  Popconfirm,
  message,
} from "antd";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { PageMetaTags } from "../../common";
import axios from "axios";
const { Option } = Select;

const Videos = () => {
  const history = useHistory();
  const [video, setVideo] = useState([]);

  const [viewSize, setViewSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Sr.no.",
      dataIndex: "srno",
      align: "center",
      key: "",
      width: 50,
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (__, data, index) => (
        <div className="font-semibold">{data.description || "N/A"}</div>
      ),
    },
    {
      title: "Links",
      dataIndex: "links",
      key: "links",
      render: (__, data, index) => (
        <div className="font-semibold">{data.link || "N/A"}</div>
      ),
    },
    {
      title: "Action",
      key: "Action",
      align: "left",

      render: (records) => (
        <div className="flex gap-4">
          <div>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure you want to delete"
                onConfirm={() => {
                  handleDelete(records._id);
                  console.log("records", records._id);
                }}
                okText="Confirm"
                cancelText="No"
                okType="danger"
              >
                <Button
                  type="link"
                  danger
                  size="small"
                  style={{ padding: "0px 1px" }}
                >
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  function fetchVideos() {
    setVideo([]);

    axios
      .get("/video", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data.data;
        console.log("data", data);
        setVideo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = async (videoId) => {
    await axios
      .delete(`/video/${videoId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        fetchVideos();
        if (res) {
          message.success("Deleted successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="content-panel mx-4">
      <PageMetaTags title="Prescribed Books" />
      <Breadcrumb style={{ marginBottom: 20, margin: "20px 8px" }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Videos</Breadcrumb.Item>
      </Breadcrumb>
      <div className="md:flex justify-between mx-4">
        <div>
          <h1 className="page-heading">Videos</h1>
        </div>

        <div className=" ">
          <button
            onClick={() => history.push("/videos/add")}
            className="bg-[#FA6210] h-12 mt-2 md:mt-0 ml-2 px-5 md:ml-6 font-semibold hover:bg-[#15538B]  rounded-md text-white"
          >
            Add Video
          </button>
        </div>
      </div>
      <div className="border-b mt-4 md:-mt-4 mb-8" />
      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : null}
      <div className="profile-wrapper p-5">
        <div className="w-full overflow-auto">
          <Table
            className="no-shadow zcp-fixed-w-table"
            rowClassName="cursor-pointer"
            pagination={false}
            columns={columns}
            dataSource={video ? Object.values(video) : []}
            rowKey={(record) => record._id}
            loading=""
            locale={{
              emptyText: (
                <div className="flex items-center justify-center text-center">
                  <div>
                    <p className="text-lg">No Video Found!</p>
                    <img
                      className="ml-16 "
                      src={SearchNotFound}
                      alt="No categories found!"
                      style={{ height: "100px" }}
                    />
                  </div>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Videos;
