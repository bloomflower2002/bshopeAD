'use client';

import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';

interface Slide {
  id: number;
  images: string[];
  alt: string[];
}

interface Review {
  id: number;
  name: string;
  text: string;
  stars: number;
}

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen?: boolean;
}

const SLIDES: Slide[] = [
  {
    id: 0,
    images: ['/airpod.jpg', '/iphone.jpg', '/mac.jpg', '/BMW.jpg'],
    alt: ['Airpod auction', 'iPhone auction', 'Mac auction', 'BMW auction'],
  },
  {
    id: 1,
    images: ['/fridge.webp', '/makeupkit.jpg', '/ps5.jpg', '/porsche.jpg'],
    alt: ['Shopbrand', 'Makeup kit auction', 'PS5 auction', 'Porsche auction'],
  },
  {
    id: 2,
    images: ['/BMW.jpg', '/airpod.jpg', '/iphone.jpg', '/mac.jpg'],
    alt: ['Luxury car auction', 'Airpod auction', 'iPhone auction', 'Mac auction'],
  },
];

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah M.',
    text: 'Bshope made bidding feel exciting and effortless. I found amazing deals in just a few clicks.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Daniel K.',
    text: 'The interface is smooth, and the live auctions are so easy to follow. Highly recommended.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Amina R.',
    text: 'I love the variety of products and the secure bidding experience. It feels trustworthy.',
    stars: 5,
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: 'How do I start bidding?',
    answer: 'Create an account, verify your details, and place your first bid on any live auction.',
    isOpen: true,
  },
  {
    id: 2,
    question: 'Is there a fee to join?',
    answer: 'Joining Bshope is free, and membership perks are available for users who want extra benefits.',
    isOpen: false,
  },
  {
    id: 3,
    question: 'Can I bid from my phone?',
    answer: 'Yes, the platform is mobile-friendly, so you can browse and bid anytime from your device.',
    isOpen: false,
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(FAQ_ITEMS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [reviewText, setReviewText] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const sliderRef = useRef<HTMLDivElement>(null);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const toggleFAQ = (id: number) => {
    setFaqItems(
      faqItems.map((item) =>
        item.id === id ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const handleReviewSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!reviewText.trim()) {
      setError('Please write a review before submitting.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newReview: Review = {
        id: reviews.length + 1,
        name: 'Anonymous User',
        text: reviewText.trim(),
        stars: 5,
      };
      setReviews([newReview, ...reviews]);
      setReviewText('');
      setIsSubmitting(false);
    }, 1000);
  };

  const renderStars = (count: number) => {
    return '★'.repeat(count) + '☆'.repeat(5 - count);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      <main className="max-w-[1150px] mx-auto px-6 py-6 pb-20">
        {/* Hero Quote */}
        <h1 className="text-[clamp(32px,4vw,50px)] text-white text-center pt-[30px] px-5 m-0 mx-auto max-w-[1100px] font-['Black_Ops_One',sans-serif]">
          <span className="text-[#fa6204]">Bid</span> anywhere, anytime, on{' '}
          <span className="text-[#fa6204]">anything</span>
        </h1>
        <p className="text-base text-white max-w-[1000px] mx-auto mt-3 px-5 leading-relaxed">
          The ultimate online auction platform where you can bid on a wide range of products from the comfort of your own home.
        </p>
        <p className="text-base text-white max-w-[1000px] mx-auto mt-0 px-5 leading-relaxed">
          Join our community of passionate bidders and experience the thrill of winning at BShope!
        </p>

        {/* Slider Section */}
        <div className="max-w-[1100px] w-full mx-auto mt-10 relative">
          <div className="relative overflow-hidden rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-3 bg-[#14161F]">
            <div
              ref={sliderRef}
              className="transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              <div className="flex">
                {SLIDES.map((slide) => (
                  <div
                    key={slide.id}
                    className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full flex-shrink-0"
                  >
                    {slide.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="overflow-hidden rounded-xl bg-[#111] relative aspect-[4/3]"
                      >
                        <Image
                          src={img}
                          alt={slide.alt[idx] || 'Auction item'}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/45 text-white text-[28px] w-12 h-12 rounded-full border-none cursor-pointer z-10 hover:bg-black/65 transition-colors duration-200 flex items-center justify-center"
              aria-label="Previous slide"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/45 text-white text-[28px] w-12 h-12 rounded-full border-none cursor-pointer z-10 hover:bg-black/65 transition-colors duration-200 flex items-center justify-center"
              aria-label="Next slide"
            >
              ❯
            </button>

            {/* Dots */}
            <div className="text-center mt-4">
              {SLIDES.map((_, index) => (
                <span
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`inline-block w-3 h-3 mx-1.5 rounded-full cursor-pointer transition-colors duration-200 ${
                    currentSlide === index
                      ? 'bg-white'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="max-w-[1100px] mx-auto my-9 px-6 text-[#f5f7fb]">
          <h2 className="text-[28px] mb-4 text-white">Frequently Asked Questions</h2>
          <div className="grid gap-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 border border-white/15 rounded-xl p-[14px_16px] backdrop-blur-sm hover:border-[#fa6204] hover:shadow-[0_10px_24px_rgba(250,98,4,0.16)] transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full text-left cursor-pointer font-semibold text-white flex justify-between items-center"
                >
                  <span>{item.question}</span>
                  <span className="text-[#fa6204] text-xl">
                    {item.isOpen ? '−' : '+'}
                  </span>
                </button>
                {item.isOpen && (
                  <p className="mt-2.5 text-[#d8e0ea] leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section */}
        <section className="max-w-[1100px] mx-auto mb-[70px] px-6 text-[#f5f7fb]">
          <h2 className="text-[28px] mb-4 text-white">What Our Users Say</h2>

          {/* Review Form */}
          <form onSubmit={handleReviewSubmit} className="flex flex-col sm:flex-row gap-2.5 mb-5">
            <input
              type="text"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setReviewText(e.target.value);
                if (error) setError('');
              }}
              className="flex-1 min-w-[200px] px-[14px] py-3 border border-white/15 rounded-xl bg-white/10 text-white outline-none focus:border-[#fa6204] transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-3 border-none rounded-xl bg-[#fa6204] text-white cursor-pointer font-semibold whitespace-nowrap hover:bg-[#ff7a2f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {error && <p className="text-red-400 text-sm -mt-3 mb-3">{error}</p>}

          {/* Review Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="bg-white/10 border border-white/15 rounded-xl p-[18px] backdrop-blur-sm"
              >
                <div className="text-[#ffb703] tracking-[2px] mb-2.5">
                  {renderStars(review.stars)}
                </div>
                <p className="text-[#d8e0ea] leading-relaxed mb-3">
                  “{review.text}”
                </p>
                <h3 className="m-0 text-white font-semibold">{review.name}</h3>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}