'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInClient() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email address is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, accept any valid email/password
      console.log('Sign in attempt:', formData);

      // Store user session (in real app, this would be a JWT token)
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', formData.email);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      setErrors({
        general: 'Invalid email or password. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign in with ${provider}`);

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1B1E29] via-[#161922] to-[#14161F] text-white flex flex-col">
      {/* Brand Logo */}
      <div className="flex justify-center pt-5">
        <Link href="/">
          <Image
            src="/bshopewhite.png"
            alt="BShope Logo"
            width={120}
            height={120}
            className="h-[120px] w-auto"
            priority
          />
        </Link>
      </div>

      {/* Sign In Card */}
      <section className="flex justify-center items-center min-h-[65vh] px-5 py-8">
        <div className="w-full max-w-[520px] bg-[rgba(26,28,41,0.95)] border border-white/10 rounded-2xl shadow-[0_18px_50px_rgba(0,0,0,0.35)] p-8 md:p-10">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Sign in to BShope
          </h2>
          <p className="text-[#cfe7d7] mb-8 leading-relaxed">
            Use your account to access auctions, track bids, and manage your membership.
          </p>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors duration-200"
            >
              <i className="fab fa-google text-red-500"></i>
              <span className="text-sm">Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('Facebook')}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors duration-200"
            >
              <i className="fab fa-facebook text-blue-600"></i>
              <span className="text-sm">Facebook</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-[rgba(26,28,41,0.95)] text-white/50">or continue with</span>
            </div>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div>
              <label htmlFor="email" className="block text-[#d4f2da] font-semibold mb-2">
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className={`w-full px-4 py-3.5 rounded-xl border ${
                  errors.email ? 'border-red-500' : 'border-white/15'
                } bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#fa6204] focus:bg-white/10 transition-all duration-200`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1.5">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-[#d4f2da] font-semibold mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={`w-full px-4 py-3.5 rounded-xl border ${
                    errors.password ? 'border-red-500' : 'border-white/15'
                  } bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:border-[#fa6204] focus:bg-white/10 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors duration-200"
                >
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1.5">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-[#fa6204] hover:text-[#ff7a2f] transition-colors duration-200">
                Forgot password?
              </Link>
            </div>

            {errors.general && (
              <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
                {errors.general}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl border border-[#fa6204] bg-[#fa6204] text-white font-bold cursor-pointer transition-all duration-200 hover:bg-[#ff7a2f] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fas fa-spinner fa-spin"></i>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-5 text-center text-[#8eb79b] text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-white hover:text-[#fa6204] transition-colors duration-200">
              Create one now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}