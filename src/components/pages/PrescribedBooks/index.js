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

const PrescribedBooks = () => {
  const history = useHistory();
  const [books, setBooks] = useState([]);
  // console.log("books.........", books);

  const [viewSize, setViewSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [newDate, setNewDate] = useState([]);
  const [yearValue, setYearValue] = useState("");
  const [loading, setLoading] = useState(true);

  // const handleChange = (value) => {
  //   setYearValue(value);
  // };

  const columns = [
    {
      title: "Sr.no.",
      dataIndex: "srno",
      align: "center",
      key: "",
      width: 50,
      render: (_, __, index) => index + 1 + viewSize * (currentPage - 1),
    },
    // {
    //   title: "Name of the Book",
    //   dataIndex: "bookName",
    //   key: "bookName",
    //   render: (__, data, index) => <div>{data.bookName || "N/A"}</div>,
    // },
    {
      title: "Class",
      dataIndex: "classes",
      key: "classes",
      render: (__, data, index) => (
        <div className="font-semibold">{data._id || "N/A"}</div>
      ),
    },
    // {
    //   title: "Subject",
    //   dataIndex: "subject",
    //   key: "subject",
    //   render: (data) => <div>{data || "N/A"}</div>,
    // },
    // {
    //   title: "Publisher",
    //   dataIndex: "publisher",
    //   key: "publisher",
    //   render: (data) => <div>{data || "N/A"}</div>,
    // },
    {
      title: "Action",
      key: "Action",
      align: "left",

      render: (records) => (
        <div className="flex gap-4">
          <div>
            <Button
              type="link"
              size="small"
              style={{ padding: "0px 1px" }}
              onClick={() =>
                history.push(`/prescribedBooks/edit/${records.book_key}`)
              }
              // onClick={() => history.push(`/prescribedBooks/edit`)}
            >
              <EditOutlined />
            </Button>
          </div>
          <div>
            <Tooltip title="Delete">
              <Popconfirm
                title="Are you sure you want to delete"
                onConfirm={() => {
                  handleDelete(records.book_key);
                  console.log("records", records);
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

  function fetchBooks() {
    setBooks([]);

    axios
      .get("/book", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        const data = res.data.data;
        console.log("data", data);

        const filteredData = data[0].data.reduce((acc, classData) => {
          classData.data.forEach((bookData) => {
            const key = bookData._id;
            if (!acc[key]) {
              acc[key] = {
                book_key: bookData._id,
                _id: classData._id,
                bookName: bookData.bookName,
                publisher: bookData.publisher,
                subject: bookData.subject,
                media: bookData.media[0],
              };
            }
          });
          return acc;
        }, {});

        console.log("filteredData", filteredData);
        setBooks(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleDelete = async (bookId) => {
    await axios
      .delete(`/book/${bookId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        fetchBooks();
        if (res) {
          message.success("Deleted successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="content-panel mx-4">
      <PageMetaTags title="Prescribed Books" />
      <Breadcrumb style={{ marginBottom: 20, margin: "20px 8px" }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Prescribed Books</Breadcrumb.Item>
      </Breadcrumb>
      <div className="md:flex justify-between mx-4">
        <div>
          <h1 className="page-heading">Prescribed Books</h1>
        </div>

        <div className=" ">
          {/* <Select
            defaultValue={"Select Class"}
            style={{ width: 150 }}
            size="large"
          >
            {newDate.map((item, id) => {
              return (
                <Option key={item} value={item}>
                  {item}
                </Option>
              );
            })}
          </Select> */}
          <button
            onClick={() => history.push("/prescribedBooks/add")}
            className="bg-[#FA6210] h-12 mt-2 md:mt-0 ml-2 px-5 md:ml-6 font-semibold hover:bg-[#15538B]  rounded-md text-white"
          >
            Add Books
          </button>
        </div>
      </div>
      <div className="border-b mt-4 md:-mt-4 mb-8" />
      {loading ? (
        <div className="flex justify-center">
          {" "}
          <Spin size="large" />{" "}
        </div>
      ) : null}
      {/* {data.length === 0 ? (
        <div className="flex items-center mb-10 justify-center text-center">
          <div>
            <p className="text-lg">No Books Found !</p>
            <img
              className="ml-16 "
              src={SearchNotFound}
              alt="No categories found!"
              style={{ height: "100px" }}
            />
          </div>
        </div>
      ) : null} */}
      <div className="profile-wrapper p-5">
        <div className="w-full overflow-auto">
          <Table
            className="no-shadow zcp-fixed-w-table"
            rowClassName="cursor-pointer"
            pagination={false}
            columns={columns}
            dataSource={books ? Object.values(books) : []}
            rowKey={(record) => record._id}
            loading=""
            locale={{
              emptyText: (
                <div className="flex items-center justify-center text-center">
                  <div>
                    <p className="text-lg">No Books Found!</p>
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
        {/* <div>
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
        </div> */}
      </div>
    </div>
  );
};

export default PrescribedBooks;
