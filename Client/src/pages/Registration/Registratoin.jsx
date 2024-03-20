import React, { useEffect, useState } from 'react'
import { Button, Container, FeedbackValidation, Form, Heading, Input } from '../../styles/styles'
import { validation } from './Validation';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import ServerError from '../Login/ServerError';
import FeedBack from '../Login/FeedBack';
import {toast} from "react-hot-toast"
import Loader from '../../components/Loader/Loader';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
function Registratoin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [isLoading , setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback("");
    setErrorMessages([])
    setFormErrors(validation(formData));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      authentication();
    }
  }, [formErrors]);

  const authentication = async () => {
    try {
      const { confirmPassword, ...dataSend } = formData;

      setIsLoading(true)
      const response = await axios.post('http://localhost:5000/api/auth/register', dataSend);
      const data = response.data;
      console.log(response)

      if(response.status === 201 && data.msg === "User registered successfully" ){
        toast.success("LoaggedIn Successfully")
        navigate("/login");
      }
    } catch (error) {
      console.error('Error during authentication:', error);
     
      if(error.response.status === 409 && error.response.data.msg === "email already exits" ){
        setFeedback(error.response.data.msg)
      }
      else if(error.response.status === 500 && error.response.data.msg === "something went wrong on server"){
        setFeedback(error.response.data.msg);
      }else{
        toast.error("something went wrong")
      }

      if(error.response.data.errors?.length >0  && error.response.status === 400 ){
        setErrorMessages(error.response.data.errors.map((error) => error.msg));
       }

    }
    finally{
      setIsLoading(false)
    }
  };

if(isLoading) return <Loader text="Loading..."/>

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Heading> Please Register here</Heading>
        <ServerError errors={errorMessages} />
        <FeedBack feedback={feedback} />
        <FeedbackValidation className='Feedback'></FeedbackValidation>
        <Input type='text' placeholder='enter your name'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required></Input>
        <FeedbackValidation>{formErrors.username}</FeedbackValidation>

        <Input type='email' placeholder='enter your email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required></Input>
        <FeedbackValidation>{formErrors.email}</FeedbackValidation>

        <Input type='password' placeholder='enter password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          required></Input>
        <FeedbackValidation>{formErrors.password}
        </FeedbackValidation>

        <Input type='password' placeholder='Re-password'
          name='confirmPassword'
          value={formData.confirmPassword}
          onChange={handleChange}
          required></Input>
        <FeedbackValidation>{formErrors.confirmPassword}</FeedbackValidation>

        <Button disabled={isLoading?true : false} style={{backgroundColor:isLoading?"gray":""}} type='submit'>{isLoading ? 'Loading...' : 'Sign Up'}</Button>
        <span>Already user? <Link to="/">Login here</Link></span>
      </Form>
    </Container>

  )
}

export default Registratoin
