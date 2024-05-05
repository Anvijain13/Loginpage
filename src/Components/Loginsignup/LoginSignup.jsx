import React, { useState } from 'react';
import './LoginSignup.css'
import Validation from './LoginSignupValidation'; 
import axios from 'axios'


const LoginSignup = () =>{

    const [values, setValues]= useState({
        email:'',
        password:''
    })

    // const navigate = useNavigate();

    const[errors, setErrors]= useState({})

    const handleInput = (event)=>{
        setValues(prev => ({...prev, [event.target.name]:[event.target.value]}));
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === ""){
            axios.post('http://localhost:8081/LoginSignup',values)
            .then(res =>{
               
            })
            .catch(err => console.log(err));
        }
    }
    const [action,setAction] = useState("Sign Up");

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setErrors(Validation(values));
    
    //     if (Object.keys(errors).length === 0) { // Check if there are no errors
    //         axios.post('http://localhost:8081/LoginSignup', values)
    //             .then(res => {
    //                 // Handle successful signup (e.g., redirect user)
    //                 console.log('Signup successful');
    //             })
    //             .catch(err => {
    //                 // Handle signup failure (e.g., display error message)
    //                 console.error('Signup failed:', err);
    //             });
    //     }
    // }
    

    return(
        <div  className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:<div className="input">
                    
                    <input type='text' placeholder='Name' onChange={handleInput} name='name'/>
                </div>}
                
                <div className="input">
                    
                    <input type='email' placeholder='Email Id' onChange={handleInput}  name='email'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className="input">
                    
                    <input type='password' placeholder='Password'  onChange={handleInput} name='password'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
            </div>
            {action==="Sign Up"?<div></div>:<div className="forgot-password">Lost Password? <span>
                Click Here!</span></div>}
            
            <div className="submit-container">
                <div className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign UP")}} onSubmit={handleSubmit}>Sign Up</div>
                <div className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}} onSubmit={<form/>}>Login</div>
            </div>
        </div>
    )
}

export default LoginSignup;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//     const [credentials, setCredentials] = useState({
//         email: '',
//         password: ''
//     });
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCredentials(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8081/login', credentials);
//             // Assuming backend sends back a token upon successful login
//             const token = response.data.token;
//             // Store the token in local storage for future authenticated requests
//             localStorage.setItem('token', token);
//             // Redirect the user to another page upon successful login
//             // history.push('/dashboard');
//             console.log('Login successful');
//         } catch (err) {
//             // Handle login failure (e.g., display error message)
//             setError('Invalid email or password');
//             console.error('Login failed:', err);
//         }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Email:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={credentials.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={credentials.password}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 {error && <div style={{ color: 'red' }}>{error}</div>}
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };


// export default Login;
