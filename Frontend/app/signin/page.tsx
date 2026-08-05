import { Metadata } from 'next';
import SignInClient from './SignInClient';

export const metadata: Metadata = {
  title: 'Sign In | BShope Auction Platform',
  description: 'Sign in to your BShope account to access auctions, track bids, and manage your membership.',
};

export default function SignInPage() {
  return <SignInClient />;
}