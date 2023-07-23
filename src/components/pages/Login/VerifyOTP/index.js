import React, { useState } from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { signInSuccessAction } from "Actions/authActions";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import { Col, Form, notification, Row } from "antd";
import { forgotPassword, verifyOTP } from "../../../../services/user";
import loginImage from "../LoginForm/logo-blue.png";
import axios from "axios";

const VerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    const token = window.btoa(
      localStorage.getItem("email") + "-" + localStorage.getItem("otp")
    );
    axios
      .post(`/auth/verifyOtp/${token}`, values, {})
      .then((resp) => {
        console.log(resp);
        history.push("/update-password");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <PageMetaTags title="Forgot Password" />
      <section className="login-wrapper">
        <div className="container mx-auto grid lg:grid-cols-2">
          <div className=" flex justify-center mt-20 lg:mt-28 xl:mt-20  mx-5">
            <img
              src={loginImage}
              alt="login"
              className="lg:w-[450px] lg:h-60 xl:w-[700px] "
            />
          </div>

          <div className="login-holder mx-12 md:mx-0 ">
            <div className="login-inner text-center">
              <figure>
                {/* <img
                      className="m-auto"
                      src={require("Assets/images/logo-small.png")}
                      alt="logo"
                    /> */}
              </figure>
              <h1 className="page-heading">Verify OTP</h1>

              <Form
                form={form}
                onFinish={(values) => {
                  setLoading(true);

                  //   verifyOTP({ body: values })
                  //     .then((res) => {
                  //       setLoading(false);
                  //       // form.resetFields();
                  //       // history.replace("/update-password");
                  //       history.push(
                  //         // `/update-password?token=${res.token}&email=${values.email}`
                  //         "/verify-Otp"
                  //       );
                  //       notification.success({
                  //         message: "OTP sent successfully!",
                  //       });
                  //     })
                  //     .catch((err) => {
                  //       setLoading(false);
                  //       if (err && err.data && err.data.message) {
                  //         notification.error({
                  //           message: err.data.message,
                  //         });
                  //       } else {
                  //         notification.error({
                  //           message: "Failed to send OTP ",
                  //         });
                  //       }
                  //     })
                  //     .finally(() => setLoading(false));
                  // }}
                }}
                autoComplete="off"
              >
                <div className="form-group-custom">
                  <div className="font-medium text-gray-800 flex justify-start mb-2 text-[15px]">
                    OTP
                  </div>
                  <Form.Item
                    name="number"
                    rules={[
                      {
                        required: true,
                        message: "Please enter OTP",
                      },
                    ]}
                  >
                    <input
                      type="number"
                      placeholder="Please enter OTP"
                      className="input-style border h-10 pl-5  rounded"
                    />
                  </Form.Item>
                </div>
                <div className="form-footer w-full">
                  <input
                    type="submit"
                    onClick={() => onFinish()}
                    disabled={loading}
                    className="rounded  text-white py-2 font-semibold cursor-pointer hover:bg-[#EAF0F7] hover:text-[#fa6210] bg-[#fa6210] button-style-fullwidth-button"
                    value={loading ? "Loading..." : "Submit"}
                  />
                  <div className=" text-[15px] py-4 text-gray-500 font-semibold">
                    Or
                  </div>
                  <Link to="/login">
                    <button className="rounded text-[#fa6210] w-full py-2 font-semibold cursor-pointer hover:bg-[#fa6210] hover:text-[#EAF0F7] bg-[#EAF0F7] button-style-fullwidth-button">
                      Login
                    </button>
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default VerifyOtp;
