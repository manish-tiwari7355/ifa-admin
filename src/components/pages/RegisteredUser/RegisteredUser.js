/* eslint-disable no-useless-concat */
/* eslint-disable no-unused-vars */
import { Table, Pagination, Modal, Select, Breadcrumb, Tag } from "antd";

import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";

import { PageMetaTags } from "../../common";

import profileImage from "../../../assets/images/profile.png";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const RegisteredUser = () => {
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);

  const [data, setData] = useState([]);
  const [singleData, setSingleData] = useState([]);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [FatherOccup, setFatherOccup] = useState("");
  const [MotherName, setMotherName] = useState("");
  const [MotherOccup, setMotherOccup] = useState("");
  const [PermanentAddress, setPermanentAddress] = useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [totalCount, setTotalCount] = useState();
  const [remark, setRemark] = useState("");
  const [admissionSought, setAdmissionSought] = useState("");
  const [presentlyStudying, setPresentlyStudying] = useState("");
  const [currentSchool, setCurrentSchool] = useState("");
  const [currentBoard, setCurrentBoard] = useState("");

  const [color, setColor] = useState("");
  const action = (value) => {
    setKeyword(value);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  async function getData() {
    await axios
      .get(
        `/auth/getAllRegisteruser?keyword=${search}&viewSize=${viewSize}&startIndex=${startIndex}`,
        {}
      )
      .then((resp) => {
        setData(resp.data.registerUser);
        setTotalCount(resp.data.totalCount);
        resp.data.registerUser.map((item) => setData(item));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const getSingleData = (id) => {
    axios
      .get(`/auth/registeruser/${id}`, {})
      .then((resp) => {
        setSingleData(resp.data.registerUser);
        setDateOfBirth(resp.data.registerUser.dateOfBirth);
        setFatherName(resp.data.registerUser.fatherName);
        setFatherOccup(resp.data.registerUser.fatherOccupation);
        setMotherName(resp.data.registerUser.motherName);
        setMotherOccup(resp.data.registerUser.motherOccupation);
        setPermanentAddress(resp.data.registerUser.permanentAddress);
        setName(resp.data.registerUser.name);
        setRemark(resp.data.registerUser.remark);
        setAdmissionSought(resp.data.registerUser.admissionSought);
        setPresentlyStudying(resp.data.registerUser.presentlyStudying);
        setCurrentSchool(resp.data.registerUser.currentSchool);
        setCurrentBoard(resp.data.registerUser.currentBoard);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, [search, startIndex, viewSize]);

  const columns = [
    {
      title: "Sr.no.",
      dataIndex: "srno",
      align: "center",
      key: "",

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
      title: "Admission type",

      render: (_, { freshAdmission }) => {
        if (freshAdmission === true) {
          setColor("green");
          freshAdmission = "Fresh Admission";
        } else {
          setColor("red");
          freshAdmission = "Old Admission";
        }

        return (
          <>
            <Tag color={freshAdmission === "Fresh Admission" ? "green" : "red"}>
              {freshAdmission}
            </Tag>
          </>
        );
      },
    },
  ];

  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }

  return (
    <div className="content-panel px-4">
      <div className="ml-4">
        <PageMetaTags title="Registered User" />
        <Breadcrumb style={{ marginBottom: 20 }}>
          <Breadcrumb.Item>
            <Link to="/dashboard">Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Registered User</Breadcrumb.Item>
        </Breadcrumb>
        <div className="flex justify-between">
          <h1 className="page-heading">Registered User</h1>
        </div>
      </div>

      <div className="mx-4">
        <div className="bg-white rounded-md shadow-md ">
          <div className="flex justify-center pt-4 px-4 ">
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

          <div className=" p-5">
            <div className="w-full overflow-auto">
              <Table
                className="no-shadow "
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      showModal();

                      getSingleData(record._id);
                    },
                  };
                }}
                rowClassName="cursor-pointer"
                pagination={false}
                columns={columns}
                dataSource={data.data || []}
                rowKey={(record) => record._id}
                loading=""
                locale={{
                  emptyText: (
                    <div className="flex items-center justify-center text-center">
                      <div>
                        <p className="text-lg">No Registered user yet!</p>
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

      <Modal
        visible={isModalVisible}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
      >
        <div className="relative  flex-auto ">
          <div className="mb-5">
            <div className="ml-10 mt-5 flex">
              <div className="w-16">
                <img src={profileImage} alt="profile_image" />
              </div>
              <div className="text-3xl mt-2 ml-6 font-semibold">{name}</div>
            </div>
            <div className="border-b mt-4 border-gray-500" />
            <div className="grid grid-cols-1 gap-x-4 gap-y-2  mt-10 px-10">
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Date of Birth :
                </div>
                <div className="text-lg font-semibold">
                  &nbsp; {dateOfBirth.slice(0, 10)}
                </div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Father 's Name :
                </div>
                <div className="text-lg font-semibold"> &nbsp;{FatherName}</div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Father 's Occupation :
                </div>
                <div className="text-lg font-semibold">&nbsp;{FatherOccup}</div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Mother 's Name :
                </div>
                <div className="text-lg font-semibold">&nbsp;{MotherName}</div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Mother 's Occupation :
                </div>
                <div className="text-lg font-semibold">&nbsp;{MotherOccup}</div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Permanent Address :
                </div>
                <div className="text-lg font-semibold break-all">
                  &nbsp;{PermanentAddress}
                </div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Admission sought for grade:
                </div>
                <div className="text-lg font-semibold break-all">
                  &nbsp;{admissionSought}
                </div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Presently studying in Grade:
                </div>
                <div className="text-lg font-semibold break-all">
                  &nbsp;{presentlyStudying}
                </div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Current School/ School last attended:
                </div>
                <div className="text-lg font-semibold break-all">
                  &nbsp;{currentSchool}
                </div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Current Board/ Last attended:
                </div>
                <div className="text-lg font-semibold break-all">
                  &nbsp;{currentBoard}
                </div>
              </div>
              <div className="flex">
                <div className="text-xl font-semibold text-gray-500">
                  Remark :
                </div>
                <div className="text-lg font-semibold break-all">
                  &nbsp;{remark}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisteredUser;
