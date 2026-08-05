import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BShope Auction Platform',
  description: 'Read the Privacy Policy for BShope. Learn about how we collect, use, and protect your personal information.',
};

interface PrivacySection {
  title: string;
  content: string;
}

const PRIVACY_SECTIONS: PrivacySection[] = [
  {
    title: '1. Information We Collect',
    content: 'We collect information you provide when creating an account, placing bids, or contacting support. This may include your name, email address, shipping address, and payment details.',
  },
  {
    title: '2. How We Use Your Information',
    content: 'We use your information to process bids, complete transactions, send account notifications, and improve our services.',
  },
  {
    title: '3. Cookies and Tracking',
    content: 'We use cookies and similar technologies to enhance your site experience, analyze usage, and remember preferences.',
  },
  {
    title: '4. Sharing Information',
    content: 'We do not sell your personal information. We may share information with service providers, payment processors, or when required by law.',
  },
  {
    title: '5. Data Security',
    content: 'We take reasonable measures to protect your information, but no online service is completely secure. Please keep your account credentials private.',
  },
  {
    title: '6. Your Choices',
    content: 'You may update your information, opt out of marketing emails, or close your account by contacting our support team.',
  },
  {
    title: '7. Third-Party Services',
    content: 'We may use third-party services to operate the site and process payments. Their privacy practices are governed by their own policies.',
  },
  {
    title: '8. Children\'s Privacy',
    content: 'BShope is not intended for children under 13. We do not knowingly collect personal information from children without parental consent.',
  },
  {
    title: '9. Changes to This Policy',
    content: 'We may update this policy from time to time. When we do, we will post the revised policy on this page.',
  },
  {
    title: '10. Contact Us',
    content: 'If you have questions about this Privacy Policy, please email support@bshope.com.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      <main className="max-w-[1150px] mx-auto px-6 py-[18px] pb-20">
        {/* Hero Section */}
        <section className="mb-12">
          <h1 className="text-[42px] font-bold mb-5 leading-tight">
            Privacy <span className="text-[#fa6204]">Policy</span>
          </h1>
          <p className="text-[#fcfdfd] text-lg leading-relaxed max-w-[720px]">
            At BShope, your privacy matters. This policy explains how we collect, use, and protect your personal information.
          </p>
        </section>

        {/* Privacy Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PRIVACY_SECTIONS.map((section, index) => (
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