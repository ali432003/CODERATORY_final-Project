'use client'

import useSocketActivity from "@/hooks/UserSocketActivity.js";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Navbar = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Access localStorage only after the component has mounted
        const user = localStorage.getItem("user");
        if (user) {
            setUserId(JSON.parse(user)._id);
        }
    }, []);

    // Only run the useSocketActivity hook if userId is available
    if (userId) {
        useSocketActivity(userId);
    }

    return (
        <div className='flex justify-between py-[1rem] px-[4rem] border border-0 border-b-2 border-slate-600'>
            <div>
                {/* <img src="/medium.svg" width={150} /> */}
            </div>
            <div className='flex gap-x-4 text-[15px]'>
                <ul className='flex gap-x-3 items-center cursor-pointer'>
                    <li>Our Story</li>
                    <li>Membership</li>
                    <li>Write</li>
                    <Link href="/auth/login">Sign in</Link>
                </ul>
                <button className='text-white bg-slate-950 p-3 rounded-full'>
                    <Link href={"/auth/signup"}>Get started</Link>
                </button>
            </div>
        </div>
    )
}

export default Navbar;
