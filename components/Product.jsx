import React from 'react'
import Link from 'next/link'
import Image from 'next/image' // Import the Next.js Image component
import { urlFor } from '../lib/client'

const Product = ({product: {image, name, slug, price}}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          {/* Use Image component for better performance and optimization */}
          <Image
            src={urlFor(image && image[0])}  // Image source URL
            alt={name}  // Use the product name for alt text (for accessibility)
            width={380}  // Define width for image
            height={400} // Define height for image
            className='product-image'
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product
