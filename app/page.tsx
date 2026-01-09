'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Footer from '@/components/Footer';
import AnimatedSpanText from '@/components/AnimatedSpanText';
import Link from 'next/link';
// Floating Icon Component
const FloatingIcon = ({ icon: Icon, delay, x, y }: { icon: any, delay: number, x: string, y: string }) => (
  <motion.div
    className={`absolute text-white/70 pointer-events-none z-0`}
    style={{ top: y, left: x }}
    animate={{
      opacity: [0.1, 0.5, 0.1],
      y: [0, -20, 0],
    }}
    transition={{
      duration: 15,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut"
    }}
  >
    <Icon size={48} />
  </motion.div>
);


export default function Home() {
   
  return (
    <div className="bg-white  w-full h-fit">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col overflow-hidden  text-white w-full bg-gradient-to-b from-white via-sky-50 to-white ">
       <div className=' max-w-3xl  flex flex-col items-center justify-start mx-auto mt-5 '>
        <div className='relative flex flex-col items-center  px-3 py-6  w-full'>
          <h1 className="text-slate-900 font-black text-[3rem] leading-tight w-full">
  Hi, I am{" "}
  <span className="bg-gradient-to-b from-blue-700 via-sky-400 to-transparent text-transparent bg-clip-text">
    <AnimatedSpanText
      props={{ textContent: ["Akash Singh", "An Investor", "A Trader"] }}
    />
  </span>
</h1>

<p className="mt-4 text-slate-600 w-full text-start">
A stock market investor & trader with 5+ years of experience navigating
equities, commodities, and market cycles.
</p>
<p className="mt-3 italic text-slate-700 text-sm md:text-lg font-medium text-end w-full">
  I don’t trade charts alone—I study the business behind them.
</p>
<div className='absolute bottom-0 w-[50%] bg-gradient-to-r from-transparent via-zinc-600 to-transparent h-[1px]'></div>
        </div>
<div className="mt-20 w-full max-w-3xl rounded-2xl border border-slate-200 bg-white/60 backdrop-blur-sm px-8 py-10 shadow-md">
  <h2 className="text-3xl font-extrabold text-slate-900 text-center">
    Sky Investment
  </h2>

  <div className="mx-auto mt-3  h-[1px] w-25 bg-gradient-to-r from-transparent via-sky-600 to-transparent" />
  <p className="mt-6 text-slate-700 text-justify leading-relaxed">
    This website is my canvas - A place where investing meets clarity, logic,
    and real-world experience. No noise. No fake gurus. Just honest analysis,
    real processes, and a mindset built to evolve.
  </p>
  <p className="mt-6 text-slate-700 text-justify leading-relaxed">Welcome to the journey. Let’s learn, build, and compound knowledge-   one insight at a time.</p>
</div>
<p id='disclaimer' className="mt-10 text-xs text-yellow-700 tracking-relaxed max-w-xl text-center  ">
  Educational content only. Not SEBI-registered. Please consult a qualified
  financial advisor before making investment decisions.
</p>
       </div>
      </section>
      <InfoSection />
<BlogShowCase/>
      <Footer />
    </div>
  );
} 


function InfoSection() {
  return (
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold  text-slate-900 mb-4 w-full">Why Sky Investment</h2>
            <div className="w-48 h-[1px] bg-gradient-to-r from-transparent via-purple-600 to-transparent mx-auto rounded-full" />
              {/* <h2 className="text-3xl text-slate-900">
      What I Write About
    </h2> */}
    <p className="mt-3  text-slate-600 w-full text-center ">
      Research-driven insights on markets, businesses, and the psychology
      behind capital and decision-making.
    </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-6 auto-rows-fr max-w-5xl mx-auto perspective-wrapper">
          <div className="md:col-span-4 rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:shadow-lg
          hover:shadow-slate-100  hover:bg-gradient-to-br hover:from-slate-300 hover:to-white/80 grid-items">
  <h3 className="text-xl font-bold text-slate-900">
    India’s Growth Story
  </h3>
  <p className="mt-3 text-slate-700">
    Deep dives into the sectors, businesses, and capital flows shaping India’s
    long-term economic expansion and market leadership.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-red-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Equities & Sectoral Opportunities
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Growth companies, emerging sector leaders, and business models driving
    earnings and scale.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-sky-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Commodities & Macro Trends
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Commodity cycles, demand–supply dynamics, and macro forces influencing
    prices and market sentiment.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-indigo-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Market Psychology
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Investor behaviour, trading psychology, and emotional patterns that shape
    decision-making in markets.
  </p>
</div>
<div className="md:col-span-2 rounded-2xl border border-slate-200 hover:bg-gradient-to-br hover:from-purple-300/20 
to-white backdrop-blur-md p-6 grid-items">
  <h3 className="font-semibold text-slate-900">
    Money, Risk & Financial Literacy
  </h3>
  <p className="mt-2 text-sm text-slate-600">
    Frameworks for managing risk, understanding money, and building clarity
    around long-term investing decisions.
  </p>
</div>
<div className="md:col-span-6 rounded-2xl border border-slate-200 bg-slate-50 p-8 hover:bg-gradient-to-br hover:from-violet-100
to-white backdrop-blur-md  grid-items">
  <h3 className="text-lg font-bold text-slate-900">
    Global Events & Geopolitical Context
  </h3>
  <p className="mt-3 text-slate-700">
    Occasionally exploring global events, geopolitics, and cross-border
    developments that influence capital flows and market narratives.
  </p>
</div>  
          </div>
        </div>
      </section>
  )
}


 function BlogShowCase(){
const [blogs, setBlogs] = useState<any[]>([]);

const trendingArticles = async () => {
  try {
  
    const res = await fetch('/api/blog');

    if (!res.ok) throw new Error("Failed to fetch blogs");

    const data = await res.json();
    console.log(data);
    setBlogs(data);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  trendingArticles();
}, []);

  return (
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Blog & Insights
          </h2>
          <p className="mt-3 w-full text-slate-600">
            Research-driven writing on markets, businesses, and the psychology
            behind capital and decision-making.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogs && blogs.map((blog,idx) => (
            <article
              key={idx}
              className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-md transition"
            >
              {/* Image */}
              
              <div className=" h-48 overflow-hidden">
                <Image 
                src={blog.coverImage.startsWith("data")?blog.coverImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUAAAD///8dHR3s7OxhYWHm5uZwcHC9vb37+/sgICD09PTw8PDMzMwMDAxra2uHh4cvLy+goKDX19dFRUXDw8Ph4eF9fX1lZWUlJSWurq7Z2dmnp6c9PT2NjY1MTEwYGBhZWVnHx8eZmZmAgIAxMTFTU1OMjIw+Pj62tra7Pb1vAAAEfklEQVR4nO3baVfyOhSGYaAUESoqCg6gDA6H//8LD6ivkqdtkrak0bXu66sJyXaTNhOdDgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgnvNeqXOz5Oq+vGhh9Ys4EYntOCk1fjCKLtPyooXSx20/Ulg/7kddi+GVUXhnK1siWTxHCu3Ltb1/C6PwskaEe9lNpOAOVtYU7pPYM4rf1guxu4s3Iheuvm2N4s81I+yOY41H+yg8GJkVNnVD7F7GifDJ3TMziW+1I+w+xQjwInF37GRJjJJFjxRqx2qPxL1B+xF6pHD/QjPrZPUjHLb+1nj369jcqLSuH2F31naEXinM9atBErvX7Qb4Is0naTL+oP0yk9hPZ7NZeuyr2pfR8J+CEF9bjVBSmK46q/ODnj5NCr5cF8c+q/1z9W35NNMId20GeCmNv//86cyaxCrmOqX47wQ995WaTY+P/nQj3Xqs38pqan5UiyNRU2hMOXSGfdegIfPJlDbsdgUyCker4z9qErPTtbRu8lFV6IPUnH7mXglNlgYT45Me3BVOQ1MoWzJ9iXDapK1ddqStgagpzLUrD4juuqWOnYy8qMxReHB3ypEYwdyVwnwSY+611KApPM8X0Rn2Wfu9bGAivS8c/ZrEZdu9bOLR7PuwcD6sj9O/lER9ipT0XafNbU4pG5IUln3/BlKs1XVBI54pzM0Khn9mJHqmMD8tWJQV/GU0hZYvnyywil4qv5F3Cv9qEvVduLEV1iT2bIUPdmcut8EP2yrNxpwTdFW0+yRC7wtrCh3LItl3G7lOyZwnPeEj1BQ6lra677+1F/8FEerZkXNRJF12bbPEj3Ajza1dFfQU3HGAFD3Cyins9KTPib149Ah1l3DtrrKVKi/W0rEjrLNJeFFpJMaOcCONeW306ki0bvFHjlBT6Hecp0m0bvFHjlBHoWdbD1JtYikbN0J9kPoeIbzKVMyWxLizNk2h95mZXmezDN/JEd0jCB6hjkL/UyC9zua5xa8NBo9wUzeF+SS+edUquRQYLEI9uq5ykPcqda1rym+5+wCBI6w9Cg80iT5b/GWXAkNFqGOp2lms1vZIop4xB49Qs+Ba6An9Bji3IsovlAWK8EqaGVe80qrPxVtHcV1oh4+wYQorbe8sL63XpsJEeC9zDccqr4AetqXTaTbNsmyzW1w/vcwHH6/4+fv2LMvdEmolQn2ujVK3xBxrTa6zhY9QZ5Z+zAdmkzuJxgFIkAh1deDJHGv1k7gz9glCROi+r17MTGLtK9635vwtRIQ1U6hvPcsbwCbrBI/wqtYoPDCPpXS73M/hixA6QuevRsqZ51J6auXj458UOEJ9F1ZhXkIrWdJaDD83kANHWHsU7o3M3665XuYq+/oOhI2w1yCFzZKYfscSNkLHz+8c5KqNfxJH03lJH04eoedPDsqYj1O9D1dgOE5ms83c+M9sk6PJYJP7xoWe7/qNmJ/W70/mg0+XP14Gg/ldf/22d7O8/x2//gUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQ0/+ydT0yi70lewAAAABJRU5ErkJggg=="}
                  alt={blog.title}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
 
              {/* Content */}
              <div className="p-6">
               
                <h3 className="text-lg font-semibold text-slate-900 leading-snug">
                  {blog.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 line-clamp-2">
                  {blog.excerpt}
                </p>
 <div className="mt-3 text-[10px] font-semibold text-sky-500 uppercase border-sky-500 inline-block px-2 py-1 rounded-full bg-sky-100">
                  {blog.category}
                </div>

                <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                  <span>{blog.readTime}</span>
                  <span className="font-medium text-slate-700 group-hover:text-sky-500 transition">
                    Read analysis →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="rounded-xl border border-slate-300 px-6 py-3 text-slate-700 hover:bg-slate-100 transition"
          >
            <Link href={"/articles"}>View all blogs</Link>
            
          </button>
        </div>
      </div>
    </section>
  );
}
