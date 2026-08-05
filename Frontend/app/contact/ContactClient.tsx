'use client';

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Get credentials from environment variables
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_z2cbhtg';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_0pyhy7e';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '3iwC5ZT80miG5tAQk';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: 'fa-envelope',
    label: 'Email',
    value: 'support@bshope.com',
    link: 'mailto:support@bshope.com',
  },
  {
    icon: 'fa-phone',
    label: 'Phone',
    value: '+251970490048',
    link: 'tel:+251970490048',
  },
  {
    icon: 'fa-map-marker-alt',
    label: 'Address',
    value: '123 Auction Avenue, Market City',
  },
];

export default function ContactClient() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' | '' }>({
    message: '',
    type: '',
  });
  const formRef = useRef<HTMLFormElement>(null);

  // Initialize EmailJS
  useEffect(() => {
    try {
      emailjs.init(PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear feedback when user starts typing
    if (feedback.message) {
      setFeedback({ message: '', type: '' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const { name, email, subject, message } = formData;
    if (!name || !email || !subject || !message) {
      setFeedback({
        message: 'Please fill in all fields.',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback({ message: '', type: '' });

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
      };

      console.log('Sending email with params:', templateParams);

      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
      
      console.log('✅ Email sent successfully!', response);
      
      setFeedback({
        message: '✅ Your message has been sent successfully! We\'ll get back to you soon.',
        type: 'success',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset form fields
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (error: any) {
      console.error('❌ Failed to send email:', error);
      
      let errorMsg = 'Failed to send message. ';
      if (error.text) {
        try {
          const errData = JSON.parse(error.text);
          errorMsg += errData.message || 'Please try again.';
        } catch {
          errorMsg += 'Please try again.';
        }
      } else {
        errorMsg += 'Please try again later.';
      }
      
      setFeedback({
        message: `❌ ${errorMsg}`,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white">
      <main className="max-w-[1150px] mx-auto px-6 py-6 pb-20">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-[42px] font-bold mb-4 text-[#fa6204]">
            Contact <span className="text-white">BShope</span>
          </h1>
          <p className="text-lg text-white max-w-[720px] mx-auto">
            Need help with a bid or want to partner with us? Reach out and we'll get back to you as soon as possible.
          </p>
        </section>

        {/* Contact Content */}
        <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
          {/* Contact Info */}
          <div className="bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] rounded-2xl p-8 lg:pr-12 shadow-[0_20px_60px_rgba(9,38,33,0.06)] border border-white/5">
            <h2 className="text-[28px] font-bold mb-6">Get in touch</h2>
            
            <div className="space-y-6">
              {CONTACT_INFO.map((info) => (
                <div key={info.icon} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#fa6204]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <i className={`fas ${info.icon} text-[#fa6204] text-lg`}></i>
                  </div>
                  <div>
                    <div className="text-white/50 text-sm">{info.label}</div>
                    {info.link ? (
                      <a 
                        href={info.link} 
                        className="text-white hover:text-[#fa6204] transition-colors duration-200"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Support Card */}
            <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#fa6204]/10 flex items-center justify-center mb-4">
                <i className="fas fa-headset text-2xl text-[#fa6204]"></i>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Customer Support</h3>
              <p className="text-white/70">Available 24/7 for bidding and account questions.</p>
            </div>
          </div>

          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit} 
            className="bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] rounded-2xl p-8 shadow-[0_20px_60px_rgba(9,38,33,0.06)] border border-white/5"
          >
            <h2 className="text-[28px] font-bold mb-6">Send us a message</h2>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block font-semibold text-white mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-3.5 border border-[#fa6204]/50 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#fa6204] focus:bg-white/10 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@gmail.com"
                  required
                  className="w-full px-4 py-3.5 border border-[#fa6204]/50 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#fa6204] focus:bg-white/10 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-semibold text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this about?"
                  required
                  className="w-full px-4 py-3.5 border border-[#fa6204]/50 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#fa6204] focus:bg-white/10 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-semibold text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message here..."
                  required
                  className="w-full px-4 py-3.5 border border-[#fa6204]/50 rounded-xl bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-[#fa6204] focus:bg-white/10 transition-all duration-200 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#fa6204] text-white rounded-xl font-semibold hover:bg-[#ff7a2f] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </button>

              {feedback.message && (
                <div 
                  className={`p-4 rounded-xl ${
                    feedback.type === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {feedback.message}
                </div>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}