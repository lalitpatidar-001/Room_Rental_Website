import React, { useContext, useState } from 'react'
import { Button, Container, Heading, Input, Form, Feedback } from '../../styles/styles';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import ServerError from './ServerError'
import FeedBack from './FeedBack';
import Loader from '../../components/Loader/Loader';
function Login() {
    const {isLoggedIn, setIsLoggedIn} = useContext(userContext);
    const [isLoading , setIsLoading]  = useState(false)
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errorMessages, setErrorMessages] = useState([]);
    const [feedback , setFeedback] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        // console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages([]);
        setFeedback("") // Clear previous error messages
        try {
            setIsLoading(true)
            const response = await axios.post("http://localhost:5000/api/auth/login",formData);
            const data = response.data;
            const {_id , email} = data;

            if(response.status === 200 && data.msg === "authentic user"){
                localStorage.setItem("local-user" , JSON.stringify({_id,email}))
                setIsLoggedIn({_id,email});
                navigate("/")
            }
        
        } catch (error) {
            // const status = error.response.status;
            // const response = error.response;
            // const msg =  response.data.msg

            if(error.response.status === 404 && error.response.data.msg === "wrong email"){
                setFeedback(error.response.data.msg)
            }
            else if(error.response.status === 401 && error.response.data.msg === "wrong credentials"){
                setFeedback(error.response.data.msg)
            }else{
                setFeedback("something went wrong")
            }
            // server error
            if(error.response.data.errors?.length >0  && error.response.status === 400 ){
             setErrorMessages(error.response.data.errors.map((error) => error.msg));
            }
        }finally{
            setIsLoading(false)
        }
    }

    if(isLoading) return <Loader text="Loading..."/>
  return (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Heading> Please Login here</Heading>
            <ServerError errors={errorMessages}/>
            <FeedBack feedback={feedback} />
            <Input type='email' placeholder='enter your email' onChange={handleChange}
            name='email'
            required
            value={formData.email}/>

            <Input type='password' placeholder='enter password' onChange={handleChange}
            value={formData.password}
            name='password'
                required
            />

            <Button type='submit'>Sign In</Button>
            <span>New user? <Link to="/register">Register here</Link></span>
        </Form>
    </Container>
    
  )
}

export default Login