import React, { useState } from "react";
import PropTypes from "prop-types";
import { withContext } from "Context";
import { signInSuccessAction } from "Actions/authActions";
import { PageMetaTags } from "Common";
import { Link, useHistory } from "react-router-dom";
import { Form, Input, notification, Button } from "antd";
import { loginUser } from "../../../../services/user";
import "./index.less";
import loginImage from "./logo-blue.png";
const LoginForm = ({ signInSuccess }) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    <React.Fragment>
      <PageMetaTags title="Login" />
      <section className="login-wrapper  ">
        <div className="container mx-auto grid lg:grid-cols-2">
          <div className=" flex justify-center mt-20 lg:mt-40 mx-5">
            <img
              src={loginImage}
              alt="login"
              className="lg:w-[450px] lg:h-60 xl:w-[700px] "
            />
          </div>

          <div className=" flex justify-center mx-12 md:mx-0 mt-28 ">
            <div className="login-inner text-center">
              <figure>
                <div class="text-block-8 ">
                  <span class=" text-[#fa6210] text-[35px] ">IFA</span>{" "}
                  <span className="text-[35px]">ADMIN</span>
                </div>
              </figure>
              <h1 className="page-heading">Login</h1>
              <Form
                onFinish={(values) => {
                  setLoading(true);

                  loginUser({ body: values })
                    .then((res) => {
                      notification.success({ message: "Login successful" });
                      setLoading(false);
                      localStorage.setItem("accessToken", res.accessToken);
                      signInSuccess(res.user);

                      history.push("/dashboard");
                    })
                    .catch((err) => {
                      setLoading(false);

                      notification.error({ message: err.data.error.message });
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
                        message: "Please enter email to proceed",
                      },
                    ]}
                  >
                    <Input size="large" type="email" placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="form-group-custom">
                  <div className="font-medium text-gray-800 flex justify-start mb-2 text-[15px]">
                    Password
                  </div>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password",
                      },
                    ]}
                  >
                    <Input type="password" placeholder="Password" />
                  </Form.Item>
                </div>

                <div style={{ width: "100%" }} className="form-footer ">
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={loading}
                    style={{
                      backgroundColor: "#fa6210",
                      borderColor: "#fa6210",
                      color: "white",
                    }}
                    className="button-style-fullwidth-button mb-40"
                  >
                    {loading ? "Loading..." : "Login"}
                  </Button>
                </div>
                <div className="mt-[-80px]">
                  <Link
                    to="/forgot-password"
                    className="text-[#7D94BF] font-semibold -mt-20 hover:text-[#fa6210]  md:mt-10"
                  >
                    <div className="text-[16px]  ">Forgot password?</div>
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

LoginForm.propTypes = {
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
  LoginForm
);
