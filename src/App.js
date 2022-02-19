import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import './App.css';
import {useEffect, useRef, useState } from 'react';
import { FaArrowAltCircleRight , FaArrowAltCircleLeft } from 'react-icons/fa';

const first ={
  position:{
    x:"-100%",
    y:"-50%",
  },
  zIndex: 0,
  scale: 1,
};
const second ={
  position:{
    x:"-50%",
    y:"-50%",
  },
  zIndex: 2,
  scale: 1.4,
};
const third ={
  position:{
    x:"0%",
    y:"-50%",
  },
  zIndex: 1,
  scale: 0.9,
};
const positions =[first, second, third]; // secon third first
const Images =[
  {
  src: img1,
  alt: "cas 1",
  style: positions[0],
 
},
{
  src: img2,
  alt: "cas 2",
  style: positions[1],
},
{
  src: img3,
  alt: "cas 3",
  style: positions[2],
},
];

function App() {
  const [imagePositions, setImagesPositions]= useState(positions); // [var ,fn,init]
  const [images, setImages]= useState(Images);
  const timeoutRef = useRef(null);
  const nextImage =() => {
    const newPositions =[...imagePositions];
    const newImages =[...images];
    newPositions.push(newPositions.shift()); //123 ;231; 312 // 123 312 
    newImages.forEach((image,index) => {
      image.style = newPositions[index];
    });
    setImagesPositions(newPositions);  
    setImages(newImages);
  };
  //previous
  const previousImage =( ) => {
    const newPositionsPrev =[...imagePositions];
    const newImages =[...images];
    newPositionsPrev.unshift(newPositionsPrev.pop()); //123 ;231; 312 // 123 312 
    newImages.forEach((image,index) => {
      image.style = newPositionsPrev[index];
    });
    setImagesPositions(newPositionsPrev);  
    setImages(newImages);
  }
    ///
    const resetTimeout =() => {
      if(timeoutRef.current) clearInterval(timeoutRef.current);
    }
      //mounting phase

    useEffect(() => {
      resetTimeout();
      timeoutRef.current = setInterval(() =>
      {nextImage();}, 3000);

      return () => {
        resetTimeout();
      };

    }, [imagePositions, images]);

  return (
    <div className="App">
      <div className="Container">
        <div className='images'>
        {images.map(image => {
        const translate=`translate(${image.style.position.x},${image.style.position.y}) scale(${image.style.scale})`;
        return(
        
          <img
          key={image.src}
          className='image'
          src={image.src}
          alt={image.alt}
          onClick ={nextImage}
          style={{
            transform: translate ,
            zIndex: image.style.zIndex,
          }}
          />

        )
        })
      }
        </div>
        <div className='controls'>
        
  <FaArrowAltCircleLeft className='prec' size={40} onClick={nextImage}/>


  <FaArrowAltCircleRight className='next' size={40} onClick={previousImage}/>


{
  <div className='bulles'>
    {Array.from({length : 3}).map((item,index)=>
    <div className={ (Images[index].style.zIndex === 2) ? 'circleActive' : 'circlePassive' }></div>
    )}
    </div>
}
        
        
       </div>
    </div>
    </div>
  );
}

export default App;
