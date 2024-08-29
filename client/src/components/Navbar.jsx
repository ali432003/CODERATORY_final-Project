import useSocketActivity from '@/hooks/UserSocketActivity'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    const id = JSON.parse(localStorage.getItem("user"))._id
    useSocketActivity(id)
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
                <button className='text-white bg-slate-950 p-3 rounded-full'><Link href={"/auth/signup"}>Get started</Link></button>
            </div>
        </div>
    )
}

export default Navbar