"use client"

import Header from "@/components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Testimonial from "@/components/extra/Testimonial";
import FaqSection from "@/components/FaqSection";
import BlogHome from "@/components/BlogHome";
import Contribution from "@/components/Contribution";
export default function Home() {
  return (
   <>
   <ToastContainer theme="dark" />
   <Header/>
   <BlogHome />
   <Testimonial />
   <Contribution />
   <FaqSection />
   </>
  );
}
