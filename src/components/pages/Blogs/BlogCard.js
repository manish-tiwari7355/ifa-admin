import React, { useState } from "react";
import "./blog.css";
import { useHistory } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import { DeleteOutlined } from "@ant-design/icons";
import profileImage from "../../../assets/images/profile.png";
import { message, Modal, Skeleton } from "antd";
import { Player } from "video-react";
import axios from "axios";

const cookies = new Cookies();
const BlogCard = ({
  image,
  date,
  plan,
  name,
  blog,
  tag,
  id,
  title,
  typeCheck,
  getData,

  card,
}) => {
  const history = useHistory();
  const [type, setType] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // console.log("card", card);
  // const typeChange = card.map((item) => setType(item.media[0].type));

  const deleteBlog = async (blogId) => {
    await axios
      .delete(`/blog/${blogId}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="p-6 z-0 px-8 mx-4 bg-white shadow-md cursor-pointer w-[300px] md:w-full rounded-xl lg:flex">
        <div className="lg:w-80  z-10 flex justify-center ">
          {typeCheck === "image/jpeg" || "image/jpg" || "image/png" ? (
            <img src={image} alt="image_" className="rounded-xl " />
          ) : (
            <>
              {typeCheck === "" ? (
                <></>
              ) : (
                <Player>
                  <source src={image} />
                </Player>
              )}
            </>
          )}

          {/* <iframe src={image} title="image/video" className="rounded-xl h-56" /> */}
        </div>
        <div className="w-full mt-4 lg:mt-0 lg:ml-7">
          <div>
            <div className="flex justify-between ">
              <div className="mt-2 text-gray-400">{date}</div>
              <div className="flex ">
                <div
                  onClick={() => showModal()}
                  className="font-bold mr-2 cursor-pointer flex text-lg px-4 py-2 border-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 rounded-full"
                >
                  <div style={{ color: "black" }}>View</div>
                </div>
                <div
                  onClick={() => {
                    history.push(`/blogs/edit?${id}`);
                    cookies.set(id, "BlogID");
                    localStorage.setItem(id, "BlogID");
                  }}
                  className="font-bold cursor-pointer flex text-lg px-4 py-2 border-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 rounded-full"
                >
                  <div className="mt-[-5px] mr-2">
                    <EditOutlined />
                  </div>
                  <div>Edit</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-2 ">
              <div className="mt-2 text-gray-400"></div>
              <div
                onClick={() => {
                  deleteBlog(id);
                  message.success("Deleted Successfully");
                }}
                className="font-bold cursor-pointer flex text-lg px-4 py-2 border-2 text-gray-700 hover:text-blue-400 hover:border-blue-400 rounded-full"
              >
                <div className="mt-[-5px] mr-2">
                  <DeleteOutlined style={{ color: "red" }} />
                </div>
                <div style={{ color: "red" }}>Delete</div>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <div className="text-2xl mt-6 w-40 font-semibold  truncate ">
                  {title}
                </div>
                <div className=" mt-2  overflow-auto scroll trancate w-40 lg:w-full">
                  {blog}
                </div>
              </div>
              <div className="mt-16">
                <div className="flex">
                  <div className="uppercase text-xl bg-[#FA6210]  pt-[4px] text-white flex justify-center  h-10 w-10 rounded-full">
                    {name ? <div> {name.slice(0, 1)} </div> : null}
                  </div>
                  <span className="font-semibold ml-2 mt-[4px] text-lg truncate ">
                    {name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        footer={false}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="relative  flex-auto ">
          <div className="mb-10 ">
            <div className="ml-10 mt-5 flex">
              <div className="w-16">
                <img src={profileImage} alt="profile_image" />
              </div>
              <div className="text-3xl mt-2 ml-6 font-semibold">{name}</div>
            </div>
            <div className="border-b mt-4 border-gray-500" />
            <div className="grid grid-cols-1 gap-x-4 gap-y-10  mt-10 px-10">
              <div className="flex">
                <div className="text-lg font-semibold">{blog}</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default BlogCard;
