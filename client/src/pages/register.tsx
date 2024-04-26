import { Container } from "react-bootstrap";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../apicalls/auth";
import { LuExternalLink } from "react-icons/lu";

import "../resources/authentication.css";

const Register = () => {
  const navigate = useNavigate();
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "Entered ${label} is not a valid email!",
    },
  };

  const onFinish = async (values: any) => {
    const userObj = {
      email: values.email,
      username: values.name,
      password: values.password,
    };
    console.log(userObj);
    try {
      if (values.password === values.confirmPassword) {
        message.loading("Registering New User...", 0.5);
        const response = await registerUser(userObj);
        console.log(response);
        if (response.success) {
          setTimeout(() => {
            message.success(response.message);
            navigate("/login");
          }, 500);
        } else {
          setTimeout(() => {
            message.error(response.message);
          }, 500);
        }
      } else {
        setTimeout(() => {
          message.error("Entered Passwords don't match.");
        }, 500);
      }
    } catch (error: any) {
      setTimeout(() => {
        message.error(error.message);
      }, 500);
    }
  };
  return (
    <Container className="register" data-aos="fade-up">
      <div
        data-aos=" bg-red-500 fade-down"
        className=" w-full flex justify-center"
      >
        <div className="bg-white custom-shadow max-w-fit p-10 rounded-md">
          <div data-aos="" className="">
            <p className="text-2xl md:text-xl text-center font-bold text-slate-700 tracking-widest uppercase px-3">
              create account
            </p>
          </div>
          <Form
            layout="vertical"
            className="mt-4"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              label="Name"
              name="name"
              data-aos="fade-up"
              className=""
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input className="w-full md:min-w-80 h-full border py-2 " />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              data-aos="fade-up"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input className="w-full md:min-w-80 h-full border py-2 " />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              data-aos="fade-up"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password className="w-full md:min-w-80 h-full py-[5px]" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              data-aos="fade-up"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password className="w-full md:min-w-80 h-full py-[5px]" />
            </Form.Item>{" "}
            <button
              className="py-2 rounded-md bg-blue-500 text-white w-full mt-2"
              type="submit"
            >
              Register
            </button>
            <div
              className="-mb-4 mt-2 flex items-center gap-1 text-primary"
              data-aos=""
            >
              <Link to="/login">Already Registered, Click here to Login</Link>
              <LuExternalLink className="" />
            </div>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
