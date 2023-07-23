/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Form, Skeleton, Row, Col, Input, Upload, notification } from "antd";
import { AiOutlineUpload } from "react-icons/ai";

import { Modal } from "antd";
import { useHistory, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PageMetaTags } from "Common";
// import { Link } from "react-router-dom";
import axios from "axios";
import { DatePicker } from "antd";

const Awards = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState(null);
  const [form] = Form.useForm();
  const history = useHistory();

  const [getLoading, setGetLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [year, setYear] = useState(null);

  const [image, setImage] = useState("");
  const [onPreview, setOnPreview] = useState("");

  // const formData = new FormData();

  const createURL = (file) => {
    showModal();
    const newURL = {
      ...file,
      url: URL.createObjectURL(file),
    };
    setOnPreview(newURL.url);
  };
  function updateImage(file) {
    setImage((prev) => [...prev, file]);
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
  const onFinish = (values) => {
    const formData = new FormData();
    if (image) {
      image.map((item) => {
        return formData.append("files", item);
      });
    }
    formData.append("title", form.getFieldValue("title"));
    formData.append("type", form.getFieldValue("type"));
    formData.append("year", year);
    formData.append("date", date);
    formData.append("description", form.getFieldValue("description"));

    axios({
      method: "post",
      url: "/awards/create",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((resp) => {
        notification.success({ message: "Added successfully!" });
        form.resetFields();
        setImage([]);
        history.push("/awards");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (date, dateString) => {
    setDate(date);
    setYear(parseInt(dateString.slice(0, 4)));
    // console.log("dateString", );
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
              <Link to="/awards">Awards</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Award</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-heading">Add Award</h1>
          <Skeleton loading={getLoading}>
            <Form form={form}>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">Title</div>
                  <Form.Item name="title">
                    <Input
                      size="large"
                      type="text"
                      value={form.getFieldValue("")}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Name"
                      required
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">Type</div>
                  <Form.Item
                    name="type"
                    rules={[
                      {
                        message: `Type is required`,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter Type"
                      required
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">Date</div>
                  <Form.Item name="year">
                    <DatePicker size="large" onChange={onChange} required />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
                </Col>
              </Row>
              <div>
                <div className="font-medium text-gray-800 mt-4">
                  Upload Image of Award
                </div>
              </div>
              <Form.Item>
                <Upload
                  listType="picture"
                  multiple={true}
                  accept=".jpg, .png, .jpeg, .tiff|image/* ,video/mp4,video/x-m4v,video/*"
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
              <Modal
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
                footer={false}
              >
                <img src={onPreview} title="image_url" />
              </Modal>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => onFinish()}
                  className="bg-[#FA6210] h-12 px-5 font-semibold hover:bg-[#15538B]  rounded-md text-white"
                >
                  Add Award
                </button>
              </div>
            </Form>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

export default Awards;
