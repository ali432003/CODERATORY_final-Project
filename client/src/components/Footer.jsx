import useSocketActivity from '@/hooks/UserSocketActivity'
import React from 'react'

const Footer = () => {
    const id = JSON.parse(localStorage.getItem("user"))._id
    useSocketActivity(id)
    return (
        <ul className=' flex justify-center mx-auto py-3 gap-x-[2rem] text-sm cursor-pointer'>
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

export default Footer