import React, { useState } from 'react';
import { client, urlFor } from '../../lib/client';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { CgShoppingCart } from 'react-icons/cg';
import { useStateContext } from '../../context/StateContext';
import Image from 'next/image'; // Import Image from Next.js

const ProductDetails = ({ product }) => {
  const { image, name, details, price, tags, care } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd } = useStateContext();

  const careList = care.map((careItem) => careItem.children[0].text); // Improved care list mapping

  return (
    <div className='products'>
      <div className='product-detail-container'>
        <div className='product-images'>
          <div className='small-images-container'>
            {image?.map((item, ind) => (
              <Image
                key={ind}
                src={urlFor(item)}
                alt={name}
                width={80} // Adjust width
                height={80} // Adjust height
                className='small-image'
                onMouseEnter={() => setIndex(ind)}
              />
            ))}
          </div>
          <div className='big-image-container'>
            <Image
              src={urlFor(image && image[index])}
              alt={name}
              width={600} // Adjust width
              height={600} // Adjust height
            />
          </div>
        </div>
        <div className='product-details'>
          <div className='name-and-category'>
            <h3>{name}</h3>
            <span>{tags}</span>
          </div>
          <div className='size'>
            <p>SELECT SIZE</p>
            <ul>
              <li>XS</li>
              <li>S</li>
              <li>M</li>
              <li>L</li>
              <li>XL</li>
            </ul>
          </div>
          <div className='quantity-desc'>
            <h4>Quantity: </h4>
            <div>
              <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
            </div>
          </div>
          <div className='add-to-cart'>
            <button className='btn' type='button' onClick={() => onAdd(product, qty)}>
              <CgShoppingCart size={20} /> Add to Cart
            </button>
            <p className='price'>${price}.00</p>
          </div>
        </div>
      </div>

      <div className='product-desc-container'>
        <div className='desc-title'>
          <div className="desc-background">Overview</div>
          <h2>Product Information</h2>
        </div>
        <div className='desc-details'>
          <h4>PRODUCT DETAILS</h4>
          <p>{details[0].children[0].text}</p>
        </div>
        <div className='desc-care'>
          <h4>PRODUCT CARE</h4>
          <ul>
            {careList.map((list, index) => (
              <li key={index}>{list}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  return {
    props: { product },
  };
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
