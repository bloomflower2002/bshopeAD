'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const shouldShowNavbar = pathname !== '/signin' && pathname !== '/signin/';
  const shouldShowFooter = pathname !== '/signin' && pathname !== '/signin/';

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowNavbar && <Navbar />}
      <main className={`flex-1 ${shouldShowNavbar ? 'pt-[70px] md:pt-[70px]' : 'pt-0'}`}>
        {children}
      </main>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default Layout;