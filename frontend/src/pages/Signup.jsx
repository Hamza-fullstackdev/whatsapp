import React, { useRef, useState } from "react";
import {
  Alert,
  Avatar,
  Button,
  Checkbox,
  FileInput,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFormData({
      ...formData,
      profileimg: file,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);
  const handleFormData = async (e) => {
    setError(false);
    setLoading(true);
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      console.log(data);
      if (data.statusCode === 201) {
        navigate("/login");
      }
      if (data.statusCode === 400) {
        setError(true);
        setErrorMessage(data.message);
      }
    } catch (err) {
      console.log(err);
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
      <Modal show popup>
        {error && (
          <Alert color='failure' icon={HiInformationCircle}>
            <span className='font-medium'>Oops!</span> {errorMessage}
          </Alert>
        )}
        <Modal.Body>
          <form onSubmit={handleFormData} encType='multipart/form-data'>
            <div className='p-2 mt-3'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                Register Your Account To Whatsapp
              </h3>
              <div className='text-center mt-4'>
                <Avatar
                  size={"xl"}
                  rounded
                  className='cursor-pointer object-contain'
                  onClick={handleImageClick}
                  img={selectedFile ? URL.createObjectURL(selectedFile) : ""}
                ></Avatar>
                <FileInput
                  hidden
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  helperText={"Image should be less than 3kb (png, jpg)"}
                />
              </div>
              <div className='flex flex-row justify-between gap-4 mt-4'>
                <div className='flex-1'>
                  <div className='mb-1'>
                    <Label htmlFor='fname' value='First Name' />
                  </div>
                  <TextInput
                    id='fname'
                    placeholder='John'
                    required
                    onChange={handleChange}
                  />
                </div>
                <div className='flex-1'>
                  <div className='mb-1'>
                    <Label htmlFor='lname' value='Last Name' />
                  </div>
                  <TextInput
                    id='lname'
                    placeholder='Doe'
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='mt-3 flex flex-row justify-between gap-4'>
                <div className='flex-1'>
                  <div className='mb-1'>
                    <Label htmlFor='country' value='Select your country' />
                  </div>
                  <Select id='country' required onChange={handleChange}>
                    <option value={"Pakistan"}>Pakistan</option>
                    <option value={"India"}>India</option>
                    <option value={"United States"}>Usa</option>
                    <option value={"Canada"}>Canada</option>
                  </Select>
                </div>
                <div className='flex-1'>
                  <div className='mb-1'>
                    <Label htmlFor='phone' value='Phone' />
                  </div>
                  <TextInput
                    id='phone'
                    type='tel'
                    placeholder='+92 3150706126'
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <div className='mb-1 mt-2'>
                  <Label htmlFor='password' value='Password' />
                </div>
                <TextInput
                  id='password'
                  placeholder='*********'
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className='mb-1 mt-2'>
                  <Label htmlFor='about' value='About' />
                </div>
                <TextInput
                  id='about'
                  placeholder='Cant talk, whatsapp only'
                  onChange={handleChange}
                />
              </div>
              <div className='flex justify-between mt-3'>
                <div className='flex items-center gap-2'>
                  <Checkbox id='remember' />
                  <Label htmlFor='remember'>Remember me</Label>
                </div>
                <Link
                  to={"/login"}
                  className='text-sm text-cyan-700 hover:underline dark:text-cyan-500'
                >
                  Already have a account?
                </Link>
              </div>
              <div className='mt-3'>
                <div className='flex-1'>
                  {loading ? (
                    <Button style={{ background: "#51A985" }}
                    className='w-full'>
                      <Spinner aria-label='Spinner button example' size='sm' />
                      <span className='pl-3'>Loading...</span>
                    </Button>
                  ) : (
                    <Button
                      style={{ background: "#51A985" }}
                      className='w-full'
                      type='submit'
                    >
                      Register
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

export default Signup;
