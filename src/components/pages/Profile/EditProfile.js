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

import { getCategoriesAction } from "Actions/categoryActions";
import { PageMetaTags } from "../../common";
import { categoryTypes } from "../../../utils/index";
import profileImage from "../../../assets/images/profile.png";
import { BiCheckDouble } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
const EditProfile = ({ user, getCategoriesFunc, categories }) => {
  const categoriesTypeList = categoryTypes();
  const history = useHistory();
  const { TabPane } = Tabs;
  const { Search } = Input;
  const [form] = Form.useForm();
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [categoryModal, setCategoryModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryRecord, setCategoryRecord] = useState({});
  const [type, setType] = useState("");
  const action = (value) => {
    setKeyword(value);
  };
  const { Option } = Select;
  const debounceSearch = debounce(action, 400);
  //   const confirm = (data) => {
  //     deleteCategory({ pathParams: { id: data } })
  //       .then((res) => {
  //         notification.success({
  //           message: "Category deleted successfully",
  //         });
  //         getAllCategories();
  //       })
  //       .catch((err) => {
  //         if (err && err.status === 400) {
  //           notification.error({
  //             message: "Failed to delete category",
  //           });
  //         } else {
  //           notification.error({
  //             message: `${err.data.error.message} please remove or change the blog category from feed.`,
  //           });
  //         }
  //       });
  //   };

  //   useEffect(() => {
  //     if (categoryModal) {
  //       if (categoryRecord) {
  //         form.setFieldsValue({
  //           categoryType: categoryRecord.categoryType,
  //           categoryName: categoryRecord.name,
  //         });
  //       }
  //     }
  //   }, [categoryRecord]);

  //   const getAllCategories = (value) => {
  //     const body = {
  //       categoryType: value ? value : "resources",
  //     };
  //     getCategories({ query: body })
  //       .then((res) => {
  //         getCategoriesFunc(res.categories);
  //       })
  //       .catch((err) => {
  //         setLoading(false);
  //         if (err && err.status === 400) {
  //           notification.error({
  //             message: "Failed to get categories",
  //           });
  //         } else {
  //           notification.error({
  //             message: `${err.data.error.message}`,
  //           });
  //         }
  //       });
  //   };

  //   useEffect(
  //     (value) => {
  //       getAllCategories(value);
  //     },
  //     [user]
  //   );

  return (
    <div className="content-panel mx-4">
      <PageMetaTags title="Add Blogs" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/profile">Profile</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="page-heading">Edit Profile</h1>
        <Button
          size="large"
          type="primary"
          onClick={(key) => history.push("/profile")}
          style={{ backgroundColor: "#15538b", borderColor: "#15538b" }}
        >
          <div className="flex">
            <div> Save</div> <BiCheckDouble className="text-3xl ml-2" />
          </div>
        </Button>
      </div>
      <div className="border-b -mt-4 mb-8 flex justify-center" />
      <div className="bg-white pt-10 pb-20 rounded-xl px-10 shadow-md">
        <div className="">
          <div className="flex justify-center md:justify-start">
            <div className="md:flex">
              <div className="w-20 ml-10 md:ml-0">
                <img src={profileImage} alt="profile image" />
              </div>
              <button className="border hover:bg-[#15538b] hover:text-white h-12 px-5 mt-5 md:ml-10 rounded-md border-gray-400 font-semibold">
                {" "}
                <div className="flex">
                  Change Photo
                  <FiEdit className="ml-2 text-xl mt-1" />
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="border-b mt-10 border-gray-400 mb-8" />
        <Form>
          <Row gutter={[16, 8]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item
                name="Name"
                label={
                  <p className="font-medium text-lg text-gray-800">Name</p>
                }
              >
                <Input size="large" type="text" placeholder="Enter Name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item
                name="Email"
                label={
                  <p className="font-medium  text-lg text-gray-800">Email</p>
                }
              >
                <Input
                  size="large"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <Form.Item
                name="Phone Number"
                label={
                  <p className="font-medium text-lg text-gray-800">
                    Phone Number
                  </p>
                }
              >
                <Input
                  size="large"
                  type="number"
                  placeholder="Enter your number"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

EditProfile.propTypes = {
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
  EditProfile
);
