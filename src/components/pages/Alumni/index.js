import React, { useState } from "react";
import { PageMetaTags } from "../../common";
import { Breadcrumb, Pagination, Table } from "antd";
import { useHistory, Link } from "react-router-dom";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import AddAlumni from "../../AddAlumni/index";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Sr.no.",
    dataIndex: "srno",
    align: "center",
    key: "",
    width: 50,
    render: (_, __, index) => <span>{index + 1}. &nbsp;</span>,
  },
  {
    title: "Name ",
    dataIndex: "name",
    key: "name",
    // render: (record) =>
    // console.log('record222', record)
    // <div>{data.name || "N/A"} </div>
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
    //   render: (__, data, index) => (
    //     <div className="font-semibold">{data._id || "N/A"}</div>
    //   ),
  },
  {
    title: "Year of passout",
    dataIndex: "yearOfPassout",
    key: "yearOfPassout",
    //   render: (data) => <div>{data || "N/A"}</div>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    //   render: (data) => <div>{data || "N/A"}</div>,
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Working In Industry",
    dataIndex: "workingInIndustry",
    key: "workingInIndustry",
  },
  {
    title: "Branch",
    dataIndex: "branch",
    key: "branch",
  },
  {
    title: "Message",
    dataIndex: "message",
    key: "message",
  },
 
];

const Alumni = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alumni, setAlumni] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [totalCount, setTotalCount] = useState();
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState();
  const action = (value) => {
    setKeyword(value);
  };
  // const { Option } = Select;
  const debounceSearch = debounce(action, 400);
  async function getData() {
    await
    axios
    .get(
      // method: "get",
      // url:
       `/alumni?keyword=${search}&viewSize=${viewSize}&startIndex=${startIndex}`,
     { headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("accessToken"),
      },}
    ).then((res) => {
      setAlumni(res.data.data);
      setTotalCount(res.data.totalCount);
    });
  }
  useEffect(() => {
    getData();
  }, [ search, search, startIndex, viewSize]);
  // useEffect(() => {
    // axios
    // .get(
      
    //    `/alumni?keyword=${search}&viewSize=${viewSize}&startIndex=${startIndex}`,
    //  { headers: {
    //     "Content-Type": "multipart/form-data",
    //     authorization: localStorage.getItem("accessToken"),
    //   },}
    // ).then((res) => {
    //   setAlumni(res.data.data);
    //   setTotalCount(res.data.totalCount);
    // });
  // }, []);
  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }

  return (
    <div className="content-panel mx-4 ">
      <PageMetaTags title="Prescribed Books" />
      <Breadcrumb style={{ marginBottom: 20 ,marginRight:20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Alumni</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between mx-4">
        <div>
          <h1 className="page-heading">Alumni</h1>
        </div>

        <div className=" ">
          <button
            className="bg-[#FA6210] h-12 mt-2 md:mt-0 ml-2 px-5 md:ml-6 font-semibold hover:bg-[#15538B]  rounded-md text-white"
            onClick={() => setIsModalOpen(true)}
          >
            Add Alumni
          </button>
        </div>
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
              // onRow={(record, rowIndex) => {
              //   return {
              //     onClick: (event) => {
              //       setJobId(record._id);
              //       cookies.set("jobId", record._id);
              //       handlePush();
              //     }, // click row
              //   };
              // }}
              rowClassName="cursor-pointer"
              pagination={false}
              columns={columns}
              dataSource={alumni}
              rowKey={(record) => record}
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
        <AddAlumni setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </div>
  );
};

export default Alumni;
