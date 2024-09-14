import React, { useCallback, useEffect, useState } from 'react';
import  Axios from 'axios';
import '../App.css'
import "aos/dist/aos.css";  
import AOS from "aos"; 
import image from '../Images/shoe1.png';
import image1 from '../Images/cloth1.png';
import image2 from '../Images/cloth2.PNG';
import back from '../Images/back.PNG';
import shoe3 from '../Images/shoe3.PNG';
import shoe4 from '../Images/shoe4.PNG';
import cloth3 from '../Images/cloth3.PNG';
import cloth4 from '../Images/cloth4.PNG';

function Home() {

    
    const [reviewData, setReviewData] = useState(null)

    const images = [
        {id: 1, image: image, title: "Shoes", description: "Step into style with our versatile shoe collection. From sleek formal shoes to casual comfort, find the perfect pair for any occasion for both men and women."},
        {id: 2, image: image1, title: "Clothes", description: "Discover stylish and comfortable clothing for every occasion. From casual to formal, our collection offers high-quality, trendy options for both men and women."},
        //{id: 3, image: image2, title: "shoe3", description: "This is the third stylish shoe"},
      ];
    const [currentImage, setCurrentImage] = useState(0);
    const [currentReview, setCurrentReview] = useState(0);

    const background_image = [
        {id: 3, image: back, title: "What we believe in", description: "As a company, we believe in customer satisfaction"},

    ]

    const clothes = [
        {id: 1, image: shoe3, title: "Men Tree Gliders"},
        {id: 1, image: shoe4, title: "Women's flats"},
        {id: 1, image: cloth3, title: "Men's T-shirt"},
        {id: 1, image: cloth4, title: "Women's dress"}
    ]
    
    
    let hasPrev = currentImage>0;
    let hasNext = currentImage < images.length - 1;

    let nextReview = currentReview>0;
    let prevReview = currentReview < reviewData - 1;

    const handleNext = () => {
        setCurrentImage((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const handlePrevious = () => {
        setCurrentImage((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };

      useEffect(() => {  
        AOS.init();  
    }, []); 

      useEffect(() =>{
        const interval = setInterval(() =>{
            handleNext();
        }, 3000);
        return () => clearInterval(interval);
      }, [currentImage]);

    

    useEffect(() => {
        Axios.get(`http://127.0.0.1:8000/reviews/`).then((res) =>{
            setReviewData(res.data)

        })
        .catch((error) => {
            console.error("Error fetching the data:", error)
        })
    }, []);
    //}

    const handleNextReview = () => {
        if (reviewData) {
        setCurrentReview((prevIndex) =>
            prevIndex === reviewData.length - 1 ? 0 : prevIndex + 1
        );
        }
      };

    const handlePreviousReview = () => {
        if (reviewData) {
        setCurrentReview((prevIndex) =>
            prevIndex === 0 ? reviewData.length - 1 : prevIndex - 1
        );
        }
      };

      useEffect(() =>{
        const interval = setInterval(() =>{
            handleNextReview();
        }, 3000);
        return () => clearInterval(interval);
      }, [currentReview, reviewData]);

      if (!reviewData) {
        return <div>Loading...</div>
      }

       
    
    return(
        <div>
            <div className='bg-orange-300 text-4xl relative overflow-hidden'>
                <p className='slide-left whitespace-nowrap'>Buy more, Spend less</p>
            </div>

            <div id='slider' data-aos="fade-up">
                <div className="slider-content">
                    <div className="text-content">
                        <h2 className='font-bold text-7xl mb-2.5'>{images[currentImage].title}</h2>
                        <p className='text-4xl'>{images[currentImage].description}</p>
                    </div>
                    <div className="image-content mr-3.5">
                        <img
                            key={images[currentImage].id}
                            src={images[currentImage].image}
                            alt="product"
                        />
                    </div>
                </div>
                <button id='prev' onClick={handlePrevious} disabled = {!hasPrev}>Prev</button>
                <button id='next' onClick={handleNext} disabled = {!hasNext}>Next</button>
            </div>
            <h1>{/*time*/}</h1>

            <div className='company-belief relative' data-aos="fade-up" data-aos-duration="3000">
                <img className='left-0 w-full object-cover'
                key = {background_image[0].id} 
                src = {background_image[0].image}
                alt='back image'
                />
                <div className='absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white'>
                    <h2 className='font-bold text-7xl mb-2.5'>{background_image[0].title}</h2>
                    <p className='text-4xl'>{background_image[0].description}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                <div className='w-5/6 p-4' data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                        <img className=''
                            width={1200}
                            height={15}
                            key={clothes[0].id}
                            src={clothes[0].image}
                            alt="product"
                        />
                        <h2 className=''>{clothes[0].title}</h2>
                    </div>

                    <div className='w-5/6 p-4' data-aos="fade-right" data-aos-offset="300"
                    data-aos-easing="ease-in-sine">
                        <img className=''
                            key={clothes[1].id}
                            src={clothes[1].image}
                            alt="product"
                        />
                        <h2 className=''>{clothes[1].title}</h2>
                    </div>

                    <div className='w-5/6 p-4' data-aos="flip-left" data-aos-easing="ease-out-cubic"
                    data-aos-duration="2000">
                        <img className='w-5/6'
                            key={clothes[2].id}
                            src={clothes[2].image}
                            alt="product"
                        />
                        <h2 className=''>{clothes[2].title}</h2>
                    </div>

                    <div className='w-5/6 p-4' data-aos="fade-left">
                        <img className=''
                            key={clothes[3].id}
                            src={clothes[3].image}
                            alt="product"
                        />
                        <h2 className=''>{clothes[3].title}</h2>
                    </div>
                </div>

                <div className='w-11/12 md:w-1/2 bg-red-100 p-8 rounded-lg shadow-lg mb-7 mx-auto'>  
                    <h2 className='text-3xl font-semibold text-center mb-4'>Customer Reviews</h2>  
                    <p className='text-xl italic text-gray-700 mb-2'>{reviewData[currentReview]?.review}</p>  
                    <p className='text-lg font-medium text-right text-gray-900'>{reviewData[currentReview]?.customer_name}</p>  
                </div> 

            
            
        </div>
    );
}

export default Home;