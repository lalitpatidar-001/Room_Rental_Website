import React, { useContext, useEffect, useState } from 'react'
import { AddRoomButton, AddressForm, BigLabel, Container, Form, Image, ImageWrapper, Input, InputContainer, InputFile, InputGroup, InputNumber, InputText, InputWrapper, Label, MainContainer, SelectDiv, SelectTag, Wrapper } from './newRoomStyle'
import Navbar from '../../components/Navbar/Navbar'
import toast from 'react-hot-toast';
import axios from 'axios';
import { userContext } from '../../context/userContext';
import Loader from '../../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { updateRoom } from '../../redux/slices/roomSlice';
import { useNavigate } from 'react-router-dom';

const NewRoomPage = () => {
    const { isLoggedIn } = useContext(userContext);
    const [IsLoading , setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [residentType, setResidentType] = useState("Room");
    const [tenantType, setTenantType] = useState("Any");
    const [roomType, setRoomType] = useState(null);
    const [rent, setRent] = useState(null);
    const [maxTenant, setMaxTenant] = useState(null);

    const [floorNumber, setFloorNumber] = useState(null)
    const [roomPrivacy, setRoomPrivacy] = useState("Private");
    const [bathroomPrivacy, setBathroomPrivacy] = useState("Private");
    const [furnitureFacility, setFurnitureFacility] = useState("Not Furnished");
    const [furnitureFacilityValues, setFurnitureFacilityValues] = useState("");

    const initialValue = {
        name: "",
        contact: "",
        city: "",
        district: "",
        state: "",
        area: "",
        pincode: "",
    }
    const [address, setAddress] = useState(initialValue);

    const [waterFacilty, setWaterFacility] = useState({
        isFee: false,
        rent: ""
    });
    const [gasFacilty, setGasFacility] = useState({
        isFee: false,
        rent: ""
    });
    const [internetFacilty, setInternetFacility] = useState({
        isFee: false,
        rent: ""
    });

    const [accessbility, setAccessbility] = useState({
        parking: false,
        lift: false,
        wheelramp: false,
        petallowed: false
    })
    const [photos, setPhotos] = useState([]);


    const handleResetFields = ()=>{
        setResidentType("Room");
        setTenantType("Any");
        setRoomType(null);
        setRent(null);
        setMaxTenant(null);
        setFloorNumber(null);
        setRoomPrivacy("Private");
        setBathroomPrivacy("Private");
        setFurnitureFacility("Not Furnished");
        setFurnitureFacilityValues("");
        setAddress(initialValue);
        setWaterFacility({
            isFee: false,
            rent: ""
        });
        setGasFacility({
            isFee: false,
            rent: ""
        });
        setInternetFacility({
            isFee: false,
            rent: ""
        });
        setAccessbility({
            parking: false,
            lift: false,
            wheelramp: false,
            petallowed: false
        });
        setPhotos([]);

    }



    const handelFormSubmit = async (e) => {
        e.preventDefault();

        if (!roomType) return toast.error("Enter room type");
        if (!rent) return toast.error("Enter room rent");
        if (!maxTenant) return toast.error("Enter max tenant");
        if (photos.length === 0) return toast.error("Must add at least one photo of the room");

        try {
            console.log("datataaa", waterFacilty, gasFacilty, internetFacilty, accessbility)
            let roomData = new FormData();
            roomData.append("residentType", residentType);
            roomData.append("rent", rent);
            roomData.append("tenantType", tenantType);
            roomData.append("roomType", roomType);
            roomData.append("maxTenant", maxTenant);
            roomData.append("floorNumber", floorNumber);
            roomData.append("roomPrivacy", roomPrivacy);
            roomData.append("bathroomPrivacy", bathroomPrivacy);
            roomData.append("furnitureFacility", furnitureFacility);
            roomData.append("furnitureFacilityValues", furnitureFacilityValues);
            roomData.append("waterFacilty", JSON.stringify(waterFacilty));
            roomData.append("gasFacilty", JSON.stringify(gasFacilty));
            roomData.append("internetFacilty", JSON.stringify(internetFacilty));
            roomData.append("accessbility", JSON.stringify(accessbility));
            roomData.append("address", JSON.stringify(address));

            // Append each photo individually
            photos.forEach((photo) => {
                roomData.append("images", photo);
            });
            setIsLoading(true)
            const response = await axios.post(`http://localhost:5000/api/room/add-room/${isLoggedIn._id}`, roomData
                , {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if(response.status === 201){
                toast.success("Room Added Successfully");
                dispatch(updateRoom({data:response.data.data}));
                navigate("/")
            }
            console.log(response);
        } catch (error) {
            console.log(error);
        }finally{
            setIsLoading(false)
        }
    }

    const handlePhotoChange = (event) => {
        const selectedPhotos = Array.from(event.target.files);
        // Ensure that we only add up to 6 photos
        if (selectedPhotos.length + photos.length > 6) {
            return toast.error("Can select max 6 images")
        }
        // Update state with the selected photos
        setPhotos([...photos, ...selectedPhotos]);
        console.log("photos", photos)
    };

    const handelWaterFacilty = (e) => {
        setWaterFacility((prev) => ({ ...prev, isFee: waterFacilty.isFee ? false : true }))
    }
    const handelGasFacilty = (e) => {
        setGasFacility((prev) => ({ ...prev, isFee: gasFacilty.isFee ? false : true }))
    }
    const handelInternetFacilty = (e) => {
        setInternetFacility((prev) => ({ ...prev, isFee: internetFacilty.isFee ? false : true }))
    }

    const handleAccessbility = async (e) => {
        if (e.target.value === "Parking Space") {
            setAccessbility((prev) => ({ ...prev, parking: accessbility.parking ? false : true }))
        }
        if (e.target.value === "Lift") {
            setAccessbility((prev) => ({ ...prev, lift: accessbility.lift ? false : true }))
        }
        if (e.target.value === "Wheel Ramp") {
            setAccessbility((prev) => ({ ...prev, wheelramp: accessbility.wheelramp ? false : true }))
        }
        if (e.target.value === "Pet Allowed") {
            setAccessbility((prev) => ({ ...prev, petallowed: accessbility.petallowed ? false : true }))
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAdd => ({ ...prevAdd, [name]: value }));
    }

    return (
        <>
            <Navbar />
            <Container>
                <Wrapper>
                    {IsLoading?<Loader text={"Saving Room Details"}/>:
                        
                        <Form onSubmit={handelFormSubmit}
                        enctype="multipart/form-data"
                    >
                        {/* resident and tenant type */}
                        <MainContainer >
                            <InputContainer >
                                <BigLabel htmlFor='Resident_Type'>Resident Type : </BigLabel>
                                <SelectDiv>
                                    <SelectTag name="residentType" id="Resident_Type"
                                        value={residentType} onChange={(e) => setResidentType(e.target.value)}
                                    >
                                        <option value="Room">Room</option>
                                        <option value="Flat">Flat</option>
                                        <option value="GirlsPG">Girls PG</option>
                                        <option value="BoysPG">Boys PG</option>
                                        <option value="BoysHostel">Boys Hostel</option>
                                    </SelectTag>
                                </SelectDiv>
                            </InputContainer>
                            <InputContainer >
                                <BigLabel htmlFor='Resident_Type'>Tenant Type : </BigLabel>
                                <SelectDiv>
                                    <SelectTag name="residentType" id="Resident_Type"
                                        value={tenantType} onChange={(e) => setTenantType(e.target.value)}
                                    >
                                        <option value="Any">Any</option>
                                        <option value="Boys">Boys</option>
                                        <option value="Girls">Girls</option>
                                        <option value="Married">Married</option>
                                        <option value="Family">Family</option>
                                        <option value="Bachelor">Bachelor</option>
                                    </SelectTag>
                                </SelectDiv>
                            </InputContainer>
                        </MainContainer>

                        {/* room type and rent */}
                        <MainContainer>
                            <InputContainer >
                                <BigLabel>Room Type</BigLabel>
                                <InputText type='text' required
                                    onChange={(e) => setRoomType(e.target.value)}
                                    placeholder='eg:1BHK Flat' />
                            </InputContainer>
                            <InputContainer >
                                <BigLabel>Room Rent</BigLabel>
                                <InputText type='number' required
                                    onChange={(e) => setRent(e.target.value)} placeholder='eg: 2000' />
                            </InputContainer>
                        </MainContainer>

                        {/* max tenant  */}
                        <MainContainer>
                            <InputContainer >
                                <BigLabel>Max Tenant</BigLabel>
                                <InputNumber type="number" required
                                    onChange={(e) => setMaxTenant(e.target.value)} placeholder='eg: 2' />
                            </InputContainer>
                            <InputContainer >
                                <BigLabel>Floor no.</BigLabel>
                                <InputNumber type="number" required
                                    onChange={(e) => setFloorNumber(e.target.value)} placeholder='eg: 0 for ground floor' />
                            </InputContainer>
                        </MainContainer>



                        {/* room privacy */}
                        <MainContainer>
                            <BigLabel>Room Privacy</BigLabel>
                            <InputWrapper>
                                <InputContainer>
                                    <Label>Private</Label>
                                    <InputFile type='radio' checked={roomPrivacy==="Private"} value="Private" name="roomPrivacy" onChange={(e) => setRoomPrivacy(e.target.value)} />
                                </InputContainer>
                                <InputContainer>
                                    <Label>Shared</Label>
                                    <InputFile type='radio'  checked={roomPrivacy==="Shared"} value="Shared" name="roomPrivacy" onChange={(e) => setRoomPrivacy(e.target.value)} />
                                </InputContainer>
                                <InputContainer>
                                    <Label>Apartment/Flat</Label>
                                    <InputFile type='radio' checked={roomPrivacy==="Flat"} value="Flat" name="roomPrivacy" onChange={(e) => setRoomPrivacy(e.target.value)} />
                                </InputContainer>
                            </InputWrapper>
                        </MainContainer>

                        {/* bathroom facilty */}
                        <MainContainer>
                            <BigLabel>Bathroom Facility</BigLabel>
                            <InputWrapper>
                                <InputContainer>
                                    <Label>Private</Label>
                                    <InputFile type='radio' checked={bathroomPrivacy==="Private"} value="Private" name="bathroomPrivacy" onChange={(e) => setBathroomPrivacy(e.target.value)} />
                                </InputContainer>
                                <InputContainer>
                                    <Label>Common</Label>
                                    <InputFile type='radio' value="Common" checked={bathroomPrivacy==="Common"} name="bathroomPrivacy" onChange={(e) => setBathroomPrivacy(e.target.value)} />
                                </InputContainer>
                            </InputWrapper>
                        </MainContainer>

                        {/* furniture facility */}
                        <MainContainer>
                            <BigLabel>Furniture Facility</BigLabel>
                            <InputWrapper>
                                <InputContainer>
                                    <Label>Not Furnished</Label>
                                    <InputFile type='radio' value="Not Furnished" checked={furnitureFacility === "Not Furnished"} name="furnitureFacility" onChange={(e) => setFurnitureFacility(e.target.value)} />
                                </InputContainer>
                                <InputContainer>
                                    <Label>Semi Furnished</Label>
                                    <InputFile  type='radio' value="Semi Furnished" checked={furnitureFacility === "Semi Furnished"} name="furnitureFacility" onChange={(e) => setFurnitureFacility(e.target.value)} />
                                </InputContainer>
                                <InputContainer>
                                    <Label>Full Furnished</Label>
                                    <InputFile type='radio' value="Full Furnished" checked={furnitureFacility === "Full Furnished"} name="furnitureFacility" onChange={(e) => setFurnitureFacility(e.target.value)} />
                                </InputContainer>
                            </InputWrapper>
                        </MainContainer>

                        {(furnitureFacility === "Full Furnished" || furnitureFacility === "Semi Furnished") &&
                            <MainContainer>
                                <InputContainer >
                                    <Label>Define Furniture Facilities</Label>
                                    <InputText type='text' required={furnitureFacility==="Semi Furnished" || "Full Furnished"}
                                        onChange={(e) => setFurnitureFacilityValues(e.target.value)} placeholder='eg: bed, desk, chair' />
                                </InputContainer>
                            </MainContainer>
                        }

                        {/* utilities bills  */}
                        <MainContainer>
                            <BigLabel>Utility Bills</BigLabel>
                            <InputWrapper>
                                <InputContainer>
                                    <Label>Water</Label>
                                    <InputFile
                                        type='checkbox'
                                        value="Water"
                                        checked={waterFacilty.isFee}
                                        name="waterFacility"
                                        onChange={handelWaterFacilty}
                                    />
                                    {waterFacilty.isFee &&
                                        <InputText
                                            type='number' required onChange={(e) => setWaterFacility((prev) => ({ ...prev, rent: e.target.value }))} placeholder='eg:charge per month' />}
                                </InputContainer>
                                <InputContainer>
                                    <Label>Gas</Label>
                                    <InputFile
                                        type='checkbox'
                                        value="Water"
                                        checked={gasFacilty.isFee}
                                        name="waterFacility"
                                        onChange={handelGasFacilty}
                                    />
                                    {gasFacilty.isFee &&
                                        <InputText
                                            type='number' required onChange={(e) => setGasFacility((prev) => ({ ...prev, rent: e.target.value }))} placeholder='eg:charge per month' />}
                                </InputContainer>
                                <InputContainer>
                                    <Label>Internet</Label>
                                    <InputFile
                                        type='checkbox'
                                        value="Water"
                                        checked={internetFacilty.isFee}
                                        name="internetFacility"
                                        onChange={handelInternetFacilty}
                                    />
                                    {internetFacilty.isFee &&
                                        <InputText
                                            type='number' required onChange={(e) => setInternetFacility((prev) => ({ ...prev, rent: e.target.value }))} placeholder='eg:charge per month' />}

                                </InputContainer>
                            </InputWrapper>
                        </MainContainer>

                        {/* accessbility */}
                        <MainContainer>
                            <BigLabel>Accessbilities</BigLabel>
                            <InputContainer>
                                <Label>Parking Space</Label>
                                <InputFile
                                    type='checkbox'
                                    value="Parking Space"
                                    checked={accessbility.parking}
                                    name="waterFacility"
                                    onChange={handleAccessbility}
                                />

                            </InputContainer>
                            <InputContainer>
                                <Label>Lift</Label>
                                <InputFile
                                    type='checkbox'
                                    value="Lift"
                                    checked={accessbility.lift}
                                    name="waterFacility"
                                    onChange={handleAccessbility}
                                />

                            </InputContainer>
                            <InputContainer>
                                <Label>wheelchair ramps</Label>
                                <InputFile
                                    type='checkbox'
                                    value="Wheel Ramp"
                                    checked={accessbility.wheelramp}
                                    name="internetFacility"
                                    onChange={handleAccessbility}
                                />


                            </InputContainer>
                            <InputContainer>
                                <Label>Pets Allowed</Label>
                                <InputFile
                                    type='checkbox'
                                    value="Pet Allowed"
                                    checked={accessbility.petallowed}
                                    name="internetFacility"
                                    onChange={handleAccessbility}
                                />


                            </InputContainer>
                        </MainContainer>
                        <MainContainer>Address</MainContainer>
                        <AddressForm >
                            <InputGroup>
                                <Input required name='name' onChange={handleOnChange} type='text' placeholder='name' value={address.name} />
                                <Input required name='contact' onChange={handleOnChange} type='number' placeholder='contact' value={address.contact} />
                            </InputGroup>
                            <InputGroup>
                                <Input required name='city' onChange={handleOnChange} type='text' placeholder='city' value={address.city} />
                                <Input required name='district' onChange={handleOnChange} type='text' placeholder='district' value={address.district} />
                            </InputGroup>
                            <InputGroup>
                                <Input required name='area' onChange={handleOnChange} type='text' placeholder='area' value={address.area} />
                                <Input required name='state' onChange={handleOnChange} type='text' placeholder='state' value={address.state} />
                            </InputGroup>
                            <InputGroup>
                                <Input required name='pincode' onChange={handleOnChange} type='text' placeholder='pincode' value={address.pincode} />
                            </InputGroup>
                        </AddressForm>

                        {/* room photos */}
                        <MainContainer>
                            <InputContainer>
                                <BigLabel>Room Photos</BigLabel>
                                <InputFile required type='file' name="images" accept="image/*" multiple onChange={handlePhotoChange} />
                            </InputContainer>
                        </MainContainer>
                        <ImageWrapper>
                        {
                            photos.length>0 &&
                            photos.map((item)=>(
                            <Image src={URL.createObjectURL(item)}/>
                            ))
                        }
                        </ImageWrapper>
                        <AddRoomButton type='submit'>
                            Add Room
                        </AddRoomButton>


                    </Form>}
                </Wrapper>
            </Container>
        </>
    )
}

export default NewRoomPage