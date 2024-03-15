import styled from 'styled-components';
import tw from 'twin.macro';


export const Wrapper = styled.div`${tw`
 max-w-[900px]
 w-full
 flex flex-col gap-2 bg-white
`}`
export const Container = styled.div`${tw`
 max-w-[900px]
 w-full
 flex  
`}`

export const Heading = styled.span`${tw`
text-lg text-gray-800 font-semibold
`}`
export const Details = styled.span`${tw`
text-lg text-gray-800 font-semibold pl-2
`}`
export const DetailWrapper = styled.span`${tw`
flex items-center gap-1
`}`
export const Head = styled.span`${tw`
text-lg text-gray-600 font-semibold pl-2
`}`
export const Right = styled.div`${tw`
flex-1
flex flex-col gap-1
`}`
export const Value = styled.div`${tw`
text-gray-700
`}`
export const Email = styled.div`${tw`
text-gray-700
`}`

export const Left = styled.div`${tw`
 flex-1
 flex flex-col gap-1
`}`
export const RoomPrice = styled.div`${tw`
 
`}`
export const Options = styled.div`${tw`
 pl-4 flex gap-3
`}`
export const CancelButton = styled.div`${tw`
    text-white bg-red-600 rounded p-2 w-fit 
    
    font-bold cursor-pointer
`}`
export const AcceptButton = styled.div`${tw`
    text-white bg-green-600 rounded p-2 w-fit 
    font-bold cursor-pointer
`}`