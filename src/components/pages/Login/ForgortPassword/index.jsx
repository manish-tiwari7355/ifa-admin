import React, { useState } from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { signInSuccessAction } from "Actions/authActions";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import { Form, notification } from "antd";

import { forgotPassword } from "../../../../services/user";
import loginImage from "../LoginForm/logo-blue.png";
import axios from "axios";

const ForgotPassword = ({ signInSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("forgotpassword");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(null);

  const [form] = Form.useForm();
  const [reset] = Form.useForm();
  const [verify] = Form.useForm();
  const onFinish = (values) => {
    const token = window.btoa(email + "-" + otp);
    axios
      .post(`/auth/verifyOtp/${token}`, values, {})
      .then((resp) => {
        setStep("resetPassword");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const resetPassword = (values) => {
    if (
      reset.getFieldValue("password") ===
      reset.getFieldValue("password_confirmation")
    ) {
      axios
        .post(
          `/auth/resetPassword`,
          {
            email: email,
            password: reset.getFieldValue("password"),
          },
          {}
        )
        .then((resp) => {
          history.push("/login");
          notification.success({
            message: "Password reset successfully!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          {step === "forgotpassword" ? (
            <div className="login-holder mx-12 md:mx-0 ">
              <div className="login-inner text-center">
                <figure></figure>
                <h1 className="page-heading">Forgot Password</h1>

                <Form
                  form={form}
                  onFinish={(values) => {
                    setLoading(true);
                    forgotPassword({ body: values })
                      .then((res) => {
                        setLoading(false);
                        setOtp(res.otp);
                        setEmail(values.email);
                        setStep("verifyOpt");
                        notification.success({
                          message:
                            "The password update link successfully sent!",
                        });
                      })
                      .catch((err) => {
                        setLoading(false);
                        if (err && err.data && err.data.message) {
                          notification.error({
                            message: err.data.message,
                          });
                        } else {
                          notification.error({
                            message: "Failed to send reset password link",
                          });
                        }
                      })
                      .finally(() => setLoading(false));
                  }}
                  autoComplete="off"
                >
                  <div className="form-group-custom">
                    <div className="font-medium text-gray-800 flex justify-start mb-2 text-[15px]">
                      Email
                    </div>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your email",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <input
                        type="email"
                        placeholder="Email"
                        className="input-style"
                      />
                    </Form.Item>
                  </div>
                  <div className="form-footer w-full">
                    <input
                      type="submit"
                      disabled={loading}
                      className="rounded text-white py-2 font-semibold cursor-pointer hover:bg-[#EAF0F7] hover:text-[#fa6210] bg-[#fa6210] button-style-fullwidth-button"
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
          ) : null}
          {step === "verifyOpt" ? (
            <div className="login-holder mx-12 md:mx-0 ">
              <div className="login-inner text-center">
                <figure></figure>
                <h1 className="page-heading">Verify OTP</h1>

                <Form
                  form={verify}
                  onFinish={(values) => {}}
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
                      value={loading ? "Loading..." : "Verify OTP"}
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
          ) : null}
          {step === "resetPassword" ? (
            <div className="login-holder mx-12 md:mx-0 ">
              <div className="login-inner text-center">
                <h1 className="page-heading">Reset Password</h1>

                <Form
                  form={reset}
                  onFinish={(values) => {
                    setLoading(true);
                  }}
                >
                  <div className="form-group-custom">
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your password",
                        },
                      ]}
                    >
                      <input
                        type="password"
                        className="input-style"
                        placeholder="Password"
                      />
                    </Form.Item>
                  </div>
                  <div className="form-group-custom">
                    <Form.Item
                      name="password_confirmation"
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "The two passwords that you entered do not match!"
                              )
                            );
                          },
                        }),
                      ]}
                    >
                      <input
                        type="password"
                        className="input-style"
                        placeholder="Confirm Password"
                      />
                    </Form.Item>
                  </div>
                  <div className="form-footer">
                    <input
                      type="submit"
                      onClick={() => resetPassword()}
                      disabled={loading}
                      className="rounded  text-white py-2 font-semibold cursor-pointer hover:bg-[#EAF0F7] hover:text-[#fa6210] bg-[#fa6210] button-style-fullwidth-button"
                      value={loading ? "Loading..." : "Reset Password"}
                    />
                    <span className="text-divider">Or</span>
                    <Link
                      to="/login"
                      className="button-style button-style-gray-btm button-style-fullwidth-button"
                    >
                      Login
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </React.Fragment>
  );
};

ForgotPassword.propTypes = {
  signInSuccess: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withContext(
  ([, dispatch]) => ({
    // actions
    signInSuccess: (data) => signInSuccessAction(data, dispatch),
  }),
  ForgotPassword
);
