'use client'

import useSocketActivity from "@/hooks/UserSocketActivity.js";
import React, { useEffect, useState } from 'react'

const Footer = () => {
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Access localStorage after the component has mounted
        const user = localStorage.getItem("user");
        if (user) {
            setUserId(JSON.parse(user)._id);
        }
    }, []);

    // Only run useSocketActivity if userId is available
    if (userId) {
        useSocketActivity(userId);
    }

    return (
        <ul className='flex justify-center mx-auto py-3 gap-x-[2rem] text-sm cursor-pointer'>
            <li>Help</li>
            <li>Status</li>
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Privacy</li>
            <li>Terms</li>
            <li>Text to speech</li>
            <li>Teams</li>
        </ul>
    )
}

export default Footer;
