import React, { useRef } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineShopping } from 'react-icons/ai';
import { HiOutlineTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
import Image from 'next/image'; // Import Image from Next.js

const Cart = () => {
  const cartRef = useRef();
  const { cartItems, totalPrice, totalQty, onRemove, toggleCartItemQuantity } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShopping size={150} />
              <h1>Your shopping bag is empty</h1>
            </div>
          )}

          {cartItems.length >= 1 && cartItems.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-image">
                <Image 
                  src={urlFor(item?.image[0] || '/fallback-image.jpg')} // fallback image
                  alt={item.name} 
                  width={250} // specify width
                  height={270} // specify height
                />
              </div>
              <div className="item-details">
                <div className="name-and-remove">
                  <h3>{item.name}</h3>
                  <button type="button" onClick={() => onRemove(item)} className="remove-item">
                    <HiOutlineTrash size={28} />
                  </button>
                </div>
                <p className="item-tag">{item.tags || 'Dress'}</p> {/* dynamic tags */}
                <p className="delivery-est">Delivery Estimation</p>
                <p className="delivery-days">5 Working Days</p>
                <div className="price-and-qty">
                  <span className="price">${item.price * item.quantity}</span>
                  <div>
                    <span className="minus" onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                    <span className="num">{item.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="qty">
              <p>Quantity</p>
              <span>{totalQty} Product{totalQty !== 1 ? 's' : ''}</span> {/* pluralizes 'Product' based on quantity */}
            </div>
            <div className="subtotal">
              <p>Sub Total</p>
              <span>${totalPrice}</span>
            </div>
            <div>
              <button className="btn" type="button" onClick={handleCheckout}>Process to Checkout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
