/* eslint-disable no-unused-vars */
import {
  Button,
  Table,
  Input,
  Pagination,
  Row,
  Modal,
  Col,
  Form,
  notification,
  Popconfirm,
  message,
  Select,
  Breadcrumb,
  Tabs,
  Tag,
} from "antd";
import {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "../../../services/category";
import { withContext } from "Context";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getCategoriesAction } from "Actions/categoryActions";
import { PageMetaTags } from "../../common";
import { categoryTypes } from "../../../utils/index";
import SearchBar from "../Blogs/SearchBar";
import { CloseCircleOutlined } from "@ant-design/icons";
import profileImage from "../../../assets/images/profile.png";
import axios from "axios";
import { TiTick } from "react-icons/ti";
import { SearchOutlined } from "@ant-design/icons";
import { HiEye } from "react-icons/hi";
import { Popover } from "antd";

const Contact = ({ user, getCategoriesFunc, categories }) => {
  const categoriesTypeList = categoryTypes();
  const { TabPane } = Tabs;
  const { Search } = Input;
  const [form] = Form.useForm();

  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);

  const [checked, setChecked] = useState(false);
  const [color, setColor] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [remark, setRemark] = useState("");
  const [id, setId] = useState("");
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [categorie, setCategorie] = useState(categorie || "");
  console.log("currentPage", currentPage);
  const action = (value) => {
    setKeyword(value);
  };
  const { Option } = Select;
  const handleCange = (value) => {
    setCategorie(value);
  };
  async function getData() {
    await axios
      .get(
        `/contact?keyword=${search}&status=${categorie}&viewSize=${viewSize}&startIndex=${startIndex}`,
        {}
      )
      .then((resp) => {
        setData(resp.data);

        setTotalCount(resp.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const updateData = () => {
    axios
      .put(
        `/contact/${id}`,
        {
          notes: remark,
          status: checked ? "completed" : "pending",
        },
        {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        notification.success({
          message: `Status changed!`,
        });
        if (res) {
          getData();
          setStatus("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    updateData();
    setIsModalVisible(false);
    setChecked(false);
    setRemark("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      dataIndex: "firstName",
      key: "firstName",
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
      // eslint-disable-next-line no-useless-concat
      render: (data) => <div>{"+91" + " " + data || "N/A"}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => {
        if (status === true) {
          setColor("green");
          status = "completed";
        } else if (status === false) {
          setColor("red");
          status = "Not contacted";
        }

        return (
          <>
            <Tag color={status === "completed" ? "green" : "red"}>
              {status === "completed" ? "Completed" : "In-Completed"}
            </Tag>
          </>
        );
      },
    },
    {
      title: "Remark",
      dataIndex: "notes",
      key: "notes",
      // eslint-disable-next-line no-useless-concat
      render: (data) => (
        <div className="pl-7">
          <Popover content={data ? data : "No remark found!"} title="Remark">
            <HiEye className="text-lg" />
          </Popover>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getData();
  }, [search, search, startIndex, viewSize, categorie]);

  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }

  return (
    <div className="content-panel ">
      <div className="ml-4">
        <PageMetaTags title="Contacted us" />
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Link to="/dashboard">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Contacted us</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-between">
          <h1 className="page-heading">Contacted us</h1>
        </div>
      </div>

      <div className="mx-4">
        <div className="bg-white rounded-md shadow-md ">
          <div className="profile-wrapper p-5">
            <div className="profile-wrapper">
              <div className="w-full">
                <Tabs
                  onChange={(key) => {
                    handleCange(key);
                    setSearch("");
                    setCurrentPage(1);
                    setStartIndex(0);
                    setViewSize(10);
                  }}
                  defaultActiveKey="events"
                  activeKey={categorie}
                >
                  <TabPane tab="All" key="">
                    <div className="flex justify-end pt-4 px-4">
                      <div className="flex w-full">
                        <div className="mb-3 flex w-full">
                          <div className="input-group relative flex  items-stretch w-full mb-4">
                            <input
                              type="search"
                              className="form-control h-12 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#FA6210] focus:outline-none"
                              placeholder="Please enter name"
                              aria-label="Search"
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setStartIndex(0);
                                setViewSize(1000);
                                if (e.target.value.length === 0) {
                                  setStartIndex(0);
                                  setViewSize(10);
                                }
                              }}
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
                    <div className="w-full overflow-auto">
                      <Table
                        className="no-shadow zcp-fixed-w-table"
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: (event) => {
                              if (record.status === "pending") {
                                showModal();
                              }
                              setName(record.name);
                              setEmail(record.email);
                              setPhone(record.phone);
                              setId(record._id);
                            },
                          };
                        }}
                        rowClassName="cursor-pointer"
                        pagination={false}
                        columns={columns}
                        dataSource={data.contactUsData || []}
                        rowKey={(record) => record._id}
                        loading=""
                        locale={{
                          emptyText: (
                            <div className="flex items-center justify-center text-center">
                              <div>
                                <p className="text-lg">No Contact found!</p>
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
                  </TabPane>
                  <TabPane tab="Completed" key="completed">
                    <div className="flex justify-end pt-4 px-4">
                      <div className="flex w-full">
                        <div className="mb-3 flex w-full">
                          <div className="input-group relative flex  items-stretch w-full mb-4">
                            <input
                              type="search"
                              className="form-control h-12 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#FA6210] focus:outline-none"
                              placeholder="Please enter name"
                              aria-label="Search"
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setStartIndex(0);
                                setViewSize(1000);
                                if (e.target.value.length === 0) {
                                  setStartIndex(0);
                                  setViewSize(10);
                                }
                              }}
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
                    <div className="w-full overflow-auto">
                      <Table
                        className="no-shadow zcp-fixed-w-table"
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: (event) => {
                              // showModal();
                              setName(record.name);
                              setEmail(record.email);
                              setPhone(record.phone);

                              setId(record._id);
                            },
                          };
                        }}
                        rowClassName="cursor-pointer"
                        pagination={false}
                        columns={columns}
                        dataSource={data.contactUsData || []}
                        rowKey={(record) => record._id}
                        loading=""
                        locale={{
                          emptyText: (
                            <div className="flex items-center justify-center text-center">
                              <div>
                                <p className="text-lg">No Contact found!</p>
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
                  </TabPane>
                  <TabPane tab="Not contacted" key="pending">
                    <div className="flex justify-end pt-4 px-4">
                      <div className="flex w-full">
                        <div className="mb-3 flex w-full">
                          <div className="input-group relative flex  items-stretch w-full mb-4">
                            <input
                              type="search"
                              className="form-control h-12 relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-l transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-[#FA6210] focus:outline-none"
                              placeholder="Please enter name"
                              aria-label="Search"
                              onChange={(e) => {
                                setSearch(e.target.value);
                                setStartIndex(0);
                                setViewSize(1000);
                                if (e.target.value.length === 0) {
                                  setStartIndex(0);
                                  setViewSize(10);
                                }
                              }}
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
                    <div className="w-full overflow-auto">
                      <Table
                        className="no-shadow zcp-fixed-w-table"
                        onRow={(record, rowIndex) => {
                          return {
                            onClick: (event) => {
                              showModal();
                              setName(record.name);
                              setEmail(record.email);
                              setPhone(record.phone);

                              setId(record._id);
                            },
                          };
                        }}
                        rowClassName="cursor-pointer"
                        pagination={false}
                        columns={columns}
                        dataSource={data.contactUsData || []}
                        rowKey={(record) => record._id}
                        loading=""
                        locale={{
                          emptyText: (
                            <div className="flex items-center justify-center text-center">
                              <div>
                                <p className="text-lg">No Contact found!</p>
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
                  </TabPane>
                </Tabs>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Modal
        okText="save"
        visible={isModalVisible}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="relative  flex-auto ">
          <div className=" ">
            <div className="">
              <div className="flex">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                />

                {/* <div className="w-8 h-8 border rounded-full flex justify-center mt-[-4px] pt-1">
                            <TiTick className="text-[20px]" />
                          </div> */}

                <div className="ml-2">Mark as Completed</div>
              </div>
              <div>
                <div className="mt-5 text-lg font-semibold">Remark</div>
                <div>
                  <Input.TextArea
                    className="h-20 mt-2 border px-5 py-3 w-full rounded  "
                    placeholder="Remarks"
                    autoSize={{ minRows: 4, maxRows: 16 }}
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                  />
                </div>
              </div>
              <hr className="mt-6" />
              <div className="flex justify-end w-full">
                <button
                  onClick={() => {
                    updateData();
                    setIsModalVisible(false);
                    setChecked(false);
                    setRemark("");
                  }}
                  className="bg-[#FA6210] h-10 mt-4 px-5 font-semibold hover:bg-[#15538B]  rounded-md text-white"
                >
                  Change Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Contact.propTypes = {
  Contact: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user, categories }, dispatch]) => ({
    user,
    categories,
    getCategoriesFunc: (data) => getCategoriesAction(data, dispatch),
  }),
  Contact
);
