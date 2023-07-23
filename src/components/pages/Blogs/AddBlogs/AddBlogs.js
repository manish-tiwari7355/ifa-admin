import React, { useEffect, useState } from "react";
import {
  Form,
  Skeleton,
  Row,
  Col,
  Input,
  Select,
  notification,
  Upload,
  Modal,
  DatePicker,
  Button,
  message,
} from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import PropTypes from "prop-types";
import { withContext } from "Context";
import { useHistory } from "react-router-dom";
import {} from "../../../../services/competition";
import { Breadcrumb } from "antd";
import { PageMetaTags } from "Common";
import { Link } from "react-router-dom";
import axios from "axios";
import { categorieName } from "../../../../store/categorieName";
import { useAtom } from "jotai";
import { ReactVideoPlayer } from "video-player-for-react";
import "video-player-for-react/dist/index.css";

const AddBlogs = ({ user, feeds }) => {
  const { Option } = Select;
  const history = useHistory();
  const [push, setPush] = useAtom(categorieName);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [onPreview, setOnPreview] = useState("");
  const [getLoading, setGetLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  console.log("MultipleImage:>>", image);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const onChange = (date, dateString) => {
    // console.log(date, dateString);
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
    showModal();
    const newURL = {
      ...file,
      url: URL.createObjectURL(file),
    };
    // console.log("newURL", newURL);
    setOnPreview(newURL.url);
    // console.log("object :>> ", newURL.url);
  };

  const onFinish = (values) => {
    setLoading(true);
    const formData = new FormData();

    // image.forEach((file, id) => {
    //   formData.append(`files${id}`, file);
    // });

    if (image.length > 0) {
      image.forEach((file, id) => {
        formData.append(`files${id}`, file);
      });
    } else {
      message.warning("Upload field cannot be empty");
      setLoading(false);
      return false;
    }

    formData.append("title", form.getFieldValue("title"));
    formData.append("category", form.getFieldValue("category"));
    formData.append("description", form.getFieldValue("description"));
    formData.append("name", form.getFieldValue("name"));
    formData.append("date", form.getFieldValue("date"));
    formData.append("altDescription", form.getFieldValue("altDescription"));
    axios({
      method: "post",
      url: "/blog/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((resp) => {
        setLoading(false);

        // console.log(resp);
        notification.success({
          message: `${form.getFieldValue("category")} added successfully!`,
        });
        history.push("/blogs");

        setPush(form.getFieldValue("category"));
      })
      .catch((err) => {
        setLoading(false);

        console.log(err);
      });
  };

  return (
    <>
      <div className="content-panel mx-4 md:mx-0">
        <div className="profile-wrapper">
          <PageMetaTags title="Add Blogs" />
          <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>
              <Link to="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/blogs">Blogs</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Blogs</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-heading">Add Blogs</h1>
          <Skeleton loading={getLoading}>
            <Form form={form}>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">
                    Blog Title
                  </div>
                  <Form.Item name="title">
                    <Input
                      size="large"
                      type="text"
                      placeholder="Enter Name"
                      required
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">Category</div>
                  <Form.Item
                    name="category"
                    rules={[
                      {
                        message: `Category is required`,
                      },
                    ]}
                  >
                    <Select size="large" placeholder="Select Category">
                      <Option value="events">Events</Option>
                      <Option value="activities">Activities</Option>
                      <Option value="tour">Tours</Option>
                      <Option value="news">News</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">Name</div>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        message: `Enter Name`,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="text"
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
                    <DatePicker onChange={onChange} size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={false}
              >
                {/* <img src={onPreview} alt="image_url1" /> */}
                <div className="mt-10 flex justify-center">
                  <iframe
                    width="800px"
                    height="500px"
                    src={onPreview}
                    title="audio"
                    // type="video/mp4"
                    // poster="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg"
                  />
                </div>
              </Modal>

              <div className="font-medium text-gray-800 mb-2 mt-4">
                Add description
              </div>
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                    message: `Add  description`,
                  },
                ]}
              >
                <Input.TextArea
                  autoSize={{ minRows: 6, maxRows: 16 }}
                  placeholder="Add  description"
                  required
                />
              </Form.Item>
              <div>
                <div className="font-medium text-gray-800 mt-4">
                  Upload Image of your blog
                </div>
              </div>
              <Form.Item>
                <Upload
                  listType="picture"
                  multiple={true}
                  accept=".jpg, .png, .jpeg, .tiff|image/*,video/mp4,video/x-m4v,video/*"
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
                    createURL(file);
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
                    <div className="ml-2"> Upload Image</div>
                  </button>
                </Upload>
              </Form.Item>

              <div className="flex justify-end mt-4">
                <Button
                  loading={loading}
                  type="primary"
                  size="large"
                  onClick={() => onFinish()}
                  className="bg-[#FA6210] h-12 px-5 font-semibold hover:bg-[#15538B]  rounded-md text-white"
                >
                  Add Blog
                </Button>
              </div>
            </Form>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

AddBlogs.propTypes = {
  AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddBlogs
);
