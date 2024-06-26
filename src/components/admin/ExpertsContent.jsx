// @quokka
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Modal,
  DatePicker,
  Input,
  Select,
  Avatar,
  message,
  Table,
} from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import SubmitButton from "../../components/shared/SubmitButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getListCategoryApi } from "../../api/category";
import {
  createExpertAccountApi,
  getListExpertAccountsApi,
} from "../../api/expert";
import { useDispatch, useSelector } from "react-redux";
import { setListExpertAccounts } from "../../redux/slice/expert";
import queryString from "query-string";
import { useLocation, useSearchParams } from "react-router-dom";

var optionsHospital = [];
var optionsAcademicDegree = [];
var optionsDepartment = [];
var optionsHospitalRole = [];
const ExpertsContent = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const select = useSelector((state) => state.expert);
  const listExpert = select.listExpertAccounts;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    form.resetFields();
    setOpen(true);
  };
  const queryParam = useMemo(
    () => queryString.parse(location.search),
    [location.search]
  );
  const handleSearch = async (values) => {
    for (const key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        // Kiểm tra xem thuộc tính có bằng undefined không
        if (values[key] === undefined) {
          // Gán thuộc tính bằng ""
          values[key] = "";
        }
      }
    }
    setSearchParams(values);
  };
  const handleReset = () => {
    setSearchParams({});
    searchForm.resetFields();
  };
  const { refetch: getListHospital } = useQuery({
    queryKey: ["getListHospital"],
    queryFn: () => getListCategoryApi({ kind: 1 }),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      optionsHospital = [];
      for (let i = 0; i < data.data.content.length; i++) {
        const item = data.data.content[i];
        const transformedItem = {
          value: item.id,
          label: item.categoryName,
        };
        optionsHospital.push(transformedItem);
      }
    },
  });
  const { refetch: getListHospitalRole } = useQuery({
    queryKey: ["getListhospitalRole"],
    queryFn: () => getListCategoryApi({ kind: 2 }),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      optionsHospitalRole = [];
      for (let i = 0; i < data.data.content.length; i++) {
        const item = data.data.content[i];
        const transformedItem = {
          value: item.id,
          label: item.categoryName,
        };
        optionsHospitalRole.push(transformedItem);
      }
    },
  });

  const { refetch: getListDepartMent } = useQuery({
    queryKey: ["getListDepartment"],
    queryFn: () => getListCategoryApi({ kind: 3 }),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      console.log(data);
      optionsDepartment = [];
      for (let i = 0; i < data.data.content.length; i++) {
        const item = data.data.content[i];
        const transformedItem = {
          value: item.id,
          label: item.categoryName,
        };
        optionsDepartment.push(transformedItem);
      }
    },
  });
  const { refetch: getListAcademicDegree } = useQuery({
    queryKey: ["getListAcademicDegree"],
    queryFn: () => getListCategoryApi({ kind: 4 }),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      console.log(data);
      optionsAcademicDegree = [];
      for (let i = 0; i < data.data.content.length; i++) {
        const item = data.data.content[i];
        const transformedItem = {
          value: item.id,
          label: item.categoryName,
        };
        optionsAcademicDegree.push(transformedItem);
      }
    },
  });

  const { mutateAsync: createExpert } = useMutation({
    mutationFn: createExpertAccountApi,
    onSuccess: (res) => {
      if (res.code == "ACCOUNT_ERROR_EMAIL_EXIST") {
        message.error("Email already exists");
      } else {
        message.success("Create expert successfully");
        setOpen(false);
        getListExpertAccounts();
      }

      // message.success("Create expert successfully");
    },
  });
  const { refetch: getListExpertAccounts, isLoading } = useQuery({
    queryKey: ["listExpertAccount", queryParam],
    queryFn: () => getListExpertAccountsApi(queryParam),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      const temp = [];
      if (data.data.totalElements > 0) {
        for (let i = 0; i < data.data.content.length; i++) {
          const item = data.data.content[i];
          const transformedItem = {
            ...item,
            key: item.id,
            hospital: item.hospital.categoryName,
            hospitalRole: item.hospitalRole.categoryName,
            department: item.department.categoryName,
            academicDegree: item.academicDegree.categoryName,
          };
          temp.push(transformedItem);
        }

        dispatch(setListExpertAccounts(temp));
        message.success("Get list expert success");
      } else {
        dispatch(setListExpertAccounts([]));
      }
    },
  });
  const { data: listCategory, refetch: getListCategory } = useQuery({
    queryKey: ["getListCategory"],
    queryFn: () => getListCategoryApi(),
    enabled: false,
    retry: 0,
    onSuccess: () => {
      console.log(listCategory);
    },
  });
  const columns = [
    {
      title: "Avatar",
      dataIndex: "expertAvatar",
      key: "expertAvatar",
      render: (_, record) => <Avatar src={record.expertAvatar} />,
    },
    {
      title: "Fullname",
      dataIndex: "expertFullName",
      key: "expertFullName",
    },
    {
      title: "Email",
      dataIndex: "expertEmail",
      key: "expertEmail",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hospital",
      dataIndex: `hospital`,
      key: "hospital",
    },
    {
      title: "Role",
      dataIndex: "hospitalRole",
      key: "hospitalRole",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Academic degree",
      dataIndex: "academicDegree",
      key: "academicDegree",
    },
    {
      title: "Date of birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (_, record) => {
        const rawtime = dayjs(record.dateOfBirth, "DD/MM/YYYY");
        const formatTime = dayjs(rawtime["$d"]).format("DD/MM/YYYY");
        return <p>{formatTime}</p>;
      },
    },
  ];
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleCheckValidBirth = (year) => {
    const now = dayjs()["$y"];
    if (now >= year) {
      return true;
    }
    return false;
  };
  const onFinish = async (values) => {
    // console.log(values);
    const formatUserDayOfBirth = dayjs(values.dateOfBirth["$d"]).format(
      "DD/MM/YYYY HH:mm:ss"
    );
    const data = {
      avatarPath:
        "https://s3.ap-southeast-1.amazonaws.com/family.circle/avatar/AVATAR_tB5idnWvVj.jpg",
      bio: "",
      ...values,
    };
    data.dateOfBirth = formatUserDayOfBirth;
    if (handleCheckValidBirth(values.dateOfBirth["$y"])) {
      createExpert(data);
    } else {
      message.error("invalid year");
    }
  };

  useEffect(() => {
    getListHospital();
    getListHospitalRole();
    getListDepartMent();
    getListAcademicDegree();
    getListExpertAccounts();
  }, [location.search]);
  return (
    <div
      style={{
        padding: 24,
        minHeight: 360,
        background: "white",
      }}
      className="flex flex-col "
    >
      <div className="flex flex-row pb-2 mb-2 ">
        <Form layout="inline" onFinish={handleSearch} form={searchForm}>
          <Form.Item label="Fullname" name="fullName">
            <Input defaultValue={searchParams.get("fullName")}></Input>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            // initialValue={searchParams.get("email") && ""}
          >
            <Input defaultValue={searchParams.get("email")}></Input>
          </Form.Item>
          <Form.Item label="Hospital" name="hospitalId">
            <Select
              options={optionsHospital}
              key={optionsHospital.value}
              placeholder="Select hospital"
              className=" max-w-[180px] min-w-[150px]"
              allowClear={true}
            ></Select>
          </Form.Item>
          <Form.Item label="Academic degree" name="academicDegreeId">
            <Select
              options={optionsAcademicDegree}
              key={optionsAcademicDegree.value}
              placeholder="Select Academic degree"
              className=" max-w-[200px] min-w-[150px]"
              allowClear={true}
            ></Select>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
          <Form.Item>
            <Button danger className="text-white " onClick={handleReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className=" border-solid border-black border-b-[1px] mb-2 flex pb-2 ">
        <Button onClick={showModal}>Create</Button>
        <Modal
          title="Create expert account"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
          footer={false}
        >
          <Form
            form={form}
            layout="vertical"
            name="basic"
            labelCol={{
              span: 4,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
            className="relative "
          >
            <Form.Item
              hasFeedback
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              className="relative w-full "
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Input your username"
                className="pt-2 pb-2 text-base rounded-xl"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
              className="relative w-full "
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Input your email"
                className="pt-2 pb-2 text-base rounded-xl"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="phone"
              validateDebounce={1000}
              rules={[
                {
                  min: 10,
                  message: "Phone must be 10 number",
                },
                {
                  pattern: /^[0-9]*$/, // Regular expression to allow only numeric input
                  message: "Please enter a valid phone number!",
                },
                {
                  required: true,
                  message: "Please input your phonenumber!",
                },
              ]}
              className="relative w-full "
            >
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Input your phonenumber"
                className="pt-2 pb-2 text-base rounded-xl"
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="dateOfBirth"
              rules={[
                {
                  required: true,
                  message: "Please input your date of birth!",
                },
                ({}) => ({
                  validator(_, value) {
                    const selectedDate = dayjs(value);
                    const currentDate = dayjs();

                    if (selectedDate.isBefore(currentDate)) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      "Please select a valid date of birth!"
                    );
                  },
                }),
              ]}
              className="relative w-full "
            >
              <DatePicker
                prefix={<CalendarOutlined className="site-form-item-icon" />}
                className="w-full pt-2 pb-2 text-base rounded-xl"
                placeholder="Select date of birth"
                format={dateFormatList}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name="hospitalId"
              validateFirst
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={optionsHospital}
                placeholder="Select hospital"
                key={optionsHospital.value}
              ></Select>
            </Form.Item>
            <Form.Item
              hasFeedback
              name="academicDegreeId"
              validateFirst
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={optionsAcademicDegree}
                placeholder="Select academic Degree"
              ></Select>
            </Form.Item>
            <Form.Item
              hasFeedback
              name="departmentId"
              validateFirst
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={optionsDepartment}
                placeholder="Select department"
              ></Select>
            </Form.Item>
            <Form.Item
              hasFeedback
              name="hospitalRoleId"
              validateFirst
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                options={optionsHospitalRole}
                placeholder="Select hospital role"
              ></Select>
            </Form.Item>
            <Form.Item
              hasFeedback
              name="password"
              validateFirst
              rules={[
                {
                  min: 8,
                  message: "Password is at least 8 characters",
                },
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Input your password"
                className="pt-2 pb-2 text-base rounded-xl"
              />
            </Form.Item>

            <Form.Item className="mb-2 ">
              <SubmitButton
                form={form}
                content="Sign up"
                className="w-full !border-black hover:!text-white !border h-max text-base font-semibold pt-2 pb-2 rounded-[30px] xl:bg-white md:bg-white lg:bg-white xl:text-black  hover:!bg-red-400    dark:text-black bg-primary text-black dark:bg-white lg:dark:bg-slate-500 lg:dark:text-white md:dark:bg-slate-500 md:dark:text-white"
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div className="h-full ">
        <Table
          loading={isLoading}
          dataSource={listExpert}
          columns={columns}
          scroll={{
            y: 400,
          }}
        ></Table>
      </div>
    </div>
  );
};

export default ExpertsContent;
