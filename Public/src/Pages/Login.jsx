import React, {useState , useEffect} from 'react';
import { Form } from 'react-final-form';
import styled from 'styled-components';
import { Link , useNavigate} from 'react-router-dom';
import logo from '../assests/logo.svg';
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../Utils/apiRoutes';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [values , setValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() =>{
    if(localStorage.getItem('chat-app-user')){
      navigate('/');
    }
  },[]);

  const handleSubmit = async (event) => {
    if (handleValidation()) {
      const { username, password } = values;
      try {
        const response = await axios.post(loginRoute, {
          username,
          password,
        });

        const data = response.data; // Assuming the data is in response.data
        console.log("Data is",data);
        if (data && data.status === false) {
          toast.error(data.msg, toastoptions);
        }
        if (data && data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.usercheck));
          console.log(localStorage.setItem("chat-app-user", JSON.stringify(data.usercheck)));
          navigate("/");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const toastoptions = {
      position: "bottom-right",
      autoClose: '8000',
      draggable: true,
      theme: 'dark',
      pauseOnHover: true,
  }

  const handleValidation = () => {
    const {username, password } = values;
    if(password === ""){
      toast.error("Password is required",toastoptions);
      return false;
    }
    else if(username === ""){
      toast.error("Username is required",toastoptions);
      return false;
    }
    else{
      return true;
    }
  }

  const handleChange = (event) => {
    setValues({...values , [event.target.name] : event.target.value });
  }

  return (
    <>
      <FormContainer>
        <Form onSubmit={(event) => handleSubmit(event)} render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="brand">
              <img src={logo} alt="logo" />
              <h1>Snappy</h1>
            </div>
            <input type='text' placeholder='Enter Username' name='username' onChange={(e) => handleChange(e)}/>
            <input type='password' placeholder='Enter password' name='password' onChange={(e) => handleChange(e)}/>
            <button type="submit">Login</button>
            <span>Don't have an account? <Link to="/register">Sign Up</Link></span>
          </form>
        )}/>
      </FormContainer>
      <ToastContainer/>
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #997af0;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #997af0;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #997af0;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
