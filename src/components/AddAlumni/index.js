import React,{useState} from 'react'
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  TimePicker,
  Upload,
    Modal ,
    notification,
  
  } from "antd";
  import axios from "axios";
  const { TextArea } = Input;
  const { Option } = Select;

  const year = [
    { value: '2011', label: '2011' },
    { value: '2012', label: '2012' },
    { value: '2013', label: '2013' },
    { value: '2014', label: '2014' },
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' },
    
  ];
  const branch = [
    {value: "Computer Science And Engineering",label:'Computer Science And Engineering'},
    {value: "Civil Engineering",label: 'Civil Engineering'},
    {value: "Mechanical Engineering",label:'Mechanical Engineering'},
    {value: "Others",label:'Others'},
    // 'Select branch',
    // 'Computer Science And Engineering',
    // 'Civil Engineering',
    // 'Mechanical Engineering',
    // 'Others',
  ];
  const gender = [
    {value: "Male",label:'Male'},
    {value: "Female",label: 'Female'},
   ];
  const currentStatusList = [
    {value: "Higher Education" ,label:'Higher Education'},
    {value: "Qualified Competitive Exam" ,label:'Qualified Competitive Exam'},
    {value: "Gov. Job" ,label:'Gov. Job'},
    {value: "Running Own/Family Business(Entrepreneurs)" ,label:'Running Own/Family Business(Entrepreneurs)'},
    {value: "Working in Education Institutes" ,label:'Working in Education Institutes'},
    {value: "Others" ,label:'Others'},
    // 'Working In Industry',
    // 'Higher Education',
    // 'Qualified Competitive Exam',
    // 'Gov. Job',
    // 'Running Own/Family Business(Entrepreneurs)',
    // 'Working in Education Institutes',
    // 'Others',
  ];




const AddAlumni = ({isModalOpen,setIsModalOpen}) => {
  const [form] = Form.useForm();
  // console.log('form1111', form)
  const [loading, setLoading] = useState(false);

  // axios({
  //   method:"get",
  //   url:"/alumni",
  //    headers: {
  //     "Content-Type": "multipart/form-data",
  //     authorization: localStorage.getItem("accessToken"),
  //   },
  // })
  // .then((res)=>{
  //   console.log('res', res)
  // })
  const onFinish = (values) => {
    setLoading(true);
  //  console.log('values', values)


    axios({
      method: "post",
      url: "/alumni/add",
      data:{name:values.name,gender:values.gender,yearOfPassout:values.yearOfPassout,email:values.email,phone:values.phone,workingInIndustry:values.workingInIndustry,
        branch:values.selectBranch,message:values.message},
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("accessToken"),
      },
    })
      .then((resp) => {
        console.log('resp', resp)
        notification.success({ message: "Add Alumni successful" });
        
       
        axios({
    method:"get",
    url:"/alumni",
     headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("accessToken"),
    },
  })
  .then((res)=>{
    console.log('res', res)
  })
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div> 
       <Modal
         width={1000}
       title="Add Alumni" visible={isModalOpen} onOk={()=>setIsModalOpen(false)} onCancel={()=>setIsModalOpen(false)}  footer={null}>
        <div className=''>
        <Form form={form} name="bountyForm"
         onFinish={onFinish}
         >
            <Row gutter={24} style={{ padding: '15px' }}  >
              <Col xs={24} sm={12} md={6} xl={6}>
                <div className=" ">
                  <p >Name</p>
                  <Form.Item
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Name ',
                      },
                    ]}
                  >
                    <Input  size="large" placeholder="Enter name" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6} xl={6}>
                <div className=" ">
                  <p>Gender</p>
                  <Form.Item
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Gender',
                      },
                    ]}
                  >
                     <Select
                     size="large"
                     defaultValue="Select Gender"
                   
            
                    options={gender}
                 />
                  
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6} xl={6}>
                <div className=" ">
                  <p>Year of Passout</p>
                 
                  <Form.Item
                    name="yearOfPassout"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Year of Passout ',
                      },
                    ]}
                  >
                    <Select
                    size="large"
                     defaultValue="Select Year of Passout"
                    // style={{ width: 200 }}
            
                    options={year}
                 />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6} xl={6}>
                <div className="">
                  <p >Email </p>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please Enter Email',
                      },
                    ]}
                  >
                     <Input
                     type='email' placeholder="Enter Email" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6} xl={6}>
                <div className="">
                  <p className='pt-5'>Phone Number </p>
                  <Form.Item
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: 'Please Phone Number',
                      },
                    ]}
                  >
                      <Input type='Number'  size="large" placeholder="Enter Phone Number" />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6} xl={6}>
                <div className=" ">
                  <p className='pt-5'>Working In Industry</p>
                 
                  <Form.Item
                    name="workingInIndustry"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Working In Industry ',
                      },
                    ]}
                  >
                    <Select
                    size="large"
                     defaultValue="Working In Industry"
                    // style={{ width: 200 }}
            
                    options={currentStatusList}
                 />
                  </Form.Item>
                </div>
              </Col>
              <Col xs={24} sm={12} md={6} xl={6}>
                <div className=" ">
                  <p className='pt-5'>Select branch</p>
                 
                  <Form.Item
                    name="selectBranch"
                    rules={[
                      {
                        required: true,
                        message: 'Please Select Branch ',
                      },
                    ]}
                  >
                    <Select
                    size="large"
                     defaultValue="Select branch"
                    // style={{ width: 200 }}
            
                    options={branch}
                 />
                  </Form.Item>
                </div>
              </Col>

              
            </Row>
            <Row gutter={24} style={{ padding: '15px' }}>
            <Col xs={24} sm={12} md={24} xl={24}>
                {' '}
                <div className="">
                  <p className='pt-5'>Message</p>
                  <Form.Item name="message">
                    
                  <TextArea rows={4} placeholder="Enter Message" />
                  
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div className="flex justify-end px-10 py-8">
              <button 
              htmlType="submit"
              className="bg-[#FA6210] h-12 mt-2 md:mt-0 ml-2 px-5 md:ml-6 font-semibold hover:bg-[#15538B]  rounded-md text-white">
                Add
              </button>
            </div>
          </Form>
   
    </div>
  </Modal>
  </div>
  )
}

export default AddAlumni