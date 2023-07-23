/* eslint-disable no-unused-vars */
import { Select, Breadcrumb } from "antd";

import { withContext } from "Context";
import React, { useState } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";

import { getCategoriesAction } from "Actions/categoryActions";
import { PageMetaTags } from "../../common";

import profileImage from "../../../assets/images/profile.png";

const Profile = ({ user }) => {
  const [keyword, setKeyword] = useState();

  const action = (value) => {
    setKeyword(value);
  };
  const { Option } = Select;

  const debounceSearch = debounce(action, 400);

  return (
    <div className="content-panel mx-4">
      <PageMetaTags title="Profile" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Profile</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex justify-between">
        <h1 className="page-heading">Profile</h1>

      </div>
      <div className="border-b -mt-4 mb-8" />
      <div className="bg-white pt-10 pb-20 rounded-xl px-10  shadow-md">
        <div className="flex">
          <div className="w-20">
            <img src={profileImage} alt="profile_image" />
          </div>
          <div className="text-3xl ml-5 mt-4 font-semibold">{user.name}</div>
        </div>
        <div className="border-b mt-10  border-gray-400 mb-8" />
        <div className="flex justify-center md:justify-start">
          <div className="grid gap-y-10 xl:gap-x-10 lg:grid-cols-2 xl:grid-cols-3">
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">Name:</div>
              <div className="text-2xl font-semibold ">
                &nbsp;&nbsp;{user.name}
              </div>
            </div>
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">Email:</div>
              <div className="text-2xl font-semibold ">
                &nbsp;&nbsp;{user.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
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
  Profile
);
