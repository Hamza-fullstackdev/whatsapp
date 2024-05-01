import React, { useState } from "react";
import {
  Alert,
  Button,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleData = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.log(data);
        dispatch(signInSuccess(data));
        navigate("/");
      }
      if (data.statusCode === 400) {
        setError(true);
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div>
      <div
        style={{ background: "#51A985", height: "180px", padding: "30px 50px" }}
      >
        <div className='flex items-center gap-3'>
          <img width={40} height={60} src='/favicon.png' alt='logo-img' />
          <h3 className='text-white ml-3 font-semibold'>WHATSAPP WEB</h3>
        </div>
      </div>
      <Modal show popup size={"md"}>
        {error && (
          <Alert color='failure' icon={HiInformationCircle}>
            <span className='font-medium'>Oops!</span> {errorMessage}
          </Alert>
        )}
        <Modal.Body>
          <form onSubmit={handleFormData}>
            <div className='p-2 mt-3'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                Login To Your Whatsapp Account
              </h3>
              <div className='mt-2'>
                <Label>Phone Number</Label>
                <TextInput
                  placeholder='Enter your phone number'
                  className='mt-1'
                  type='tel'
                  id='phone'
                  onChange={handleData}
                />
              </div>
              <div className='mt-2'>
                <Label>Password</Label>
                <TextInput
                  placeholder='Enter your password'
                  className='mt-1'
                  id='password'
                  onChange={handleData}
                />
              </div>
              <div className='mt-3'>
                <Link
                  to={"/signup"}
                  className='text-sm text-cyan-700 hover:underline dark:text-cyan-500'
                >
                  Already have a account?
                </Link>
              </div>
              <div className='mt-3'>
                <div className='flex-1'>
                  {loading ? (
                    <Button
                      style={{ background: "#51A985" }}
                      className='w-full'
                    >
                      <Spinner aria-label='Spinner button example' size='sm' />
                      <span className='pl-3'>Loading...</span>
                    </Button>
                  ) : (
                    <Button
                      style={{ background: "#51A985" }}
                      className='w-full'
                      type='submit'
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
