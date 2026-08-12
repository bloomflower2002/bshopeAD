import { Metadata } from 'next';
import AuctionsClient from './AuctionsClient';

export const metadata: Metadata = {
  title: 'Auctions - BShope Auction Platform',
  description: 'Browse and bid on amazing items at BShope auctions.',
};

export default function AuctionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      <main className="max-w-[1150px] mx-auto px-6 py-[18px] pb-20">
        {/* Header Section */}
        <section className="product-header mb-8">
          <h1 className="text-[42px] font-bold mb-[14px]">
            Featured <span className="text-[#fa6204]">Auctions</span>
          </h1>
          <p className="text-[#fa6204] text-lg leading-relaxed">
            Explore our newest items available for bidding right now.
          </p>
        </section>

        <AuctionsClient />
      </main>
    </div>
  );
}
