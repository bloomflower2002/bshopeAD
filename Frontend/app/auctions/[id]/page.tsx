import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { AUCTION_PRODUCTS } from '../data';

interface Props {
  params: Promise<{ id: string }>;
}

const TERMS_OF_CONDITION = [
  'All bids are final and binding once submitted.',
  'You must be at least 18 years old to participate in auctions.',
  'Payment is due immediately upon winning an auction unless otherwise stated.',
  'Shipping costs, delivery times, and return policies may vary by seller.',
  'BShope reserves the right to remove or cancel listings at any time.',
  'No bid may be retracted after it has been placed. Make sure your bid is accurate.',
  'By participating, you agree to all site terms, conditions, and privacy policies.',
];

function normalizeId(rawId: string) {
  return Number.isNaN(Number(rawId)) ? rawId : Number(rawId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const normalizedId = normalizeId(id);
  const product = AUCTION_PRODUCTS.find((item) => item.id === normalizedId);

  if (!product) {
    return {
      title: 'Auction Not Found | BShope',
      description: 'The requested auction item could not be found.',
    };
  }

  return {
    title: `${product.title} - Bid Now | BShope Auction Platform`,
    description: `View details, description, and terms for ${product.title}.`,
  };
}

export default async function AuctionDetailPage({ params }: Props) {
  const { id } = await params;
  const normalizedId = normalizeId(id);
  const product = AUCTION_PRODUCTS.find((item) => item.id === normalizedId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
        <main className="max-w-[900px] mx-auto px-6 py-[18px] pb-20 text-center">
          <h1 className="text-[42px] font-bold mb-6">Auction not found</h1>
          <p className="text-white/70 mb-6">We couldn&apos;t find that item. Please return to the auction listings and choose another product.</p>
          <Link href="/auctions" className="inline-flex px-6 py-3 bg-[#fa6204] rounded-full font-semibold hover:bg-[#ff7a2f] transition-colors duration-200">
            Back to Auctions
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      <main className="max-w-[1000px] mx-auto px-6 py-[18px] pb-20">
        <section className="mb-10">
          <Link href="/auctions" className="text-sm text-[#fa6204] hover:text-[#ff7a2f] transition-colors duration-200">
            ← Back to Auctions
          </Link>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-start mt-6">
            <div className="relative rounded-[28px] overflow-hidden bg-gray-900 shadow-[0_20px_60px_rgba(9,38,33,0.06)] border border-white/10">
              <div className="relative h-[360px] sm:h-[420px] w-full">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-[#fa6204] uppercase tracking-[0.35em] text-xs font-semibold mb-3">
                  {product.category}
                </p>
                <h1 className="text-[42px] font-bold leading-tight mb-4">{product.title}</h1>
                <p className="text-white/80 text-base leading-relaxed">{product.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-[#111421] p-6">
                  <p className="text-sm text-white/70">Current Bid</p>
                  <p className="text-3xl font-bold text-[#fa6204] mt-2">{product.currentBid}ETB</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-[#111421] p-6">
                  <p className="text-sm text-white/70">Bidders</p>
                  <p className="text-3xl font-bold text-white mt-2">{product.bidders}</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#111421] p-6 space-y-4">
                <h2 className="text-xl font-bold">Terms and Conditions</h2>
                <ul className="list-disc list-inside space-y-3 text-white/80 text-sm">
                  {TERMS_OF_CONDITION.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/terms" className="inline-flex justify-center px-6 py-3 bg-white/10 text-white rounded-full font-semibold border border-white/10 hover:bg-white/20 transition-colors duration-200">
                  Read Full Terms
                </Link>
                <button className="inline-flex justify-center px-6 py-3 bg-[#fa6204] text-white rounded-full font-semibold hover:bg-[#ff7a2f] transition-colors duration-200">
                  Bid
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
