import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { CgShoppingCart } from 'react-icons/cg';
import { CiSearch } from 'react-icons/ci';
import logo from '../src/assets/logo.png';
import Link from 'next/link';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQty } = useStateContext();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link href="/" aria-label="Home">
        <Image src={logo} width={140} height={25} alt="logo" priority />
      </Link>

      {/* Navigation Links */}
      <ul className="nav-links">
        <Link href="/male"><li>Male</li></Link>
        <Link href="/female"><li>Female</li></Link>
        <Link href="/kids"><li>Kids</li></Link>
        <Link href="/products"><li>All Products</li></Link>
      </ul>

      {/* Search Bar */}
      <div className="search-bar">
        <CiSearch />
        <input
          type="text"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter') handleSearchSubmit();
          }}
          aria-label="Search products"
        />
      </div>

      {/* Cart Button */}
      {showCart ? (
        <Link href="/cart">
          <button className="cart" onClick={() => setShowCart(false)} aria-label="Go to cart">
            <CgShoppingCart size={22} />
            <span className="cart-item-qty">{totalQty}</span>
          </button>
        </Link>
      ) : (
        <button className="cart" onClick={() => setShowCart(true)} aria-label="Open cart">
          <CgShoppingCart size={22} />
          <span className="cart-item-qty">{totalQty}</span>
        </button>
      )}

      {/* Small Screen Navigation */}
      <div className="navbar-smallscreen">
        <RiMenu3Line
          color="black"
          fontSize={27}
          aria-label="Open menu"
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="navbar-smallscreen_overlay">
            <Link href="/" aria-label="Home">
              <Image
                className="logo-small"
                src={logo}
                width={140}
                height={25}
                alt="logo"
              />
            </Link>
            <RiCloseLine
              color="black"
              fontSize={27}
              className="close_icon"
              aria-label="Close menu"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="navbar-smallscreen_links" role="menu">
              <Link href="/cart">
                <button
                  className="cart-small-screen"
                  onClick={() => setShowCart(false)}
                  aria-label="Go to cart"
                >
                  <CgShoppingCart size={22} />
                  <span className="cart-item-qty">{totalQty}</span>
                </button>
              </Link>
              <Link href="/female"><li>Female</li></Link>
              <Link href="/male"><li>Male</li></Link>
              <Link href="/kids"><li>Kids</li></Link>
              <Link href="/products"><li>All Products</li></Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
