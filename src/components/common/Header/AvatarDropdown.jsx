// import { getIntials } from "@/utils/utils";
import {
  CaretDownFilled,
  LogoutOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, Spin } from "antd";
import React from "react";
// import { history, connect } from "umi";
import HeaderDropdown from "../HeaderDropdown";
import styles from "./index.less";

class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === "logout") {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: "login/logout",
        });
      }
      return;
    }

    // history.push(`/${key}`);
  };

  render() {
    const { user } = this.props;
    const menuHeaderDropdown = (
      <Menu
        className={"menu"}
        selectedKeys={[]}
        onClick={(val) => {
          this.onMenuClick(val);
        }}
      >
        <Menu.Item key="profile">
          <div className="flex justify-center"></div>

          <div className="mt-2 text-center">
            <div className="font-medium text-blue-900 text-lg capitalize">
              {/* {user?.personalDetails?.displayName} */}
            </div>
            <div className="text-xs text-gray-700">
              {/* {user?.personalDetails?.email} */}
            </div>
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="upload/UploadPublicHolidays">
          <UploadOutlined /> Upload public holidays
        </Menu.Item>
        <Menu.Item key="logout">
          <LogoutOutlined />
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      <HeaderDropdown trigger="click" overlay={menuHeaderDropdown}>
        <div className="flex items-center cursor-pointer uppercase">
          {/* <Avatar
            size="large"
            src={
              user?.personalDetails?.avatarUrl ||
              user?.personalDetails?.photoUrl
            }
            style={{ background: "#ffffff" }}
          > */}
          <span className="text-black">
            {/* {user && getIntials(user?.personalDetails?.displayName)} */}gb
          </span>
          {/* </Avatar> */}
          <div className="ml-2 flex items-center text-white hiddenSmall">
            <div className="font-medium text-lg capitalize">
              {/* {user?.personalDetails?.displayName} */}rrishab
              <CaretDownFilled className="mx-2 text-white" />
            </div>
          </div>
        </div>
      </HeaderDropdown>
    );
  }
}

export default AvatarDropdown;
