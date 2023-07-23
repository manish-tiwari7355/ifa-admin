import React, { useState } from "react";
import {
  Form,
  Skeleton,
  Row,
  Col,
  Input,
  Select,
  notification,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import PropTypes from "prop-types";
import { withContext } from "Context";
import { useHistory } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PageMetaTags } from "Common";
import { Link } from "react-router-dom";
import axios from "axios";

const AddVideo = () => {
  const { Option } = Select;
  const history = useHistory();
  const [form] = Form.useForm();
  const [getLoading, setGetLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    console.log("values", values);
    const formData = new FormData();

    formData.append("description", form.getFieldValue("description"));
    formData.append("link", form.getFieldValue("link"));

    axios({
      method: "post",
      url: "/video/add",
      data: values,
      headers: {
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((resp) => {
        setLoading(false);
        notification.success({ message: "Added successfully!" });
        form.resetFields();
        history.push("/videos");
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
          <PageMetaTags title="Add Books" />
          <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>
              <Link to="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/videos">Videos</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Add Video</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-heading">Add Video</h1>
          <Skeleton loading={getLoading}>
            <Form form={form} onFinish={onFinish}>
              <Row gutter={[16, 8]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">
                    Description
                  </div>
                  <Form.Item name="description">
                    <Input
                      size="large"
                      type="text"
                      // value={form.getFieldValue("")}
                      // onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add Description"
                      required
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                  <div className="font-medium text-gray-800 mb-2">Link</div>
                  <Form.Item
                    name="link"
                    rules={[
                      {
                        message: `Type is required`,
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="text"
                      placeholder="Add Link"
                      required
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-start mt-10">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-[#FA6210] h-12 px-5 font-semibold hover:bg-[#15538B]  rounded-md text-white"
                >
                  Add Video
                </Button>
              </div>
            </Form>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

AddVideo.propTypes = {
  //   AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  AddVideo
);
