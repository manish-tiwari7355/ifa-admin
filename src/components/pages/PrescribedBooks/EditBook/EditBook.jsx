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
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import PropTypes from "prop-types";
import { withContext } from "Context";
import { useHistory, useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PageMetaTags } from "Common";
import { Link } from "react-router-dom";
import axios from "axios";

const EditBook = () => {
  const { recordId } = useParams();
  console.log("recordId", recordId);

  const { Option } = Select;
  const history = useHistory();
  const [form] = Form.useForm();
  const [getLoading, setGetLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pdf, setPdf] = useState([]);

  function updateImage(file) {
    setPdf([file]);
  }

  const getSingleBook = () => {
    axios
      .get(`/book/${recordId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        console.log("res", res);
        const file = res.data.data.media[0];
        console.log("file.name", file.name);
        setPdf([file]);
        form.setFieldsValue({
          classes: res.data.data.classes,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSingleBook();
  }, []);

  const onFinish = (values) => {
    setLoading(true);

    const formData = new FormData();

    if (pdf.length === 0) {
      message.warning("Upload field cannot be empty");
      setLoading(false);
      return; // prevent form submission
    }
    formData.append("classes", values.classes);

    pdf.forEach((file) => {
      formData.append("files", file);
    });

    axios({
      method: "put",
      url: `/book/${recordId}`,
      data: formData,
    })
      .then((resp) => {
        console.log("resp", resp);
        message.success("Book updated successfully");
        history.push("/prescribedBooks");
        setLoading(false);
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
          <PageMetaTags title="Edit Book" />
          <Breadcrumb style={{ marginBottom: 20 }}>
            <Breadcrumb.Item>
              <Link to="/dashboard">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/prescribedBooks">Prescribed Books</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Edit Book</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="page-heading">Edit Book</h1>
          <Skeleton loading={getLoading}>
            <Form form={form} onFinish={onFinish}>
              <Row gutter={[16, 8]}>
                {/* <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">
                    Name of the Book
                  </div>
                  <Form.Item name="bookName">
                    <Input
                      size="large"
                      type="text"
                      placeholder="Enter Name of the book"
                      required
                    />
                  </Form.Item>
                </Col> */}
                <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">Class</div>
                  <Form.Item
                    name="classes"
                    rules={[
                      {
                        required: true,
                        message: "Please add book name!",
                      },
                    ]}
                  >
                    <Select size="large" placeholder="Select Class">
                      <Option value="Class 1">Class 1</Option>
                      <Option value="Class 2">Class 2</Option>
                      <Option value="Class 3">Class 3</Option>
                      <Option value="Class 4">Class 4</Option>
                      <Option value="Class 5">Class 5</Option>
                      <Option value="Class 6">Class 6</Option>
                      <Option value="Class 7">Class 7</Option>
                      <Option value="Class 8">Class 8</Option>
                      <Option value="Class 9">Class 9</Option>
                      <Option value="Class 10">Class 10</Option>
                      <Option value="Class 11">Class 11</Option>
                      <Option value="Class 12">Class 12</Option>
                      {/* <Option value="Class 11 (Medical)">
                        Class 11 (Medical)
                      </Option>
                      <Option value="Class 11 (Non. Medical)">
                        Class 11 (Non. Medical)
                      </Option>
                      <Option value="Class 11 (Commerce)">
                        Class 11 (Commerce)
                      </Option>
                      <Option value="Class 11 (Arts)">Class 11 (Arts)</Option>
                      <Option value="Class 12 (Medical)">
                        Class 12 (Medical)
                      </Option>
                      <Option value="Class 12 (Non. Medical)">
                        Class 12 (Non. Medical)
                      </Option>
                      <Option value="Class 12 (Commerce)">
                        Class 12 (Commerce)
                      </Option>
                      <Option value="Class 12 (Arts)">Class 12 (Arts)</Option> */}
                    </Select>
                  </Form.Item>
                </Col>

                {/* <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">Subject</div>
                  <Form.Item name="subject">
                    <Input
                      size="large"
                      type="text"
                      placeholder="Enter subject name"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                  <div className="font-medium text-gray-800 mb-2">
                    Publisher
                  </div>
                  <Form.Item name="publisher">
                    <Input
                      size="large"
                      type="text"
                      placeholder="Enter publisher name"
                    />
                  </Form.Item>
                </Col> */}
              </Row>
              <div>
                <div className="font-medium text-gray-800 mt-10 mb-5">
                  Upload pdf of the Book (Less than 100MB)
                </div>
              </div>
              <Form.Item name="pdf">
                <Upload
                  listType="picture"
                  maxCount={1}
                  accept="application/pdf"
                  beforeUpload={(file) => {
                    const isPDF = file.type === "application/pdf";

                    if (!isPDF) {
                      message.error("You can only upload PDF files!");
                    }

                    const isLt100M = file.size / 1024 / 1024 < 100;
                    if (isLt100M) {
                      updateImage(file);
                      return false;
                    } else {
                      message.error("PDF must be smaller than 100MB!");
                    }
                  }}
                  fileList={[...pdf]}
                  onRemove={(file) => {
                    setPdf((prev) =>
                      prev.filter((item) => item.uid !== file.uid)
                    );
                  }}
                >
                  <Button size="large" icon={<UploadOutlined />}>
                    Click to Upload
                  </Button>
                </Upload>
              </Form.Item>

              <div className="flex justify-start mt-10">
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-[#FA6210] h-12 px-5 font-semibold hover:bg-[#15538B]  rounded-md text-white"
                >
                  Update Book
                </Button>
              </div>
            </Form>
          </Skeleton>
        </div>
      </div>
    </>
  );
};

EditBook.propTypes = {
  //   AddGHCAcademy: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([{ user }]) => ({
    user,
  }),
  EditBook
);
