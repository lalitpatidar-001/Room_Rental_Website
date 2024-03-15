import styled from 'styled-components';
import tw from 'twin.macro';

export const Container = styled.div`${tw`
 mt-[50px]
 bg-[#F0F2F5]
 min-h-[calc(100vh - 50px)]
 flex justify-center
`}`

export const Wrapper = styled.div`${tw`
 max-w-[800px]
 w-full
 mt-1
 bg-white
 flex flex-col items-center
 p-4 
 shadow-lg
`}

`

export const Form = styled.form`${tw`
flex flex-col  gap-4 w-full
    
`}`
export const MainContainer = styled.div`${tw`
    flex gap-2   w-full 
`}`
export const InputContainer = styled.div`${tw`
    flex items-center    w-full
`}`
export const InputWrapper = styled.div`${tw`
    flex justify-start   w-full
`}`



export const InputText = styled.input`${tw`
p-2
py-3
w-full
outline-none
border
rounded
`}`
export const InputNumber = styled.input`${tw`
p-2
py-3

w-full
outline-none
border
rounded
`}`
export const InputFile = styled.input`${tw`
    cursor-pointer
`}`

export const Label = styled.label`${tw`
    text-gray-500
`}`
export const BigLabel = styled.label`${tw`
    text-gray-700
 
`}`

export const AddRoomButton = styled.button`${tw`
p-2
bg-orange-500
rounded
border-none
text-white
font-semibold
cursor-pointer
shadow-lg
`}`

export const SelectDiv = styled.div`
${tw`
flex
flex-col
gap-[5px]
w-fit
`}`

export const SelectTag = styled.select`
${tw
        `
  p-1
  outline-none
  shadow-sm
  rounded
  w-full

`}`



// address

export const AddressForm = styled.div`
${tw`
flex flex-col gap-2 
rounded
border-[2px] border-black
`}`


export const InputGroup = styled.div`
${tw`
flex
w-full
gap-1
`}`
export const Input = styled.input`
${tw`
p-2
py-3

w-full
outline-none
border
rounded
`}`

export const ButtonWrapper = styled.div`
${tw`
flex gap-3
w-full
`}`
export const Button = styled.button`
${tw`
flex-1
p-2
px-4
text-white
bg-orange-500
border-none
rounded
font-semibold
cursor-pointer
`}`
export const CancelButton = styled.button`
${tw`
flex-1
p-2
px-4
bg-transparent
cursor-pointer
text-blue-500
border-[1px]
border-blue-500
rounded
`}`


// photos 
export const ImageWrapper = styled.div`
${tw`
    flex gap-[1px] justify-evenly overflow-hidden
`}`
export const Image = styled.img`
${tw`
    h-[100px]
    w-[100px]
`}`