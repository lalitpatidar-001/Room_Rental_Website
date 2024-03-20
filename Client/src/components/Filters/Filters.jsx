import React, { useEffect, useState } from 'react'
import { CheckboxContainer, CheckboxInput, ClearAll, Container, FilterDiv, FilterToggle, Heading, Input, InputCheckboxContainer, InputContainer, Left, LeftWrapper, Max, Min, PriceRange, Right, SearchInput, SelectDiv, SelectTag, Wrapper } from './style'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { bathroom_facility_list, furnitureFacility_list, residenttype_list, roomPrivacy_list, tenant_list } from './filterList';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAllRooms } from '../../redux/slices/roomSlice';

function Filters() {
  const dispatch = useDispatch();
  const {filteredRooms} = useSelector(state=>state.room);
  const [residentType, setResidentType] = useState(null);
  const [tenantType, setTenantType] = useState(null);
  const [maxTenant, setMaxTenant] = useState(null);
  const [floorNumber, setFloorNumber] = useState(null);
  const [roomPrivacy, setRoomPrivacy] = useState(null);
  const [bathroomPrivacy, setBathroomPrivacy] = useState(null);
  const [furnitureFacility, setFurnitureFacility] = useState(null);
  const [rent, setRent] = useState(null);
  const [accessbility, setAccessbility] = useState({
    parking: null,
    lift: null,
    wheelramp: null,
    petallowed: null,
  });

  const handleResetFilters = () => {
    setResidentType("");
    setTenantType("");
    setMaxTenant('');
    setFloorNumber("");
    setRoomPrivacy('');
    setBathroomPrivacy('');
    setFurnitureFacility('');
    setRent("");
    setAccessbility({
      parking: null,
      lift: null,
      wheelramp: null,
      petallowed: null,
    });

    console.log(
      "rent", rent, "\n",
      "residentType", residentType, "\n",
      "tenantType", tenantType, "\n",
      "maxTenant", maxTenant, "\n",
      "floorNumber", floorNumber, "\n",
      "roomPrivacy", roomPrivacy, "\n",
      "bathroomPrivacy", bathroomPrivacy, "\n",
      "furnitureFacility", furnitureFacility, "\n",
      "accessbility", accessbility, "\n",
    )
  }


  useEffect(() => {

    console.log(
      "rent", rent, "\n",
      "residentType", residentType, "\n",
      "tenantType", tenantType, "\n",
      "maxTenant", maxTenant, "\n",
      "floorNumber", floorNumber, "\n",
      "roomPrivacy", roomPrivacy, "\n",
      "bathroomPrivacy", bathroomPrivacy, "\n",
      "furnitureFacility", furnitureFacility, "\n",
      "accessbility", accessbility, "\n",
    )

    const fetchFilteredRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/room/filter-rooms/?residentType=${residentType}&rent=${rent}&tenantType=${tenantType}&maxTenant=${maxTenant}&floorNumber=${floorNumber}&roomPrivacy=${roomPrivacy}&bathroomPrivacy=${bathroomPrivacy}&furnitureFacility=${furnitureFacility}&accessbility=${JSON.stringify(accessbility)}`);


        console.log(response)
        console.log(response.data.data)
        // setFilteredRooms(response.data.data)
        dispatch(addAllRooms({data:response.data.data}))

      } catch (error) {
        console.error('Error fetching filtered mobiles:', error);
      }
    };

    fetchFilteredRooms();
  }, [
    rent,
    residentType,
    tenantType,
    maxTenant,
    floorNumber,
    roomPrivacy,
    bathroomPrivacy,
    furnitureFacility,
    accessbility]);


  const handleFilterTogle = () => {
    const leftFilter = document.querySelector('.left-filter');

    leftFilter.classList.toggle("leftDisplay");

  }

  const handleChangeAccessbility = (e) => {
    if (e.target.value === "Parking") {
      setAccessbility((prev) => ({ ...prev, parking: accessbility.parking ? false : true }))
    }
    if (e.target.value === "Lift") {
      setAccessbility((prev) => ({ ...prev, lift: accessbility.lift ? false : true }))
    }
    if (e.target.value === "WheelRamp") {
      setAccessbility((prev) => ({ ...prev, wheelramp: accessbility.wheelramp ? false : true }))
    }
    if (e.target.value === "PetAllowed") {
      setAccessbility((prev) => ({ ...prev, petallowed: accessbility.petallowed ? false : true }))
    }
  }

  return (
    <>
      {/* <Wrapper> */}


      <FilterToggle onClick={handleFilterTogle} className='filterToggle'>Filter <KeyboardArrowDownOutlinedIcon /></FilterToggle>
      <Left className='left-filter '>
        <LeftWrapper >
          <FilterDiv>
            <Heading>Filter Rooms</Heading>
            <ClearAll onClick={handleResetFilters} >Reset </ClearAll>
          </FilterDiv>

          {/* resident type */}
          <SelectDiv>
            <label>Resident Type : </label>
            <SelectTag name="residentType" id="residentType" value={residentType} onChange={(e) => setResidentType(e.target.value)}>
              <option value="">Any</option>
              {
                residenttype_list?.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))
              }
            </SelectTag>
          </SelectDiv>

          <hr />

          {/* tenant type */}
          <SelectDiv>
            <label>Tenant Type : </label>
            <SelectTag name="tenantType" id="tenantType" value={tenantType} onChange={(e) => setTenantType(e.target.value)}>
            <option value="">Any</option>
              {
                tenant_list?.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))
              }
            </SelectTag>
          </SelectDiv>

          <hr />

          {/* <label>Model</label>
          <SearchInput value={model} placeholder='search by name' onChange={(e) => (setModel(e.target.value))} /> */}

          <hr />

          <lable>Price Range</lable>
          <SearchInput type="number" name="rent" value={rent} placeholder='eg: 2000' onChange={(e) => setRent(e.target.value)} />

          <hr />

          <label>Max tenant</label>
          <SearchInput type="number" value={maxTenant} placeholder='eg: 2' onChange={(e) => setMaxTenant(e.target.value)} />

          <hr />
          <label>Room floor</label>
          <SearchInput type="number" value={floorNumber} placeholder='eg: 0 for ground floor' onChange={(e) => setFloorNumber(e.target.value)} />

          <hr />

          {/* room privacy type */}
          <SelectDiv>
            <label>Room Privacy : </label>
            <SelectTag name="roomPrivacy" id="roomPrivacy" value={roomPrivacy} onChange={(e) => setRoomPrivacy(e.target.value)}>
            <option value="">Any</option>
              {
                roomPrivacy_list?.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))
              }
            </SelectTag>
          </SelectDiv>

          <hr />

          {/* bathroom facility */}
          <SelectDiv>
            <label>Bathroom Facility : </label>
            <SelectTag name="bathroomPrivacy" id="bathroomPrivacy" value={bathroomPrivacy} onChange={(e) => setBathroomPrivacy(e.target.value)}>
            <option value="">Any</option>
              {
                bathroom_facility_list?.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))
              }
            </SelectTag>
          </SelectDiv>

          <hr />

          {/* Furniture Facility */}
          <SelectDiv>
            <label>Furniture Facility : </label>
            <SelectTag name="furnitureFacility" id="furnitureFacility" value={furnitureFacility} onChange={(e) => setFurnitureFacility(e.target.value)}>
            <option value="">Any</option>
              {
                furnitureFacility_list?.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))
              }
            </SelectTag>
          </SelectDiv>

          <hr />

          {/* accessbility */}
          <label>Accessbilities</label>
          <InputCheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput id="Lift"
                value="Lift"
                type="checkbox" onChange={handleChangeAccessbility} checked={accessbility.lift} />
              <label htmlFor='Lift'>Lift</label>
            </CheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput id="Parking"
                value="Parking"
                type="checkbox" onChange={handleChangeAccessbility} checked={accessbility.parking} />
              <label htmlFor='Parking'>Parking</label>
            </CheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput id="Wheel Ramp"
                value="WheelRamp"
                type="checkbox" onChange={handleChangeAccessbility} checked={accessbility.wheelramp} />
              <label htmlFor='Wheel Ramp'>Wheel Ramp</label>
            </CheckboxContainer>

            <CheckboxContainer>
              <CheckboxInput id="Pets Allowed"
                value="PetAllowed"
                type="checkbox" onChange={handleChangeAccessbility} checked={accessbility.petallowed} />
              <label htmlFor='Pets Allowed'>Pets Allowed</label>
            </CheckboxContainer>

          </InputCheckboxContainer>


        </LeftWrapper>
      </Left>


      {/* </Wrapper> */}
    </>
  )
}

export default Filters