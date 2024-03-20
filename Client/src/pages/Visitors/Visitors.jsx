import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Container, Wrapper } from './style'
import VisitorsCard from '../../components/VistorsCard/VisitorsCard'
import { userContext } from '../../context/userContext'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import NoResult from '../../components/utils/NoResultMatched/NoResult'
import { useSelector, useDispatch } from "react-redux"
import { addAllVisitors } from '../../redux/slices/visitorsSlice'
const Visitors = () => {
    const { isLoggedIn } = useContext(userContext);
    // const [visitors, setVisitors] = useState([]);
    const dispatch = useDispatch();
    const { visitors } = useSelector(state => state.visitors)
    const [IsLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getVisitors() {
            try {
                setIsLoading(true)
                const response = await axios.get(`http://localhost:5000/api/user/visitors/${isLoggedIn._id}`);
                console.log("dataaaa", response.data.data.visitors)
                dispatch(addAllVisitors({ data: response.data.data.visitors }))
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getVisitors();
    }, [isLoggedIn])

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    {IsLoading ? <Loader text="Loading Visitors" /> :
                        <>
                            {
                                visitors?.length <= 0 ? <NoResult text="No Visitors Yet!" /> :
                                    <>
                                        {
                                            visitors?.map((visitor) => (
                                                <VisitorsCard visitor={visitor} />
                                            ))
                                        }
                                    </>
                            }
                        </>
                    }
                </Wrapper>
            </Container>
        </>
    )
}

export default Visitors