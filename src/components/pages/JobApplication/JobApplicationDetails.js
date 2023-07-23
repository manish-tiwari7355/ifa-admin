/* eslint-disable no-unused-vars */
import { Modal, Select, Breadcrumb } from "antd";
import axios from "axios";
import { withContext } from "Context";
import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { getCategoriesAction } from "Actions/categoryActions";
import { PageMetaTags } from "../../common";
import profileImage from "../../../assets/images/profile.png";
import Cookies from "universal-cookie";
import { BsFileEarmarkPdf } from "react-icons/bs";
import { Image } from "antd";
import { TiArrowBack } from "react-icons/ti";

const cookies = new Cookies();
const JobApplicationDetails = ({ user, getCategoriesFunc, categories }) => {
  const [showModal, setShowModal] = useState(false);
  const [keyword, setKeyword] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSize, setViewSize] = useState(10);
  const [pdf, setPdf] = useState([]);

  const [color, setColor] = useState("");
  const [experience, setExperience] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [qualification, setQualification] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  const [media, setMedia] = useState([]);
  const history = useHistory();
  const action = (value) => {
    setKeyword(value);
  };
  const { Option } = Select;
  const debounceSearch = debounce(action, 400);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal1 = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    const a = async () => {
      console.log(1212, data.media[0].url);
      const previewFile = await axios.get(data.media[0].url);
      console.log("previewFile: ", previewFile);
    };
    if (data && data.media && data.media.length) a();
  }, [data]);
  async function getData() {
    await axios
      .get(`/job/${cookies.get("jobId")}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((resp) => {
        setData(resp.data.job);
        setMedia(resp.data.job.media);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="content-panel">
      <PageMetaTags title="Job Application" />
      <Breadcrumb style={{ marginBottom: 20 }}>
        <Breadcrumb.Item>
          <Link to="/dashboard">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/jobApplication">Job Application</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Job Application</Breadcrumb.Item>
      </Breadcrumb>
      <div className="bg-white pt-10 pb-20 rounded-xl px-10  shadow-md">
        <div className="flex justify-between">
          <div className="flex">
            <div className="w-20">
              <img src={profileImage} alt="profile_image" />
            </div>
            <div className="text-3xl ml-5 mt-4 font-semibold">{data.name}</div>
          </div>
          <div
            onClick={() => history.push("/jobApplication")}
            className="bg-[#FA6210] h-8 items-center px-5 cursor-pointer font-semibold hover:bg-[#15538B]  rounded-md text-white  text-lg flex"
          >
            Back{" "}
            <span className="ml-2 ">
              <TiArrowBack />
            </span>{" "}
          </div>
        </div>
        <div className="border-b mt-10  border-gray-400 mb-8" />
        <div className="">
          <div className="grid gap-y-10 xl:gap-x-10 lg:grid-cols-2 xl:grid-cols-3">
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">Name:</div>
              <div className="text-2xl font-semibold ">
                &nbsp;&nbsp;{data.name}
              </div>
            </div>
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">Email:</div>
              <p className="text-2xl font-semibold break-all ">
                &nbsp;&nbsp;{data.email}
              </p>
            </div>
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">Phone:</div>
              <div className="text-2xl font-semibold ">
                &nbsp;&nbsp;{"+91" + " " + data.phone}
              </div>
            </div>
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">
                FathersName:
              </div>
              <div className="text-2xl font-semibold ">
                &nbsp;&nbsp;{data.fathersName}
              </div>
            </div>
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">
                Qualifications:
              </div>
              <div className="text-2xl font-semibold ">
                &nbsp;&nbsp;{data.qualifications}
              </div>
            </div>
            <div className="flex">
              <div className="text-2xl font-semibold text-gray-500">
                Experience:
              </div>
              <div className="text-2xl font-semibold ">
                &nbsp;&nbsp;{data.experience}
              </div>
            </div>
          </div>
          <div className="mt-10 flex">
            <div className="text-2xl font-semibold text-gray-500">Message:</div>
            <div className="text-2xl ml-5  font-semibold ">{data.message}</div>
          </div>
          <div className="mt-10 flex">
            <div className="text-2xl mt-6 font-semibold text-gray-500">
              Resume:
            </div>
            {media.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    showModal1();
                    setPdf(item.url);
                  }}
                  className="text-3xl cursor-pointer grid place-item-center p-10 px-20 rounded-lg ml-10 bg-sky-100  "
                >
                  <BsFileEarmarkPdf />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        footer={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="">
          <iframe
            src={pdf}
            title="resume_pdf"
            className="w-full h-[600px] mt-10"
          />
        </div>
      </Modal>
    </div>
  );
};

JobApplicationDetails.propTypes = {
  Contact: PropTypes.func.isRequired,
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
  JobApplicationDetails
);
