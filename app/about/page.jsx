"use client";
import { assets } from "@/Assets/assets";
import Image from "next/image";
const topics = [
  { title: "Technology", description: "Latest innovations and industry insights.", icon: "💻" },
  { title: "Lifestyle", description: "Trends, wellness, and everyday inspiration.", icon: "🌿" },
  { title: "Startups", description: "Founder stories and startup growth.", icon: "🚀" },
  { title: "Health", description: "Mindfulness, fitness, and mental well-being.", icon: "🧘‍♀️" },
  { title: "Creativity", description: "Photography, design, and writing.", icon: "🎨" },
  { title: "Career", description: "Remote work, freelancing, and business.", icon: "📈" },
];

const About = () => {
  return (
    <main className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen text-gray-800">
      <section className="relative h-[70vh] flex items-center justify-center">
        <Image
          src={assets.coverImg}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">About CurioBlog</h1>
          <p className="text-xl max-w-2xl">
            A next-generation digital publisher shaping stories in tech, lifestyle, startups, and more.
          </p>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-16 items-center mt-20 px-6 max-w-6xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl h-[500px] w-full">
            <Image
              src={assets.blog_pic_7}
              alt="Founder"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="backdrop-blur-sm bg-white/30 p-8 rounded-2xl shadow-xl">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
            Who We Are
          </h2>
          <p className="text-lg mb-4">
            <strong>CurioBlog Media</strong> was founded in 2025 by <strong>Pranav Abhimanyu</strong> with the goal of
            bringing clarity to the chaos of the internet. From humble beginnings to a thriving publication,
            our journey has been one of passion, persistence, and purpose.
          </p>
          <p className="text-lg">
            We now operate with a team of <strong>30+ global contributors</strong> — including writers,
            editors, developers, and designers — all dedicated to shaping meaningful digital narratives.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
          Topics We Cover
        </h2>
        <div className="grid md:grid-cols-3 gap-10">
          {topics.map((topic, i) => (
            <div
              key={i}
              className="p-8 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{topic.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
              <p className="text-gray-700 text-sm">{topic.description}</p>
            </div>
          ))}
        </div>
      </section>

    
      <section className="bg-white/30 backdrop-blur-md py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-800 bg-gradient-to-r from-purple-600 to-pink-600 inline-block text-transparent bg-clip-text">
            Fast Facts
          </h2>
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div>
              <p className="text-5xl font-bold text-purple-600">2025</p>
              <p className="text-gray-600 mt-2">Founded</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-pink-600">30+</p>
              <p className="text-gray-600 mt-2">Team Members</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-indigo-600">10K+</p>
              <p className="text-gray-600 mt-2">Annual Readers</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
