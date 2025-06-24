"use client"
import { useEffect } from "react";
import Image from "next/image";
import Header from "@/Components/Header";
import BlogList from "@/Components/BlogList";
import Footer from "@/Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Testimonial from "@/Components/extra/Testimonial";
import FaqSection from "@/Components/FaqSection";
import BlogHome from "@/Components/BlogHome";
import Contribution from "@/Components/Contribution";
export default function Home() {
  return (
   <>
   <ToastContainer theme="dark" />
   <Header/>
   {/* <BlogList/> */}
   <BlogHome />
   <Testimonial />
   <Contribution />
   <FaqSection />
   </>
  );
}
