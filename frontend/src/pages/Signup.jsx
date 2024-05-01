import React, { useRef, useState } from "react";
import {
  Avatar,
  Button,
  Checkbox,
  FileInput,
  Label,
  Modal,
  Select,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
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
        <Modal.Body>
          <form>
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
                  img={selectedFile ? URL.createObjectURL(selectedFile) : ''}
                ></Avatar>
                <FileInput
                  hidden
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  helperText={'Image should be less than 3kb (png, jpg)'}
                />
              </div>
              <div className='flex flex-row justify-between gap-4 mt-4'>
                <div className='flex-1'>
                  <div className='mb-1'>
                    <Label htmlFor='fname' value='First Name' />
                  </div>
                  <TextInput id='fname' placeholder='John' required />
                </div>
                <div className='flex-1'>
                  <div className='mb-1'>
                    <Label htmlFor='lname' value='Last Name' />
                  </div>
                  <TextInput id='lname' placeholder='Doe' required />
                </div>
              </div>

              <div className='mt-3 flex flex-row justify-between gap-4'>
                <div className='flex-1'>
                  <div className='mb-1'>
                    <Label htmlFor='countries' value='Select your country' />
                  </div>
                  <Select id='countries' required>
                    <option value={'Pakistan'}>Pakistan</option>
                    <option value={'India'}>India</option>
                    <option value={'United States'}>Usa</option>
                    <option value={'Canada'}>Canada</option>
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
                  />
                </div>
              </div>
              <div>
                <div className='mb-1 mt-2'>
                  <Label htmlFor='password' value='Password' />
                </div>
                <TextInput id='password' placeholder='*********' />
              </div>
              <div>
                <div className='mb-1 mt-2'>
                  <Label htmlFor='about' value='About' />
                </div>
                <TextInput id='about' placeholder='Cant talk, whatsapp only' />
              </div>
              <div className='flex justify-between mt-3'>
                <div className='flex items-center gap-2'>
                  <Checkbox id='remember' />
                  <Label htmlFor='remember'>Remember me</Label>
                </div>
                <Link
                  to={'/login'}
                  className='text-sm text-cyan-700 hover:underline dark:text-cyan-500'
                >
                  Already have a account?
                </Link>
              </div>
              <div className='mt-3'>
                <div className='flex-1'>
                  <Button style={{ background: "#51A985" }} className='w-full' type="submit">
                    Register
                  </Button>
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
