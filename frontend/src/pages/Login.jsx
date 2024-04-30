import React from "react";
import {
  Button,
  Label,
  Modal,
  TextInput,
} from "flowbite-react";
import { Link } from "react-router-dom";

const Login = () => {
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
      <Modal show popup size={'md'}>
        <Modal.Body>
          <form>
            <div className='p-2 mt-3'>
              <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                Login To Your Whatsapp Account
              </h3>
              <div className="mt-2">
                <Label>Phone Number</Label>
                <TextInput
                  placeholder='Enter your phone number'
                  className='mt-1'
                />
              </div>
              <div className="mt-2">
                <Label>Password</Label>
                <TextInput
                  placeholder='Enter your password'
                  className='mt-1'
                />
              </div>
              <div className='mt-3'>
                <Link
                  to={'/signup'}
                  className='text-sm text-cyan-700 hover:underline dark:text-cyan-500'
                >
                  Already have a account?
                </Link>
              </div>
              <div className='mt-3'>
                <div className='flex-1'>
                  <Button style={{ background: "#51A985" }} className='w-full'>
                    Login Now
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

export default Login;
