export type SearchPhase = 'menu' | 'search' | 'closed';

export interface NavbarProps {
  className?: string;
  onSearch?: (query: string, category: string) => void;
  onSignIn?: () => void;
}

export interface SearchCategory {
  value: string;
  label: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export const SEARCH_CATEGORIES: SearchCategory[] = [
  { value: 'all', label: 'All' },
  { value: 'electronic', label: 'Electronic' },
  { value: 'art', label: 'Art' },
  { value: 'home-accessories', label: 'Home Accessories' },
  { value: 'perfume', label: 'Perfume' },
  { value: 'watch', label: 'Watch' },
];

export const NAV_LINKS: NavLink[] = [
  { href: '/auctions', label: 'Auctions' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];