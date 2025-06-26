"use client"
const Testimonial =()=>{
return(
    <section className="py-24 px-6 max-w-7xl mx-auto bg-white text-black">
  <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">
    What Our Readers Say
  </h2>

  <div className="grid md:grid-cols-3 gap-10">
    {[
      {
        name: "Aarav Mehta",
        role: "Tech Enthusiast",
        quote:
          "Blogger delivers reliable and thoughtful articles. I always leave the site having learned something new.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        name: "Sanya Verma",
        role: "Freelance Designer",
        quote:
          "I admire the clean design and focused writing. It's refreshing to read content that respects my time and attention.",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        name: "Rahul Kapoor",
        role: "Startup Founder",
        quote:
          "Their startup advice helped me through tough decisions. Authentic and well-researched stories.",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
      },
    ].map((testimonial, index) => (
      <div
        key={index}
        className="border border-gray-300 p-6 rounded-xl hover:shadow-xl transition-all duration-300"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-14 h-14 rounded-full object-cover grayscale"
          />
          <div>
            <h4 className="text-lg font-semibold">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
        <p className="text-sm italic text-gray-800">“{testimonial.quote}”</p>
      </div>
    ))}
  </div>
</section>

)
}
export default Testimonial