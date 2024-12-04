import React from 'react';
import { client } from '../lib/client';
import { AllProducts } from '../components';

const kids = ({ AllKidsProducts }) => {
    return (
        <div className='Allproducts-container'>
            {AllKidsProducts && AllKidsProducts.length > 0 ? (
                AllKidsProducts.map(prod => (
                    <AllProducts key={prod._id} allproducts={prod} />
                ))
            ) : (
                <p>No kids' products available at the moment!</p>
            )}
        </div>
    );
};

export const getServerSideProps = async () => {
    const query = '*[_type == "product" && category == "Kids"]';
    const AllKidsProducts = await client.fetch(query);

    return {
        props: { AllKidsProducts },
    };
};

export default kids;
