import React from 'react'
import Link from 'next/link'
import Image from 'next/image'  // Using next/image for better performance
import { urlFor } from '../lib/client'

const Allproducts = ({ allproducts: { image, name, slug, tags, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='Allproduct-card'>
          {/* Using next/image instead of img */}
          <Image 
            src={urlFor(image && image[0])} 
            width={250} 
            height={270} 
            alt={name}  // Descriptive alt text for accessibility
            className="Allproduct-image"
          />
          <p className='Allproduct-name'>{name}</p>
          <p className='Allproduct-tags'>{tags}</p>
          <p className='Allproduct-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Allproducts
