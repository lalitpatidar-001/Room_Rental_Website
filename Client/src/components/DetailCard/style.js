import styled from 'styled-components';
import tw from 'twin.macro';

export const Wrapper = styled.div`
${tw`
  flex 
  flex-col
  w-full
  min-h-[100vh]
  bg-white
`
    }`

export const Container = styled.div`${tw`
 w-full
 flex gap-[2px]
  bg-[#dddddd]
  mt-1
  h-full
`}`;

export const Left = styled.div`${tw`
 w-full
 flex-1
 px-4
 bg-white
 flex 
 flex-col
 gap-4
`}`;
export const ModelName = styled.div`${tw`
    text-xl
    capitalize
    font-[500]

`}`;
export const Address = styled.span`${tw`
flex
items-center
rounded
text-gray-700
 
`}`;
export const PriceDiv = styled.div`${tw`
flex
gap-2
items-center
`}`;
export const Price = styled.div`${tw`
flex
items-center
text-2xl
font-[600]
`}`;
export const OriginalPrice = styled.div`${tw`
 line-through
    text-gray-500
    font-[600]
`}

`;
export const Discount = styled.div`${tw`
text-green-600
font-[600]
`}`;

export const Features = styled.ul`${tw`
m-0
px-4
flex
flex-col
gap-3

`}`;
export const Feature = styled.li`${tw`
text-gray-700
text-[1rem]
capitalize
`}`

export const AddToCartButton = styled.div`${tw`

p-2
bg-blue-500
rounded
border-none
font-semibold
cursor-pointer
shadow-lg

`}`;

export const FeatureDiv  = styled.div`
${tw`
flex items-center
`}`

export const Right = styled.div`${tw`
 w-full
 flex-1
 h-[calc(100vh)]
 flex
 flex-col gap-1
 bg-white px-2
`}`;


export const Map = styled.div`${tw`
 h-[40vh]
`}`;
export const FullAddress = styled.div`${tw`
 h-[40vh]
 flex flex-col gap-2
`}`;

export const AddressHeading = styled.span`${tw`
text-gray-800 font-bold text-lg
`}`;
export const AddressRow = styled.div`${tw`
flex gap-1 items-center pl-3
`}`;
export const AddressHead = styled.span`${tw`
capitalize
text-gray-500
`}`;
export const AddressValue = styled.span`${tw`
capitalize
text-gray-700
`}`;
export const ButtonWrapper = styled.span`${tw`
flex flex-col  gap-2
`}`;

export const Button = styled.div`${tw`
py-2 
uppercase
bg-blue-500
border-none
text-white
rounded
text-xl
font-semibold
cursor-pointer
shadow-md
flex text-center
justify-center
gap-1
`}`;
export const Button2 = styled.div`${tw`
py-2 
uppercase
bg-orange-500
border-none
text-white
rounded
text-xl
font-semibold
cursor-pointer
shadow-md
flex text-center
justify-center
gap-1
`}`;



