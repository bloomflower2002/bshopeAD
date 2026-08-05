'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

interface QuickLink {
  href: string;
  label: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://facebook.com', icon: 'fa-facebook-f', label: 'Facebook' },
  { href: 'https://instagram.com', icon: 'fa-instagram', label: 'Instagram' },
  { href: 'https://linkedin.com', icon: 'fa-linkedin-in', label: 'LinkedIn' },
];

const QUICK_LINKS: QuickLink[] = [
  { href: '/', label: 'Home' },
  { href: '/product', label: 'Product' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

const LEGAL_LINKS: QuickLink[] = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
];

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`bg-[#14161F] text-[#e3f6eb] py-[44px] px-6 pb-6 ${className}`}>
      <div className="max-w-[1150px] mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/dashboard">
              <Image
                src="/bshopewhite.png"
                alt="BShop Logo"
                width={60}
                height={60}
                className="h-[60px] w-auto mb-[18px]"
                priority
              />
            </Link>
            <p className="max-w-[460px] leading-relaxed text-[#cfe7d7] m-0">
              Bid smart, win big. BShope brings you trusted auctions, top products, 
              and support around the clock.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links md:pt-[5px]">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#d4f2da] no-underline mb-2.5 text-[15px] transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact Section */}
          <div className="footer-contact md:pt-[5px]">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <p className="text-[#d4f2da] mb-2.5 text-[15px]">Email: support@bshope.com</p>
            <p className="text-[#d4f2da] mb-2.5 text-[15px]">Phone: +251970490048</p>
            <p className="text-[#d4f2da] mb-2.5 text-[15px]">Address: jemo 3, market place</p>
            
            {/* Social Links */}
            <div className="flex gap-3 mt-[14px]">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex items-center justify-center w-[38px] h-[38px] rounded-full bg-white/10 text-white transition-all duration-200 ease-in-out hover:bg-[#fa6204] hover:-translate-y-0.5"
                >
                  <i className={`fab ${social.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Legal Links */}
          <div className="footer-links md:pt-[5px]">
            <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#d4f2da] no-underline mb-2.5 text-[15px] transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-[1150px] mx-auto pt-6 text-center text-[#8eb79b] text-sm border-t border-white/10">
          © {currentYear} BShope. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;