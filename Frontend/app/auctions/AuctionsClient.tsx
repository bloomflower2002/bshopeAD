
'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AUCTION_PRODUCTS } from './data';
import { useSearchParams } from 'next/navigation';

const CATEGORIES = ['All', 'Electronics', 'Appliances', 'Gaming', 'Furniture'];

export default function AuctionsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const searchParams = useSearchParams();
  const urlQuery = searchParams?.get('search') ?? '';
  const urlCat = searchParams?.get('cat') ?? '';

  useEffect(() => {
    if (urlCat) {
      // Normalize category param to a readable form when possible
      const normalized = urlCat === 'all' ? 'All' : urlCat.charAt(0).toUpperCase() + urlCat.slice(1);
      setActiveCategory(normalized);
    }
  }, [urlCat]);

  const filteredProducts = useMemo(() => {
    const query = (urlQuery ?? '').toLowerCase().trim();

    let products = [...AUCTION_PRODUCTS];

    // apply category filter from URL param or activeCategory
    const effectiveCat = urlCat ? urlCat.toLowerCase() : activeCategory !== 'All' ? activeCategory.toLowerCase() : '';
    if (effectiveCat && effectiveCat !== 'all') {
      products = products.filter((product) => (product.category ?? '').toLowerCase().includes(effectiveCat));
    }

    // apply text search if provided
    if (query) {
      products = products.filter((product) => {
        const title = product.title?.toLowerCase() ?? '';
        const desc = product.description?.toLowerCase() ?? '';
        const alt = product.alt?.toLowerCase() ?? '';
        return title.includes(query) || desc.includes(query) || alt.includes(query);
      });
    }

    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => (a.currentBid ?? 0) - (b.currentBid ?? 0));
        break;
      case 'price-high':
        products.sort((a, b) => (b.currentBid ?? 0) - (a.currentBid ?? 0));
        break;
      default:
        break;
    }

    return products;
  }, [activeCategory, sortBy, urlQuery, urlCat]);

  return (
    <>
      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-3 flex-wrap">
          {CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#fa6204] text-white hover:bg-[#ff7a2f]'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-white/10 focus:bg-[#1B1E29] border border-white/20 rounded-lg text-white focus:outline-none focus:border-[#fa6204] transition-colors text-sm"
        >
          <option value="newest">Newest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="ending-soon">Ending Soon</option>
        </select>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] rounded-2xl p-5 shadow-[0_20px_60px_rgba(9,38,33,0.06)] hover:shadow-[0_20px_60px_rgba(250,98,4,0.1)] transition-all duration-300 hover:-translate-y-1 border border-white/5 hover:border-[#fa6204]/30"
            >
              <div className="relative">
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#fa6204] text-white text-[10px] font-semibold rounded-full uppercase">
                  {product.category}
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 text-white text-[10px] font-semibold rounded-full backdrop-blur-sm">
                  ? {product.timeLeft}
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
              <p className="text-white/70 text-[13px] text-center mt-1">
                Current Bid: {product.currentBid}ETB | Bidders: {product.bidders}
              </p>
              <p className="text-white/70 text-[13px] text-center mt-1">
                Times Left: {product.timeLeft} | End Time: {product.endTime}
              </p>
              
              <Link
                href={`/auctions/${product.id}`}
                className="w-full inline-flex justify-center mt-4 px-4 py-2 bg-[#fa6204] text-white rounded-full text-sm font-semibold hover:bg-[#ff7a2f] transition-colors duration-200"
              >
                Bid Now
              </Link>
            </article>
          ))}
        </section>
      ) : (
        <div className="text-center py-20 text-white/60">
          No auctions found in this category.
        </div>
      )}

      {/* Load More Section */}
      {filteredProducts.length > 0 && (
        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-colors duration-200">
            Load More Auctions
          </button>
        </div>
      )}
    </>
  );
}
