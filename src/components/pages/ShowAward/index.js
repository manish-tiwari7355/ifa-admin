/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
/* eslint-disable no-unused-vars */
import {
  Breadcrumb,
  Pagination,
  Modal,
  Select,
  Spin,
  Carousel,
  Radio,
  Button,
  notification,
} from "antd";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import { useHistory, Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

import {
  MdDeleteOutline,
  MdKeyboardArrowRight,
  MdViewAgenda,
  MdViewCarousel,
  MdViewDay,
  MdViewModule,
} from "react-icons/md";
import { PageMetaTags } from "../../common";
import axios from "axios";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { deleteAwardsData } from "../../../services/blog";
import { EditableProTable } from "@ant-design/pro-table";
const { Option } = Select;

const contentStyle = {
  height: "160px",
  color: "black",
  lineHeight: "160px",
  textAlign: "center",
  background: "black",
};

const ShowAward = () => {
  const history = useHistory();

  const [viewSize, setViewSize] = useState(8);
  const [startIndex, setStartIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState([]);
  const [newDate, setNewDate] = useState([]);
  const [desc, setDesc] = useState("");
  const [yearValue, setYearValue] = useState("");
  const [loading, setLoading] = useState(true);
  const slider = useRef(null);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  async function getYear() {
    await axios
      .get(`/awards`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        const year = [];
        resp.data.awardsData.map((item) => {
          year.push(item.year);
        });

        const newYear = new Set(year);
        setNewDate(Array.from(newYear).sort());
        // setYearValue(Array.from(newYear).sort()[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function deleteAwards(id) {
    deleteAwardsData({ pathParams: { id } }).then((res) => {
      console.log(res, "eee");

      const updatedData = data.filter((i) => i._id !== res.data._id);
      setData(updatedData);
      setTotalCount(updatedData.length);

      notification.success({ message: "Deleted Successfully" });
      setLoading(false);
    });
  }
  async function getData() {
    await axios
      .get(
        `/awards?year=${yearValue}&viewSize=${viewSize}&startIndex=${startIndex}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        console.log(resp, "eeee");
        setData(resp.data.awardsData);
        setTotalCount(resp.data.totalCount);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  const handleChange = (value) => {
    setYearValue(value);
  };

  useEffect(() => {
    getYear();
  }, []);
  useEffect(() => {
    getData();
  }, [startIndex, viewSize, yearValue]);
  const contentStyle = {
    height: "400px",
    width: "500px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <div className="content-panel mx-4">
      <PageMetaTags title="Awards" />
      <Breadcrumb style={{ marginBottom: 20, margin: "20px 8px" }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Awards</Breadcrumb.Item>
      </Breadcrumb>
      <div className="md:flex justify-between mx-4">
        <div>
          <h1 className="page-heading">Awards</h1>
        </div>

        <div className=" ">
          <Select
            defaultValue={"Select Year"}
            style={{ width: 150 }}
            onChange={handleChange}
            size="large"
          >
            {newDate.map((item) => {
              return <Option value={item}>{item}</Option>;
            })}
          </Select>
          <button
            onClick={() => history.push("/awards/add")}
            className="bg-[#FA6210] h-12 mt-2 md:mt-0 ml-2 px-5 md:ml-6 font-semibold hover:bg-[#15538B]  rounded-md text-white"
          >
            Add Awards
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
      {data.length === 0 ? (
        <div className="flex items-center mb-10 justify-center text-center">
          <div>
            <p className="text-lg">No Awards Found !</p>
            <img
              className="ml-16 "
              src={SearchNotFound}
              alt="No categories found!"
              style={{ height: "100px" }}
            />
          </div>
        </div>
      ) : null}
      <div className="grid gap-8  lg:grid-cols-2 2xl:grid-cols-4 xl:mx-12 ">
        {data.map((item) => {
          return (
            <div className="cursor-pointer">
              <div className="flex justify-center px-4">
                <div className="">
                  <div className=" max-w-sm overflow-hidden rounded shadow-md ">
                    <div className="flex justify-end">
                      <div
                        onClick={() => {
                          showModal();
                          setDesc(item.description);
                          setImage(item.media);
                        }}
                        className="font-bold mr-2 cursor-pointer flex text-lg px-4 py-2 border-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 rounded-full"
                      >
                        <div style={{ color: "black" }}>View</div>
                      </div>
                      <div
                        onClick={() => {
                          history.push(`/editawards/${item._id}`);
                        }}
                        className="font-bold cursor-pointer flex text-lg px-4 py-2 border-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 rounded-full"
                      >
                        <div className="mt-[-5px] mr-2">
                          <EditOutlined />
                        </div>
                        <div>Edit</div>
                      </div>
                      <div
                        className=""
                        onClick={() => {
                          deleteAwards(item._id);
                        }}
                      >
                        <MdDeleteOutline className="text-[30px] text-[#FA6210] " />
                      </div>
                    </div>

                    {item.media[0] ? (
                      <>
                        {item.media[0].type.includes("video") ? (
                          <div className="h-full w-full bg-gray-200">
                            <video controls>
                              <source
                                src={item.media[0].url}
                                type="video/mp4"
                              />
                              Your browser does not support the video tag.
                            </video>
                          </div>
                        ) : (
                          <img
                            src={item.media[0].url}
                            alt={item.media[0].title}
                            className="w-[400px] h-[250px]"
                          />
                        )}
                      </>
                    ) : (
                      <></>
                    )}

                    <div className="flex items-center justify-between px-6 py-4">
                      <div className="">
                        <div className="mb-2 cursor-pointer font-sans text-[17px]  font-bold text-[#104d83]">
                          {item.title}
                        </div>
                        <div className="mb-2 font-sans text-[14px] text-[#736968]">
                          {item.type}
                        </div>
                      </div>
                      <div className="flex">
                        <MdKeyboardArrowRight className="text-[30px] text-[#104d83] " />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center mt-6">
        <Pagination
          key={`page-${currentPage}`}
          showSizeChanger
          pageSizeOptions={["8", "16", "24", "100"]}
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
      <Modal
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
        width={600}
      >
        <div className="relative mt-8">
          <div className="relative">
            <div className="absolute ">
              <button
                className=" "
                onClick={() => {
                  slider.current.prev();
                }}
              >
                <LeftOutlined />
              </button>
            </div>
            <div>
              <Carousel
                ref={slider}
                dotPosition="bottom"
                prevArrow={
                  <Button
                    onClick={() => {
                      slider.current.prev();
                    }}
                  >
                    <LeftOutlined />
                  </Button>
                }
              >
                {image &&
                  image.map((item) => (
                    <div>
                      {item.type.includes("video") ? (
                        <div className="h-full w-full bg-gray-200">
                          <video controls>
                            <source src={item.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ) : (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-[500px] h-[250px]"
                        />
                      )}
                    </div>
                  ))}
              </Carousel>
            </div>
            <div className="flex mt-5">
              <div className="mb-2 font-sans text-[20px] text-[#736968]">
                Description:
              </div>

              <div className="mb-2 font-sans text-[20px] text-[#000] ml-2 w-[400px]">
                {desc}
              </div>
            </div>

            <div className="absolute top-28 left-0">
              <button
                className="text-xl"
                onClick={() => {
                  slider.current.prev();
                }}
              >
                <LeftOutlined className="text-4xl font-extrabold" />
              </button>
            </div>
            <div className="absolute  top-28 right-0">
              <button
                className="text-xl"
                onClick={() => {
                  slider.current.next();
                }}
              >
                <RightOutlined className="text-4xl font-extrabold" />
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShowAward;
