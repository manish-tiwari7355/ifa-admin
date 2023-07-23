/* eslint-disable no-unused-vars */
import { Table, Pagination, Select, Breadcrumb } from "antd";

import axios from "axios";
import { withContext } from "Context";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";

import { getCategoriesAction } from "Actions/categoryActions";
import { PageMetaTags } from "../../common";

import Cookies from "universal-cookie";
import { SearchOutlined } from "@ant-design/icons";
const cookies = new Cookies();
const JobApplication = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [jonId, setJobId] = useState("");

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [startIndex, setStartIndex] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const action = (value) => {
    setKeyword(value);
  };
  const { Option } = Select;
  const debounceSearch = debounce(action, 400);

  async function getData() {
    await axios
      .get(
        `/job?keyword=${search}&viewSize=${viewSize}&startIndex=${startIndex}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        setData(resp.data);

        setTotalCount(resp.data.totalJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const handlePush = () => {
    history.push("/jobApplication/details");
  };
  useEffect(() => {
    getData();
  }, [id, search, search, startIndex, viewSize]);
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (data) => <div>{data || "N/A"}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (data) => <div>{data || "N/A"}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (data) => <div>{"+91" + " " + data || "N/A"}</div>,
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "phone",
      render: (item) => (
        <div className="text-sm bg-sky-100 font-semibold flex justify-center py-2 px-2 rounded-lg">
          <div className="">View Details</div>
        </div>
      ),
    },
  ];
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }

  return (
    <div className="content-panel mx-4">
      <PageMetaTags title="Job Application" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Job Application</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="page-heading">Job Application</h1>
      </div>
      <div className="bg-white rounded-md shadow-md ">
        <div className="flex justify-end pt-4 px-4">
          <div className="flex w-full">
            <div className="mb-3 flex w-full">
              <div className="input-group relative flex  items-stretch w-full mb-4">
                <input
                  type="search"
                  className="form-control h-12 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#FA6210] focus:outline-none"
                  placeholder="Please enter name"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  aria-describedby="button-addon2"
                />
                <button
                  className="btn i px-6 py-2.5 bg-[#FA6210] text-white font-medium text-xs leading-tight uppercase rounded-r shadow-md hover:bg-[#FA6210] hover:shadow-lg focus:bg-[#FA6210]  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-[#FA6210] active:shadow-lg transition duration-150 ease-in-out flex items-center"
                  type="button"
                  id="button-addon2"
                >
                  <SearchOutlined style={{ fontSize: "16px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-wrapper p-5">
          <div className="w-full overflow-auto">
            <Table
              className="no-shadow zcp-fixed-w-table"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setJobId(record._id);
                    cookies.set("jobId", record._id);
                    handlePush();
                  }, // click row
                };
              }}
              rowClassName="cursor-pointer"
              pagination={false}
              columns={columns}
              dataSource={data.jobs || []}
              rowKey={(record) => record._id}
              loading=""
              locale={{
                emptyText: (
                  <div className="flex items-center justify-center text-center">
                    <div>
                      <p className="text-lg">No Application Found!</p>
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
          <div>
            <div className="flex justify-end mt-6">
              <Pagination
                key={`page-${currentPage}`}
                showSizeChanger
                pageSizeOptions={["10", "25", "50", "100"]}
                onShowSizeChange={(e, p) => {
                  setViewSize(p);
                  setCurrentPage(1);
                  setStartIndex(0);
                }}
                defaultCurrent={1}
                current={currentPage}
                pageSize={viewSize}
                total={totalCount}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                onChange={handleChangePagination}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

JobApplication.propTypes = {
  Contact: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ jobId, categories }, dispatch]) => ({
    jobId,
    categories,
    getCategoriesFunc: (data) => getCategoriesAction(data, dispatch),
  }),
  JobApplication
);
