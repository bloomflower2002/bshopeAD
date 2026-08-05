import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | BShope Auction Platform',
  description: 'Read the Terms of Service for BShope. Learn about your rights and responsibilities when using our auction platform.',
};

interface TermSection {
  title: string;
  content: string;
}

const TERMS_SECTIONS: TermSection[] = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing or using BShope, you agree to these Terms of Service and any additional policies posted on the site.',
  },
  {
    title: '2. Eligibility',
    content: 'You must be at least 18 years old and legally able to enter into binding contracts to use BShope. Minors may use the site only with the permission of a parent or guardian.',
  },
  {
    title: '3. Account Responsibilities',
    content: 'Keep your account information current and secure. You are responsible for any activity performed through your account.',
  },
  {
    title: '4. Bidding and Winning',
    content: 'All bids are final. Winning an auction creates a binding purchase agreement between you and the seller.',
  },
  {
    title: '5. Payments and Fees',
    content: 'Payment is due immediately after winning an auction. BShope may charge fees for using the platform and reserves the right to update fee schedules.',
  },
  {
    title: '6. Shipping and Delivery',
    content: 'Sellers are responsible for shipping items to buyers. Delivery terms, costs, and tracking are set by the seller unless otherwise stated.',
  },
  {
    title: '7. Returns and Refunds',
    content: 'Return policies are determined by individual sellers. Review the item listing carefully before placing a bid.',
  },
  {
    title: '8. Prohibited Conduct',
    content: 'Do not misrepresent items, manipulate auctions, or violate any laws. BShope reserves the right to suspend or terminate accounts for improper conduct.',
  },
  {
    title: '9. Intellectual Property',
    content: 'All content on BShope is protected by copyright and trademark law. You may not reuse our materials without permission.',
  },
  {
    title: '10. Disclaimer',
    content: 'BShope provides the platform "as is." We do not guarantee the accuracy, reliability, or suitability of listings or services.',
  },
  {
    title: '11. Limitation of Liability',
    content: 'To the fullest extent permitted by law, BShope is not liable for damages arising from your use of the platform.',
  },
  {
    title: '12. Changes to Terms',
    content: 'We may update these Terms at any time. Continued use of BShope after changes means you accept the revised Terms.',
  },
  {
    title: '13. Contact Us',
    content: 'If you have questions about these Terms, please contact support@bshope.com.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      <main className="max-w-[1150px] mx-auto px-6 py-[18px] pb-20">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-[42px] font-bold mb-5 leading-tight">
            Terms of <span className="text-[#fa6204]">Service</span>
          </h1>
          <p className="text-[#fcfdfd] text-lg leading-relaxed max-w-[720px]">
            These Terms govern your use of BShope. Please read them carefully before using our auction platform.
          </p>
        </section>

        {/* Terms Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TERMS_SECTIONS.map((section, index) => (
            <div
              key={index}
              className="bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] rounded-2xl p-7 shadow-[0_20px_60px_rgba(9,38,33,0.06)] border border-white/5 hover:border-[#fa6204]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#fa6204]/20 text-[#fa6204] font-bold text-sm flex-shrink-0 mt-0.5">
                  {section.title.split('.')[0]}
                </span>
                <h3 className="text-xl font-bold m-0">{section.title}</h3>
              </div>
              <p className="text-white/80 leading-relaxed pl-11">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Last Updated Section */}
        <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/10 text-center">
          <p className="text-white/60 text-sm">
            Last Updated: {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </main>
    </div>
  );
}