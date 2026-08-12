'use client';

import { useState, useEffect, useRef, MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  className?: string;
  onSearch?: (query: string, category: string) => void;
  onSignIn?: () => void;
}

const SEARCH_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'art', label: 'Art' },
  { value: 'home-accessories', label: 'Home Accessories' },
  { value: 'perfume', label: 'Perfume' },
  { value: 'watch', label: 'Watch' },
];

const NAV_LINKS = [
  { href: '/auctions', label: 'Auctions' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const Navbar: React.FC<NavbarProps> = ({
  className = '',
  onSearch,
  onSignIn,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [desktopSearchActive, setDesktopSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const navbarRef = useRef<HTMLElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchInputRef = useRef<HTMLInputElement>(null);

  // True whenever any search UI (mobile or desktop) is up — used to hide
  // the regular navbar chrome while the person is searching.
  const isSearchActive = isSearchOpen || desktopSearchActive;

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
        setDesktopSearchActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && mobileSearchInputRef.current) {
      setTimeout(() => {
        mobileSearchInputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (desktopSearchActive && desktopSearchInputRef.current) {
      setTimeout(() => {
        desktopSearchInputRef.current?.focus();
      }, 50);
    }
  }, [desktopSearchActive]);

  // Single toggle opens/closes the menu and the mobile search together,
  // instead of cycling through mutually-exclusive phases.
  const handleMobileToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const nextOpen = !(isMenuOpen || isSearchOpen);
    setIsMenuOpen(nextOpen);
    setIsSearchOpen(nextOpen);
  };

  const handleDesktopSearchToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDesktopSearchActive(!desktopSearchActive);
  };

  const handleCloseDesktopSearch = () => {
    setDesktopSearchActive(false);
    setSearchQuery('');
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onSearch?.(searchQuery, category);
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query, selectedCategory);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery, selectedCategory);
    if (isSearchOpen) {
      setIsMenuOpen(false);
      setIsSearchOpen(false);
    }
  };

  const handleSignIn = (e: React.MouseEvent) => {
    e.preventDefault();
    onSignIn?.();
  };

  return (
    <nav
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 w-full box-border z-[1000] m-0 p-0 px-[30px] max-[860px]:px-5 flex justify-between items-center gap-5 font-sans h-[85px] max-[860px]:h-[70px] transition-[height] duration-300 ease-in-out bg-[radial-gradient(circle_at_50%_0%,rgba(122,92,255,0.25),transparent_45%),linear-gradient(180deg,#1B1E29_0%,#161922_50%,#14161F_100%)] ${className}`}
    >
      {/* Logo */}
      <div
        className={`flex items-center p-0 z-[1002] ${
          isSearchActive ? 'max-[860px]:invisible' : ''
        }`}
      >
        <Link href="/">
          <Image
            src="/bshopewhite.png"
            alt="BShop Logo"
            width={70}
            height={70}
            className="h-[70px] max-[480px]:h-[55px] w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Mobile actions: hamburger/search toggle + language */}
      <div className="hidden max-[860px]:flex items-center gap-3 z-[1002]">
        <button
          className={`cursor-pointer rounded-full bg-transparent border-none p-0 flex items-center justify-center transition-transform duration-200 active:scale-[0.92] ${
            isMenuOpen || isSearchOpen ? 'invisible' : ''
          }`}
          onClick={handleMobileToggle}
          aria-expanded={isMenuOpen || isSearchOpen}
          aria-label="Toggle navigation and search"
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="32" height="32">
            <line x1="25" y1="38" x2="37" y2="38" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="25" y1="50" x2="37" y2="50" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="25" y1="62" x2="37" y2="62" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
            <circle cx="56" cy="46" r="12" stroke="#ffffff" strokeWidth="4" fill="none" />
            <line x1="64.5" y1="54.5" x2="75" y2="65" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </button>
        <Link
          href="#"
          className={`flex items-center justify-center w-10 rounded-[60%] text-white bg-white/[0.08] border border-white/15 no-underline text-xs font-bold px-3.5 py-2 ${
            isSearchActive ? 'invisible' : ''
          }`}
        >
          EN
        </Link>
      </div>

      {/* Mobile search overlay — sits in the same row as the logo */}
      <div
        className={`hidden absolute top-0 left-0 right-0 w-full h-[70px] bg-[rgba(22,25,34,0.98)] backdrop-blur-md z-[1001] px-4 items-center ${
          isSearchOpen ? 'max-[860px]:flex' : ''
        }`}
      >
        <div className="w-full">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full bg-white/[0.06] border border-white/15 rounded-[40px] py-1 pl-3 pr-1">
            <select
              aria-label="Search category mobile"
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="border-none bg-transparent text-xs px-2 py-1.5 outline-none cursor-pointer font-medium text-[#e0e6ef] border-r border-white/20 appearance-none pr-5 min-w-[70px] max-[480px]:min-w-[60px] max-[480px]:text-[0.7rem]"
            >
              {SEARCH_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-[#1B1E29] text-[#f0f4fa]">
                  {cat.label}
                </option>
              ))}
            </select>
            <input
              ref={mobileSearchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="flex-1 border-none bg-transparent px-2 py-2 text-[0.9rem] max-[480px]:text-[0.8rem] outline-none text-[#f0f4fa] min-w-0 placeholder:text-[#9aa8b9] placeholder:font-light"
            />
            <button type="submit" className="flex items-center justify-center w-9 h-9 rounded-full bg-[#fa6204] text-white border-none cursor-pointer transition-colors text-sm hover:bg-[#ff7a2f]">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>

      {/* Nav links (desktop row / mobile dropdown) */}
      <ul
        className={`flex justify-center items-center gap-6 m-0 p-0 flex-1 text-lg
          max-[860px]:absolute max-[860px]:top-[70px] max-[860px]:left-4 max-[860px]:right-4 max-[860px]:w-[calc(100%-2rem)]
          max-[860px]:flex-col max-[860px]:items-start max-[860px]:bg-[rgba(22,25,34,0.98)] max-[860px]:border max-[860px]:border-white/10
          max-[860px]:p-6 max-[860px]:rounded-xl max-[860px]:gap-[18px] max-[860px]:shadow-[0_10px_30px_rgba(0,0,0,0.5)] max-[860px]:z-[1000]
          ${isMenuOpen ? '' : 'max-[860px]:hidden'}
          ${desktopSearchActive ? 'max-[861px]:invisible' : ''}`}
      >
        {NAV_LINKS.map((link) => (
          <li key={link.href} className="list-none">
            <Link href={link.href} className="text-white no-underline font-medium transition-colors hover:text-[#fa6204]">
              {link.label}
            </Link>
          </li>
        ))}
        <li className="list-none hidden max-[860px]:block w-full mt-2.5">
          <Link
            href="/signin"
            onClick={handleSignIn}
            className="block text-center py-2.5 px-2.5 bg-[#fa6204] rounded-[30px] font-bold text-white no-underline"
          >
            <i className="fas fa-user"></i> Sign In
          </Link>
        </li>
      </ul>

      {/* Desktop actions */}
      <div className="flex items-center gap-3 z-[1002] max-[860px]:hidden">
        <div ref={desktopSearchRef} className="relative flex items-center">
          <form
            onSubmit={handleSearchSubmit}
            className={`flex items-center bg-[rgba(22,25,34,0.95)] border border-white/15 rounded-[40px] p-1 backdrop-blur-md transition-all duration-200 ${desktopSearchActive ? 'w-[520px]' : 'w-[260px]'}`}
          >
            <select
              aria-label="Search category"
              onChange={handleCategoryChange}
              value={selectedCategory}
              className="border-none bg-transparent text-[0.85rem] py-2.5 px-4 outline-none cursor-pointer font-medium text-[#e0e6ef] appearance-none pr-0 min-w-[100px]"
            >
              {SEARCH_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-[#1B1E29] text-[#f0f4fa]">
                  {cat.label}
                </option>
              ))}
            </select>
            <div className="h-7 w-px bg-white/20 ml-[-72] mr-2" />
            <input
              ref={desktopSearchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchInput}
              className="flex-1 bg-transparent px-0 py-2.5 text-[0.95rem] outline-none text-[#f0f4fa] min-w-[10px] placeholder:text-[#9aa8b9] placeholder:font-light"
            />
            <button
              type="submit"
              className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-[#fa6204] text-white border-none cursor-pointer transition-colors text-base hover:bg-[#ff7a2f]"
            >
              <i className="fas fa-search"></i>
            </button>
            {desktopSearchActive && (
              <button
                type="button"
                onClick={handleCloseDesktopSearch}
                className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-transparent text-[#e0e6ef] border-none cursor-pointer text-2xl transition-colors hover:bg-white/10"
              >
                ×
              </button>
            )}
          </form>
        </div>

        <Link
          href="#"
          className={`no-underline text-white font-semibold px-3.5 py-2 rounded-[20px] border border-white/30 bg-white/10 transition-colors hover:bg-white/20 ${
            isSearchActive ? 'invisible' : ''
          }`}
        >
          EN
        </Link>
        <Link
          href="/signin"
          onClick={handleSignIn}
          className={`no-underline text-white font-semibold text-[15px] px-[18px] py-2 rounded-[20px] border border-[#fa6204] bg-[#fa6204] transition-colors hover:bg-[#ff7a2f] hover:border-[#ff7a2f] ${
            isSearchActive ? 'invisible' : ''
          }`}
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
