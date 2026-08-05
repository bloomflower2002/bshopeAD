import type { Metadata } from 'next';
import './globals.css';
import Layout from '@/components/Layout';

export const metadata: Metadata = {
  title: 'BShope - Bid Smart, Win Big',
  description: 'The ultimate online auction platform where you can bid on a wide range of products from the comfort of your own home.',
  keywords: 'auctions, bidding, online shopping, BShope, marketplace, bid anywhere',
  openGraph: {
    title: 'BShope - Bid Smart, Win Big',
    description: 'The ultimate online auction platform',
    images: ['/bshope.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Black+Ops+One&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}