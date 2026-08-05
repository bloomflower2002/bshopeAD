export interface FooterProps {
  className?: string;
  onSubscribe?: (email: string) => void;
}

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

export interface QuickLink {
  href: string;
  label: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://facebook.com', icon: 'fa-facebook-f', label: 'Facebook' },
  { href: 'https://instagram.com', icon: 'fa-instagram', label: 'Instagram' },
  { href: 'https://linkedin.com', icon: 'fa-linkedin-in', label: 'LinkedIn' },
  { href: 'https://twitter.com', icon: 'fa-twitter', label: 'Twitter' },
  { href: 'https://youtube.com', icon: 'fa-youtube', label: 'YouTube' },
];

export const QUICK_LINKS: QuickLink[] = [
  { href: '/dashboard', label: 'Home' },
  { href: '/auctions', label: 'Auctions' },
  { href: '/product', label: 'Product' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export const LEGAL_LINKS: QuickLink[] = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/cookies', label: 'Cookie Policy' },
];