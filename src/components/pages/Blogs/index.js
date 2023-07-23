/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { Pagination, Form, Select, Breadcrumb, Tabs } from "antd";
import SearchNotFound from "../../../assets/images/empty-search-contact.png";
import { withContext } from "Context";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";

import { getCategoriesAction } from "Actions/categoryActions";
import { PageMetaTags } from "../../common";
import { categoryTypes } from "../../../utils/index";
import axios from "axios";
import BlogCard from "./BlogCard";

import BlogImage from "../../../assets/images/Blog.jpg";

import { SearchOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import { useAtom } from "jotai";
import { categorieName } from "../../../store/categorieName";
const cookies = new Cookies();

const Blogs = () => {
  const categoriesTypeList = categoryTypes();
  const history = useHistory();
  const { TabPane } = Tabs;
  const [push] = useAtom(categorieName);
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(5);
  const [startIndex, setStartIndex] = useState(0);

  const [type, setType] = useState("");
  const [card, setCard] = useState([]);
  const [data, seaxiostData] = useState([]);
  const [totalCount, setTotalCount] = useState(null);

  const [search, setSearch] = useState("");

  const [categorie, setCategorie] = useState();
  const [image, setImage] = useState("");
  const action = (value) => {
    setKeyword(value);
  };
  const { Option } = Select;
  const debounceSearch = debounce(action, 400);
  const length = card.length;

  async function getData() {
    await axios
      .get(
        `/blog?category=${categorie}&keyword=${search}&viewSize=${viewSize}&startIndex=${startIndex}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((resp) => {
        setCard(resp.data.blogs);
        setTotalCount(resp.data.totalCount);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    setCategorie(push);
  }, [push]);
  useEffect(() => {
    getData();
  }, [categorie, search, startIndex, viewSize]);
  const handleCange = (value) => {
    setCategorie(value);
  };

  function handleChangePagination(current, size) {
    setStartIndex(size * (current - 1));
    setCurrentPage(current);
  }
  // console.log("card", card);

  return (
    <>
      <div className="content-panel px-4">
        <div className="mx-4">
          <PageMetaTags title="Blogs" />
          <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>
              <Link to="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Blogs</Breadcrumb.Item>
          </Breadcrumb>
          <div className="flex justify-between">
            <h1 className="page-heading">All Blogs</h1>
            <button
              onClick={() => history.push("/blogs/add")}
              className="bg-[#FA6210] h-12 px-5 font-semibold hover:bg-[#15538B]  rounded-md text-white"
            >
              Add Blogs
            </button>
          </div>
          <div className="border-b  -mt-4 mb-8" />
        </div>

        <div className=" mx-4">
          <div className="w-full">
            <Tabs
              onChange={(key) => {
                handleCange(key);
                setSearch("");
              }}
              defaultActiveKey="events"
              activeKey={categorie}
            >
              <TabPane tab="All Blogs" key="">
                <div>
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
                  {card.length === 0 ? (
                    <div className="flex items-center mb-10 justify-center text-center">
                      <div>
                        <p className="text-lg">No Blogs Found !</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="grid gap-y-6">
                    {card.map((item) => {
                      const date = new Date(item.updatedAt.slice(0, 10));

                      const month = date.toLocaleString("default", {
                        month: "long",
                      });
                      const [imageUrl] = item.media;
                      // console.log("item.media[0]", item.media[0].type);
                      // cookies.set("type", item.media[0].type);
                      return (
                        <div key={item._id}>
                          <BlogCard
                            getData={getData}
                            image={(imageUrl && imageUrl.url) || BlogImage}
                            date={
                              date.getDate() +
                              " " +
                              month.slice(0, 3) +
                              " " +
                              date.getFullYear()
                            }
                            blog={item.description}
                            tag=""
                            title={item.title}
                            name={item.name}
                            id={item._id}
                          />
                        </div>
                      );
                    })}
                    <div className="flex justify-center">
                      <Pagination
                        key={`page-${currentPage}`}
                        showSizeChanger
                        pageSizeOptions={["10", "25", "50", "100"]}
                        onShowSizeChange={(e, p) => {
                          setViewSize(p);
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
              </TabPane>
              <TabPane tab="Events" key="events">
                <div>
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

                  {card.length === 0 ? (
                    <div className="flex items-center mb-10 justify-center text-center">
                      <div>
                        <p className="text-lg">No Events Found !</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="grid gap-y-6">
                    {card.map((item) => {
                      const date = new Date(item.updatedAt.slice(0, 10));

                      const month = date.toLocaleString("default", {
                        month: "long",
                      });
                      const [imageUrl] = item.media;

                      return (
                        <div>
                          <BlogCard
                            getData={getData}
                            image={(imageUrl && imageUrl.url) || BlogImage}
                            date={
                              date.getDate() +
                              " " +
                              month.slice(0, 3) +
                              " " +
                              date.getFullYear()
                            }
                            blog={item.description}
                            tag=""
                            title={item.title}
                            name={item.name}
                            id={item._id}
                          />
                        </div>
                      );
                    })}
                    <div className="flex justify-center">
                      <Pagination
                        key={`page-${currentPage}`}
                        showSizeChanger
                        pageSizeOptions={["10", "25", "50", "100"]}
                        onShowSizeChange={(e, p) => {
                          setViewSize(p);
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
              </TabPane>

              <TabPane value="Activities" tab="Activities" key="activities">
                <div>
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
                  {card.length === 0 ? (
                    <div className="flex items-center mb-10 justify-center text-center">
                      <div>
                        <p className="text-lg">No Activites Found !</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="grid gap-y-6">
                    {card.map((item) => {
                      const date = new Date(item.updatedAt.slice(0, 10));
                      const [imageUrl] = item.media;
                      const month = date.toLocaleString("default", {
                        month: "long",
                      });

                      return (
                        <BlogCard
                          getData={getData}
                          image={(imageUrl && imageUrl.url) || BlogImage}
                          typeCheck={
                            item.media.length > 0 ? item.media[0].type : ""
                          }
                          date={
                            date.getDate() +
                            " " +
                            month.slice(0, 3) +
                            " " +
                            date.getFullYear()
                          }
                          blog={item.description}
                          tag=""
                          title={item.title}
                          name={item.name}
                          id={item._id}
                        />
                      );
                    })}
                    <div className="flex justify-center">
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
              </TabPane>

              <TabPane tab="Tours" key="tour">
                <div>
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
                  {card.length === 0 ? (
                    <div className="flex items-center mb-10 justify-center text-center">
                      <div>
                        <p className="text-lg">No Tours Found !</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="grid gap-y-6">
                    {card.map((item) => {
                      const date = new Date(item.updatedAt.slice(0, 10));
                      const [imageUrl] = item.media;
                      const month = date.toLocaleString("default", {
                        month: "long",
                      });

                      return (
                        <BlogCard
                          getData={getData}
                          image={(imageUrl && imageUrl.url) || BlogImage}
                          date={
                            date.getDate() +
                            " " +
                            month.slice(0, 3) +
                            " " +
                            date.getFullYear()
                          }
                          blog={item.description}
                          tag=""
                          title={item.title}
                          name={item.name}
                          id={item._id}
                        />
                      );
                    })}
                    <div className="flex justify-center">
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
              </TabPane>
              <TabPane tab="News" key="news">
                <div>
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
                  {card.length === 0 ? (
                    <div className="flex items-center mb-10 justify-center text-center">
                      <div>
                        <p className="text-lg">No News Found !</p>
                        <img
                          className="ml-16 "
                          src={SearchNotFound}
                          alt="No categories found!"
                          style={{ height: "100px" }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="grid gap-y-6">
                    {card.map((item) => {
                      const date = new Date(item.updatedAt.slice(0, 10));
                      const [imageUrl] = item.media;
                      const month = date.toLocaleString("default", {
                        month: "long",
                      });

                      return (
                        <div>
                          <BlogCard
                            getData={getData}
                            image={(imageUrl && imageUrl.url) || BlogImage}
                            date={
                              date.getDate() +
                              " " +
                              month.slice(0, 3) +
                              " " +
                              date.getFullYear()
                            }
                            blog={item.description}
                            tag=""
                            title={item.title}
                            name={item.name}
                            id={item._id}
                          />
                        </div>
                      );
                    })}
                    <div className="flex justify-center">
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
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

Blogs.propTypes = {
  Categories: PropTypes.func.isRequired,
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
  Blogs
);
