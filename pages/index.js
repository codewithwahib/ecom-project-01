import React from 'react';
import { client } from '../lib/client';
import { HeroBanner, EventsBanner, Newsletter, FeaturesBanner, Product } from '../components';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Home = ({ products }) => {
  return (
    <>
      <HeroBanner />
      <EventsBanner />

      <div className='products-outer-container'>
        <div className='subtitle'>
          <span>PRODUCTS</span>
          <h2>Check What We Have</h2>
        </div>
        <Swiper
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 100,
            },
            1000: {
              slidesPerView: 2,
              spaceBetween: 0,
            },
            1260: {
              slidesPerView: 3,
              spaceBetween: 0,
            },
          }}
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={3}
          navigation
        >
          <div className='products-container'>
            {products?.map((product) => (
              <SwiperSlide key={product._id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>

      <FeaturesBanner />
      <Newsletter />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  return {
    props: { products },
  };
};

export default Home;
