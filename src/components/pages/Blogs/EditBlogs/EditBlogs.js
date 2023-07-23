import React, { useEffect, useState } from "react";
import {
  Form,
  Skeleton,
  Row,
  Col,
  Input,
  Select,
  Upload,
  notification,
  Modal,
  DatePicker,
  message,
} from "antd";
import { AiOutlineUpload } from "react-icons/ai";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { useHistory, useLocation } from "react-router-dom";

import { Breadcrumb } from "antd";
import { PageMetaTags } from "Common";
import { Link } from "react-router-dom";

import axios from "axios";
import moment from "moment";

const EditBlogs = ({ user, feeds }) => {
  const { Option } = Select;
  const history = useHistory();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [getLoading, setGetLoading] = useState(false);
  const [onPreview, setOnPreview] = useState("");
  const location = useLocation();

  const [blogForm] = Form.useForm();
  const [image, setImage] = useState([]);
  console.log("image:>>", image);

  async function getData() {
    await axios
      .get(`/blog/${location.search.replace("?", "")}`, {})
      .then((resp) => {
        console.log(resp.data.blog.date, "resp.data.blog.date");
        blogForm.setFieldsValue({
          title: resp.data.blog.title,
          name: resp.data.blog.title,
          description: resp.data.blog.description,
          altDescription: resp.data.blog.altDescription,
          category: resp.data.blog.category,
          date:
            !!resp.data.blog.date === true
              ? moment(resp.data.blog.date)
              : moment(),
        });
        const blogImages = resp.data.blog.media.map((item) => item);
        setImage(blogImages);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  function updateImage(file) {
    setImage((prev) => [...prev, file]);
  }
  const createURL = (file) => {
    setOnPreview();
    const newURL = {
      ...file,
      url: URL.createObjectURL(file),
    };
    showModal();
    setOnPreview(newURL.url);
  };
  useEffect(() => {
    getData();
  }, []);

  const onFinish = (values) => {
    // const [imageData] = image;
    // console.log("imageData", image);
    const formData = new FormData();

    if (image.length > 0) {
      image.forEach((file, id) => {
        formData.append(`media`, file);
      });
    }

    console.log("image on finish...", image);
    formData.append("title", blogForm.getFieldValue("title"));
    formData.append("category", blogForm.getFieldValue("category"));
    formData.append("description", blogForm.getFieldValue("description"));
    formData.append("name", blogForm.getFieldValue("name"));
    formData.append("date", blogForm.getFieldValue("date"));
    formData.append("altDescription", blogForm.getFieldValue("altDescription"));

    axios({
      method: "put",
      url: `/blog/${location.search.replace("?", "")}`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((resp) => {
        notification.success({ message: "Edited successfully!" });
        history.push("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="content-panel mx-4 md:mx-0">
        <div className="profile-wrapper">
          <PageMetaTags title="Edit Blogs" />
          <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>
              <Link to="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/blogs">Blogs</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit Blog</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-heading">Edit Blog</h1>
          <Skeleton loading={getLoading}>
            <Form form={blogForm}>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">
                    Blog Title
                  </div>
                  <Form.Item name="title">
                    <Input
                      size="large"
                      // defaultValue="asdasdsd"
                      type="text"
                      placeholder="Enter Blog title"
                      required
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">Category</div>
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        message: `Status is required`,
                      },
                    ]}
                  >
                    <Select required size="large" placeholder="Select Category">
                      <Option value="events">Events</Option>
                      <Option value="activities">Activities</Option>
                      <Option value="tour">Tours</Option>
                      <Option value="news">News</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">Name</div>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        message: `Enter short description`,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="text"
                      // defaultValue={data.name}
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">
                    Alt text Image
                  </div>
                  <Form.Item
                    name="altDescription"
                    // rules={[
                    //   {
                    //     message: `Enter Name`,
                    //   },
                    // ]}
                  >
                    <Input
                      size="large"
                      type="text"
                      placeholder="Enter your Alt Text Image"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">Date</div>
                  <Form.Item name="date">
                    <DatePicker
                      onChange={(date, dateString) => {
                        console.log(date, dateString);
                      }}
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div className="font-medium text-gray-800 mt-4">
                Upload Image of your blog
              </div>

              <Form.Item>
                <Upload
                  listType="picture"
                  multiple={true}
                  accept=".jpg, .png, .jpeg, .tiff|image/*"
                  beforeUpload={(content) => {
                    const isLt2M = content.size / 5000 / 5000 < 2;
                    if (isLt2M) {
                      content.flag = true;
                      updateImage(content);
                      return false;
                    } else {
                      notification.error({
                        message: `Can't  Upload file more then 5MB`,
                      });
                    }
                  }}
                  onPreview={(file) => {
                    console.log("file", file);
                    if (file.url) {
                      showModal();
                      setOnPreview(file.url);
                    } else {
                      createURL(file);
                    }
                  }}
                  fileList={[...image]}
                  onRemove={(file) => {
                    // setImage([]);
                    setImage((prev) =>
                      prev.filter((item) => item.uid !== file.uid)
                    );
                  }}
                >
                  <button className="border-dashed  px-28 border-2 border-gray-300  flex  mt-5 py-3 rounded-lg">
                    <AiOutlineUpload style={{ fontSize: "18px" }} />
                    <div className="ml-2"> Update Image</div>
                  </button>
                </Upload>
              </Form.Item>
              <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={false}
              >
                <img src={onPreview} title="image_url2" />
              </Modal>

              <div className="font-medium text-gray-800 my-5">
                {" "}
                Add description
              </div>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: `Enter short description`,
                  },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 6, maxRows: 16 }}
                  placeholder="Add  description"
                  required
                />
              </Form.Item>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => onFinish()}
                  size="large"
                  className="bg-[#FA6210] h-12 px-5 font-semibold hover:bg-[#15538B]  rounded-md text-white"
                >
                  Update Blog
                </button>
              </div>
            </Form>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

EditBlogs.propTypes = {
  AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  EditBlogs
);
