'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Shield,
  BarChart3,
  Briefcase,
  CircleDollarSign,
  PieChart,
  Landmark,
  Wallet,
  Globe,
  Coins
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Floating Icon Component
const FloatingIcon = ({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: string, y: string }) => (
  <motion.div
    className="absolute text-blue-500/20 pointer-events-none z-0"
    initial={{ opacity: 0, x, y }}
    animate={{
      opacity: [0.1, 0.3, 0.1],
      y: ["0px", "-20px", "0px"],
      rotate: [0, 5, -5, 0]
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    <Icon size={48} />
  </motion.div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=2664&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40" />

        {/* Animated Floating Icons Background */}
        {mounted && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <FloatingIcon icon={TrendingUp} delay={0} x="10%" y="20%" />
            <FloatingIcon icon={Briefcase} delay={1} x="80%" y="15%" />
            <FloatingIcon icon={CircleDollarSign} delay={2} x="20%" y="70%" />
            <FloatingIcon icon={PieChart} delay={1.5} x="70%" y="60%" />
            <FloatingIcon icon={Landmark} delay={3} x="85%" y="30%" />
            <FloatingIcon icon={Wallet} delay={2.5} x="15%" y="40%" />
            <FloatingIcon icon={Globe} delay={0.5} x="50%" y="10%" />
            <FloatingIcon icon={Coins} delay={3.5} x="60%" y="80%" />
            {/* Extra small ones for depth */}
            <motion.div className="absolute top-1/4 left-1/3 text-blue-400/10" animate={{ y: [0, 30, 0] }} transition={{ duration: 7, repeat: Infinity }}>
              <BarChart3 size={32} />
            </motion.div>
            <motion.div className="absolute bottom-1/3 right-1/4 text-blue-400/10" animate={{ y: [0, -40, 0] }} transition={{ duration: 8, repeat: Infinity }}>
              <Shield size={24} />
            </motion.div>
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-sm">
              Institutional Grade Analysis
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight">
              Invest with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">Confidence</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
              Expert market commentary, data-driven strategies, and long-term financial perspectives for the modern investor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-900/20"
              >
                Read Market Insights <ArrowRight size={20} />
              </Link>
              <Link
                href="#about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold transition-all border border-white/10"
              >
                Our Philosophy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Why Trusted Investors Read Sky</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <TrendingUp size={32} className="text-blue-600" />,
                title: "Long-Term Vision",
                desc: "We look past the daily noise to identify secular trends that drive multi-year returns."
              },
              {
                icon: <Shield size={32} className="text-blue-600" />,
                title: "Risk Management",
                desc: "Preservation of capital is our priority. We analyze downside risks as rigorously as upside potential."
              },
              {
                icon: <BarChart3 size={32} className="text-blue-600" />,
                title: "Data-Driven",
                desc: "Our insights are built on robust financial modeling and historical data, not hype or emotion."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all cursor-default group"
              >
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Stay Ahead of the Market</h2>
          <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of professional investors who rely on Sky Investment for clarity in complex markets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-900/50 transition-all">
              Subscribe
            </button>
          </div>
          <p className="text-slate-500 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
