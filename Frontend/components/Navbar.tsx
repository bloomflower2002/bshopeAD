'use client';

import { useState, useEffect, useRef, MouseEvent, RefObject } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/navbar.css';

type SearchPhase = 'menu' | 'search' | 'closed';

interface NavbarProps {
  // Add any props you might need in the future
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchPhase, setSearchPhase] = useState<SearchPhase>('closed');
  const [desktopSearchActive, setDesktopSearchActive] = useState<boolean>(false);
  
  const navbarRef = useRef<HTMLElement | null>(null);
  const desktopSearchRef = useRef<HTMLDivElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent): void => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setSearchPhase('closed');
        setDesktopSearchActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Handle desktop search toggle
  useEffect(() => {
    const handleClickOutsideDesktop = (event: globalThis.MouseEvent): void => {
      if (desktopSearchRef.current && !desktopSearchRef.current.contains(event.target as Node)) {
        setDesktopSearchActive(false);
      }
    };

    document.addEventListener('click', handleClickOutsideDesktop);
    return () => document.removeEventListener('click', handleClickOutsideDesktop);
  }, []);

  // Focus mobile search input when opened
  useEffect(() => {
    if (isSearchOpen && mobileSearchInputRef.current) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  const handleMobileToggle = (e: MouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    e.preventDefault();

    if (searchPhase === 'closed' || searchPhase === 'menu') {
      // Open menu
      setSearchPhase('menu');
      setIsMenuOpen(true);
      setIsSearchOpen(false);
    } else if (searchPhase === 'menu' && isMenuOpen) {
      // Switch from menu to search
      setIsMenuOpen(false);
      setIsSearchOpen(true);
      setSearchPhase('search');
    } else {
      // Close everything
      setSearchPhase('closed');
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const handleDesktopSearchToggle = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDesktopSearchActive(!desktopSearchActive);
    if (!desktopSearchActive) {
      setTimeout(() => {
        const input = desktopSearchRef.current?.querySelector('input');
        if (input) input.focus();
      }, 0);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const category = e.target.value;
    console.log('Category selected:', category);
    // Handle category change logic here
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const query = e.target.value;
    console.log('Search query:', query);
    // Handle search logic here
  };

  return (
    <nav ref={navbarRef} className={`navbar ${className}`}>
      {/* Logo */}
      <div className="logo">
        <Link href="/">
          <Image
            src="/bshopewhite.png"
            alt="BShop Logo"
            width={70}
            height={70}
            className="bshope-img"
            priority
          />
        </Link>
      </div>

      {/* Mobile Actions */}
      <div className="mobile-actions">
        <button
          className="menu-toggle"
          onClick={handleMobileToggle}
          aria-expanded={searchPhase !== 'closed'}
          aria-label="Toggle navigation and search"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="32"
            height="32"
            className="search-icon-btn"
          >
            <line x1="25" y1="38" x2="37" y2="38" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="25" y1="50" x2="37" y2="50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="25" y1="62" x2="37" y2="62" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="56" cy="46" r="12" stroke="#ffffff" strokeWidth="4" fill="none" />
            <line x1="64.5" y1="54.5" x2="75" y2="65" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </button>
        <Link href="#" className="language-btn mobile-language-btn">
          EN
        </Link>
      </div>

      {/* Navigation Links (Mobile Dropdown) */}
      <ul className={`navlinks ${isMenuOpen ? 'active' : ''}`}>
        <li><Link href="/auctions">Auctions</Link></li>
        <li><Link href="/about">About Us</Link></li>
        <li><Link href="/contact">Contact</Link></li>
        <li className="mobile-signin">
          <Link href="/signin">
            <i className="fas fa-user"></i> Sign In
          </Link>
        </li>
      </ul>

      {/* Mobile Search Panel */}
      <div className={`mobile-search-panel ${isSearchOpen ? 'active' : ''}`}>
        <div className="search-toggle">
          <select 
            aria-label="Search category mobile"
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="electronic">Electronic</option>
            <option value="art">Art</option>
            <option value="home-accessories">Home Accessories</option>
            <option value="perfume">Perfume</option>
            <option value="watch">Watch</option>
          </select>
          <input
            ref={mobileSearchInputRef}
            type="text"
            className="search-bar-inline"
            placeholder="Search..."
            onChange={handleSearchInput}
          />
        </div>
      </div>

      {/* Desktop Navigation Actions */}
      <div className="nav-actions">
        <div
          ref={desktopSearchRef}
          className={`search-toggle desktop-search ${desktopSearchActive ? 'active' : ''}`}
        >
          <select 
            aria-label="Search category"
            onChange={handleCategoryChange}
          >
            <option value="all">All</option>
            <option value="electronic">Electronic</option>
            <option value="art">Art</option>
            <option value="home-accessories">Home Accessories</option>
            <option value="perfume">Perfume</option>
            <option value="watch">Watch</option>
          </select>
          <input
            type="text"
            className="search-bar-inline"
            placeholder="Search..."
            onChange={handleSearchInput}
          />
          <button
            className="search-icon-btn"
            aria-label="Search"
            onClick={handleDesktopSearchToggle}
            type="button"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
        <Link href="#" className="language-btn desktop-language">EN</Link>
        <Link href="/signin" className="signin-btn">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;