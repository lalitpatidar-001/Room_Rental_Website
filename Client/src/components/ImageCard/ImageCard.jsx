import React, { useState } from 'react';
import { Container, Image, SmallImage, SmallImageDiv, Wrapper } from './style';
import photo from './phone.png';

function ImageCard({images}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  console.log("Images",images)
  const handleMouseEnter = (index)=>{
    setImageIndex(index);
    setSelectedImage(index);
  }

  const staticPath = "http://localhost:5000/image/";
  

  return (
    <Container>

      {images?.length >0 && 
        <Image src={(staticPath+images[imageIndex])} />}

      <SmallImageDiv>
        {images?.map((path, index) => (
          <SmallImage
            key={index}
            style={{ border: selectedImage === index ? '2px solid blue' : '2px solid lightgray' }}
            onMouseEnter={()=>handleMouseEnter(index)}
            src={(staticPath+path)}
          />
        ))}
      </SmallImageDiv>
    </Container>
  );
}

export default ImageCard;
