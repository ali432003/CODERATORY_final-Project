import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./styles.css";
import Link from "next/link";
import useSocketActivity from "@/hooks/UserSocketActivity";

export default function Home() {
  // const id = JSON.parse(localStorage.getItem("user"))._id;
  // useSocketActivity(id);
  return (
    <div className="main min-h-full">
      <Navbar />
      <div className="flex flex-col justify-center place-items-center mt-[2rem] border border-b-2 border-0 border-slate-600">
        <h1 className="text-[7rem] text-slate-900">Be part of a</h1>
        <h1 className="text-[7rem] mt-[-4rem] font-bold text-slate-900">
          better internet
        </h1>
        <div className="text-center my-4">
          <h2 className="text-[1.5rem]">Read. Write. Update. Delete Tasks</h2>
          <h2 className="text-[1.5rem] font-bold">
            manage Your Tasks Efficiently
          </h2>
          <button className="text-white bg-slate-950 p-3 rounded-full mt-[2rem]">
            <Link href="/auth/signup"> Become a member </Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
