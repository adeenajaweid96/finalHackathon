import React , { useState} from 'react'
import { Eye , EyeOff  } from 'lucide-react';
import {Formik , Form , ErrorMessage , Field} from 'formik'
import * as Yup from 'yup'
import {toast} from 'react-toastify'

const apiUrl = import.meta.env.VITE_API_URL;
console.log('API URL:', apiUrl);


const validationSchema = Yup.object({
	username: Yup.string()
		.matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers (No spaces or special characters)')
		.min(3, 'Username must be at least 3 characters long')
		.max(20, 'Username cannot exceed 20 characters')
		.required('Username is required'),

	email: Yup.string()
		.email('Enter a valid email address (e.g., example@domain.com)')
		.matches(/^[^\s@]+@[^\s@]+\.(com|net)$/, 'Only .com and .net domains are allowed')
		.required('Email is required'),

	password: Yup.string()
		.min(3, 'Password must be at least 3 characters long')
		.max(30, 'Password must not exceed 30 characters')
		.matches(/^[^\s]*$/, 'Only letters (A-Z, a-z) and numbers (0-9) are allowed. No spaces.')
		.matches(/^[a-zA-Z0-9]*$/, 'Only letters (A-Z, a-z) and numbers (0-9) are allowed.')
		.required('Password is required'),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [ loading , setLoading] = useState(false)
    const togglePassword = ()=>{
      setShowPassword((prev) => !prev);

    };
  return (
    <div className=' max-w-screen-2xl mx-auto'>
      <h1 className='mt-10 text-black font-bold text-4xl font-sans flex justify-center'>Sign Up</h1>
      <p className='flex justify-center mt-5'>Create you account Or <a href='/login'>  Login</a></p>


    <Formik initialValues={{username: '',email : '' , password :'' }}
validationSchema={validationSchema} 
onSubmit={async (values) =>{
  setLoading(true);
  console.log(values)
  try{
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    const data = await response.json();
							setLoading(false);
							if (response.ok) {
								toast.success(data.message);
								navigate('/login');
							} else {
								toast.error(data.message || 'An error occurred while signing up');
							}

  }
  catch(error){
    setLoading(false);
    console.error('error: ', error)
    toast.error(error.message || 'an unexpected error occurs in signing up')
  }

}}>
<Form className='space-y-4 '>
          <div className='flex flex-col items-center justify-center mt-5'>

         
<div className='relative w-[20%] '>
          <label htmlFor="userName" className='block mb-4 font-bold text-[18px] '>Enter User Name:</label>
            <Field name='username' type="text" placeholder='User Name' required className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' />
          </div>
          <ErrorMessage name='username' component='p' className='text-red-500 text-sm' />
          </div>  

          <div className='flex flex-col items-center justify-center mt-5'>
            <div className="relative w-[20%] ">
            <label htmlFor="email" className='block mb-4 font-bold text-[18px]'>Enter Your Email:</label>
            <Field type="email" name='email' placeholder='Email Address' required className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black' />
          </div>
          <ErrorMessage name='email' component='p' className='text-red-500 text-sm' />

          </div>

<div className='flex flex-col items-center justify-center mt-5'>
          <div className="relative w-[20%] ">
            <label htmlFor="password" className='block mb-4 font-bold text-[18px]'>Enter Password:</label>
            <Field name='password'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              required
              className='w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute bottom-2 right-3 -translate-y-1/2 text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <ErrorMessage name='password' component='p' className='text-red-500 text-sm' />
</div>
          <div className='flex justify-center'>
          <button type='submit'
           className='w-[20%] mt-6  mb-10 flex justify-center items-center bg-black hover:bg-gray-700 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500'
           disabled={loading}>{loading ? 'Signing up...' : 'Sign up'}</button>
        
             </div>
             </Form>
             </Formik>
    </div>
  );
}

export default Register
