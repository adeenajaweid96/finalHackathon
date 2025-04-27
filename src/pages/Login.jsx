import React , { useState} from 'react'
import { Eye , EyeOff  } from 'lucide-react';
import {toast} from 'react-toastify'
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { loginSuccess } from '../store/authSlice';



const apiUrl = import.meta.env.VITE_API_URL
console.log(apiUrl)


const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	// const dispatch = useDispatch()

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	// const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		console.log(formData);

		try {
			const response = await fetch(`${apiUrl}/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			const data = await response.json();
			setLoading(false);
			if (response.ok) {
				localStorage.setItem("token",data.token)
				localStorage.setItem("userId",data.user.id)
				dispatch(loginSuccess({
					token:data.token,
					userId:data.userId
			}))
				toast.success(data.message);

				navigate('/');
			} else {
				toast.error(data.message || 'Invalid email or password');
			}
		} catch (error) {
			setLoading(false);
			console.error('Error:', error);
			toast.error(error.message || 'An error occurred while logging in');
		}
	};

	return (
		<div className='flex justify-center items-center min-h-screen  px-4'>
			<div className='relative flex flex-col rounded-xl bg-white shadow-lg p-6 w-full max-w-md'>
				<h2 className='text-2xl font-semibold text-gray-800 text-center'>Login</h2>
				<form className='space-y-4' onSubmit={handleSubmit}>
					<div>
						<label className='block text-sm font-medium text-gray-700'>Email</label>
						<input
							onChange={handleChange}
							name='email'
							type='email'
                            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'							placeholder='Your Email'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium text-gray-700'>Password</label>
						<div className='relative'>
							<input
								onChange={handleChange}
								name='password'
								type={showPassword ? 'text' : 'password'}
                                className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black'								placeholder='Your Password'
								required
							/>
							<button
								type='button'
								className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none'
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <EyeOff /> : <Eye />}
							</button>
						</div>
					</div>



					<button
           className='w-[20%] mt-6  mb-10 flex justify-center items-center bg-black hover:bg-gray-700 text-white font-medium py-2 rounded-md transition-all duration-300 disabled:bg-gray-500'
           type='submit'
						disabled={loading}
					>
						{loading ? 'Logging In...' : 'Log In'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
