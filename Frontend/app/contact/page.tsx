import { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact BShope - Get in Touch',
  description: 'Need help with a bid or want to partner with us? Reach out and we\'ll get back to you as soon as possible.',
};

export default function ContactPage() {
  return <ContactClient />;
}