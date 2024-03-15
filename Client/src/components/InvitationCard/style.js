import styled from 'styled-components';
import tw from 'twin.macro';


export const Wrapper = styled.div`${tw`
 md:flex
 w-full
 mt-[1px]
 bg-[#ffffff]
 shadow-lg
 flex  justify-between items-center p-2
`}`;

export const DetailsWrapper = styled.div`${tw`
 flex flex-col gap-1
`}`;
export const InviteText = styled.div`${tw`
font-bold text-gray-800
`}`;

export const Address = styled.div`${tw`
text-gray-600
`}`;
export const RoomInfoButton = styled.button`${tw`
bg-blue-600 text-white font-bold border-none rounded
cursor-pointer p-2
`}`;

