import { withContext } from "Context";
import { signOutSuccessAction } from "Actions/authActions";
import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../services/user";
import { useHistory } from "react-router-dom";
import { getInitials } from "../../../utils";
import { setSelectedSchoolAction } from "../../../store/actions/profileActions";
import logo from "../../pages/Login/LoginForm/logo-blue.png";
import { BsChevronCompactDown } from "react-icons/bs";
import { Avatar, Menu, Spin } from "antd";
import AvatarDropdown from "./AvatarDropdown";
import HeaderDropdown from "../HeaderDropdown";
import {
  CaretDownFilled,
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Header = ({ showSideBar, setShowSideBar, signOutSuccess, user }) => {
  const history = useHistory();
  const onMenuClick = (event) => {
    const { key } = event;

    // if (key === "logout") {
    //   const { dispatch } = this.props;

    //   if (dispatch) {
    //     dispatch({
    //       type: "login/logout",
    //     });
    //   }
    //   return;
    // }
  };
  const menuHeaderDropdown = (
    <Menu className={"menu"} selectedKeys={[]}>
      <Menu.Item key="profile">
        <div className="flex justify-center">
          <div>
            <div className="profile-pic mt-2">
              <Avatar
                style={{
                  background: "#FA6210",
                  color: "white",
                }}
                src={user && user.profile_pic_path && user.profile_pic_path}
              >
                {getInitials(user && user.name)}
              </Avatar>
            </div>

            <div className="text-[15px] font-semibold ml-[-5px] mt-2">
              {user && user.name}
            </div>
          </div>
        </div>

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
        <Link to="/profile">
          <UserOutlined />
          User Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          to="/login"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="text-btm  "
        >
          <div className="flex text-black">
            <LogoutOutlined />

            <div className=" text-[16px] text-black mt-[-5px]">Logout</div>
          </div>
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <header className="header-wrapper ">
      <div>
        <div className="flex items-center">
          <Link to="/dashboard" className="logo">
            <div className="ml-2 text-lg" style={{ color: "#16975f" }}>
              {/* <span className="text-[#15538b] text-2xl font-semibold">IFA</span>{" "}
            <span className="text-[#FA6210] text-2xl font-semibold">
              Academy Admin
            </span> */}
              <div>
                <img src={logo} alt="logo-IFA" className="h-16 " />
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div className="right-side-header">
        <div className="header-profile">
          <div className="profile-menu cursor-pointer" data-toggle="dropdown">
            <HeaderDropdown
              trigger="click"
              overlay={menuHeaderDropdown}
              placement={"bottomLeft"}
            >
              <div className="flex">
                <div className="profile-pic mt-2">
                  <Avatar
                    style={{
                      background: "#FA6210",
                      color: "white",
                    }}
                    src={user && user.profile_pic_path && user.profile_pic_path}
                  >
                    {getInitials(user && user.name)}
                  </Avatar>
                </div>
                <div className="ml-2">
                  <div className="font-semibold">{user && user.name}</div>
                  <div>{user && user.email}</div>
                </div>

                <div>
                  <BsChevronCompactDown className="text-[20px] ml-5 mt-4" />
                </div>
              </div>
            </HeaderDropdown>
          </div>
          {/* <AvatarDropdown /> */}
          {/* <Menu
            // className={styles.menu}
            selectedKeys={[]}
            onClick={(val) => {
              onMenuClick(val);
            }}
          >
            <Menu.Item key="profile">
              <div className="flex justify-center">
                <Avatar
                  size={80}
                  src={user && user.profile_pic_path && user.profile_pic_path}
                  className="text-center uppercase"
                  style={{ background: "#2874be" }}
                >
                  {getInitials(user && user.name)}
                </Avatar>
              </div>

              <div className="mt-2 text-center">
                <div className="font-medium text-blue-900 text-lg capitalize">
                  user.name
                </div>
                <div className="text-xs text-gray-700">{user.email}</div>
              </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="upload/UploadPublicHolidays">
              Upload public holidays
            </Menu.Item>
            <Menu.Item key="logout">
              {/* <LogoutOutlined /> */}
          {/* Logout
            </Menu.Item>
          </Menu>  */}
          {/* <Link
            to="/login"
            onClick={() => {
              signOutSuccess();
              logoutUser();
              localStorage.clear();
            }}
            style={{ color: "#15538b" }}
            className="text-btm  "
          >
            <div className="font-semibold text-[16px]">Logout</div>
          </Link> */}
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            if (showSideBar) {
              setShowSideBar(false);
            } else {
              setShowSideBar(true);
            }
          }}
          className="ham-menu"
        >
          <i className="fas fa-bars"></i>
        </div>
      </div>
    </header>
  );
};

export default withContext(
  ([
    {
      app: { openMenu },
      user,
    },
    dispatch,
  ]) => ({
    // state
    openMenu,
    user,
    // actions
    setSelectedSchoolDispatch: (data) =>
      setSelectedSchoolAction(data, dispatch),
    signOutSuccess: () => signOutSuccessAction(dispatch),
    // openLeftNav: (data) => openLeftNav(data, dispatch),
  }),
  Header
);
