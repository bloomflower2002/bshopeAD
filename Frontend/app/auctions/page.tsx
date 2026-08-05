import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auctions - BShope Auction Platform',
  description: 'Browse and bid on amazing items at BShope auctions.',
};

interface AuctionProduct {
  id: number;
  image: string;
  alt: string;
  title: string;
  bid: string;
  category?: string;
  timeLeft?: string;
  currentBid?: number;
}

const AUCTION_PRODUCTS: AuctionProduct[] = [
  {
    id: 1,
    image: '/airpod.jpg',
    alt: 'Wireless Airbuds auction',
    title: 'Wireless Airbuds',
    bid: 'Starting bid: 59ETB',
    category: 'Electronics',
    timeLeft: '2h 30m',
    currentBid: 59,
  },
  {
    id: 2,
    image: '/iphone.jpg',
    alt: 'iPhone auction',
    title: 'Smartphone',
    bid: 'Starting bid: 199ETB',
    category: 'Electronics',
    timeLeft: '5h 15m',
    currentBid: 199,
  },
  {
    id: 3,
    image: '/mac.jpg',
    alt: 'Mac auction',
    title: 'Notebook',
    bid: 'Starting bid: 499ETB',
    category: 'Electronics',
    timeLeft: '1d 4h',
    currentBid: 499,
  },
  {
    id: 4,
    image: '/ps5.jpg',
    alt: 'PS5 auction',
    title: 'Gaming Console',
    bid: 'Starting bid: 299ETB',
    category: 'Gaming',
    timeLeft: '3h 45m',
    currentBid: 299,
  },
  {
    id: 5,
    image: '/speaker.jpg',
    alt: 'AXESS Speaker auction',
    title: 'Wireless Speaker',
    bid: 'Starting bid: 149ETB',
    category: 'Electronics',
    timeLeft: '12h 20m',
    currentBid: 149,
  },
  {
    id: 6,
    image: '/black.jpg',
    alt: 'Black auction',
    title: 'Airpods',
    bid: 'Starting bid: 299ETB',
    category: 'Electronics',
    timeLeft: '2d 8h',
    currentBid: 299,
  },
  {
    id: 7,
    image: '/chair.jpg',
    alt: 'Chair auction',
    title: 'Gaming Chair',
    bid: 'Starting bid: 199ETB',
    category: 'Furniture',
    timeLeft: '1d 6h',
    currentBid: 199,
  },
  {
    id: 8,
    image: '/oven.jpg',
    alt: 'Oven auction',
    title: 'Electric Oven',
    bid: 'Starting bid: 299ETB',
    category: 'Appliances',
    timeLeft: '4h 30m',
    currentBid: 299,
  },
  {
    id: 9,
    image: '/keyboard.jpg',
    alt: 'Keyboard auction',
    title: 'Gaming Keyboard',
    bid: 'Starting bid: 99ETB',
    category: 'Electronics',
    timeLeft: '6h 45m',
    currentBid: 99,
  },
  {
    id: 10,
    image: '/fans.jpg',
    alt: 'Fans auction',
    title: 'Home Fans',
    bid: 'Starting bid: 49ETB',
    category: 'Appliances',
    timeLeft: '3h 20m',
    currentBid: 49,
  },
  {
    id: 11,
    image: '/TCL40.jpg',
    alt: 'TCL40 auction',
    title: '40-inch Smart TV',
    bid: 'Starting bid: 299ETB',
    category: 'Electronics',
    timeLeft: '1d 12h',
    currentBid: 299,
  },
  {
    id: 12,
    image: '/iron.jpg',
    alt: 'Iron auction',
    title: 'Electric Iron',
    bid: 'Starting bid: 299ETB',
    category: 'Appliances',
    timeLeft: '2h 15m',
    currentBid: 299,
  },
  {
    id: 13,
    image: '/powerbanker.jpg',
    alt: 'Powerbanker auction',
    title: 'Portable Power Bank',
    bid: 'Starting bid: 99ETB',
    category: 'Electronics',
    timeLeft: '8h 30m',
    currentBid: 99,
  },
  {
    id: 14,
    image: '/sonybluetooth.jpg',
    alt: 'Sony Bluetooth auction',
    title: 'Wireless Bluetooth Speaker',
    bid: 'Starting bid: 149ETB',
    category: 'Electronics',
    timeLeft: '5h 45m',
    currentBid: 149,
  },
  {
    id: 15,
    image: '/smartwatch.jpg',
    alt: 'Smartwatch auction',
    title: 'Smartwatch',
    bid: 'Starting bid: 199ETB',
    category: 'Electronics',
    timeLeft: '4h 10m',
    currentBid: 199,
  },
  {
    id: 16,
    image: '/sonicheadphone.jpg',
    alt: 'Sonic Headphone auction',
    title: 'Wireless Headphones',
    bid: 'Starting bid: 199ETB',
    category: 'Electronics',
    timeLeft: '7h 25m',
    currentBid: 199,
  },
];

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

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-3 flex-wrap">
            <button className="px-4 py-2 bg-[#fa6204] text-white rounded-full text-sm font-semibold hover:bg-[#ff7a2f] transition-colors duration-200">
              All
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-colors duration-200">
              Electronics
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-colors duration-200">
              Appliances
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-colors duration-200">
              Gaming
            </button>
            <button className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-semibold hover:bg-white/20 transition-colors duration-200">
              Furniture
            </button>
          </div>
          <select className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#fa6204] transition-colors text-sm">
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="ending-soon">Ending Soon</option>
          </select>
        </div>

        {/* Product Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {AUCTION_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] rounded-2xl p-5 shadow-[0_20px_60px_rgba(9,38,33,0.06)] hover:shadow-[0_20px_60px_rgba(250,98,4,0.1)] transition-all duration-300 hover:-translate-y-1 border border-white/5 hover:border-[#fa6204]/30"
            >
              <div className="relative">
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#fa6204] text-white text-[10px] font-semibold rounded-full uppercase">
                  {product.category}
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] font-semibold rounded-full backdrop-blur-sm">
                  ⏱ {product.timeLeft}
                </div>
                <div className="relative w-full h-[180px] bg-gray-800 rounded-[18px] overflow-hidden mb-[18px]">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2.5 text-center">{product.title}</h3>
              <p className="text-[#fa6204] text-[15px] text-center font-semibold">
                {product.bid}
              </p>
              <button className="w-full mt-4 px-4 py-2 bg-[#fa6204] text-white rounded-full text-sm font-semibold hover:bg-[#ff7a2f] transition-colors duration-200">
                Place Bid
              </button>
            </article>
          ))}
        </section>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-200">
            Load More Auctions
          </button>
        </div>
      </main>
    </div>
  );
}