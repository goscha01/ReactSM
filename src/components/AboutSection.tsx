'use client'
import React, { useState } from 'react'

export default function AboutSection() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='overflow-hidden'>
            <button onClick={() => setIsOpen(!isOpen)} className='fixed bottom-0 right-0 text-sm bg-alpha rounded-tl-lg text-white px-2.5 py-0.5'>About</button>
            <div className={`z-30 fixed bottom-0 right-0 max-h-screen overflow-y-auto max-w-xs w-full bg-white border border-alpha ${isOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-500`}>
                <div className='w-full bg-alpha text-white flex items-center justify-between px-2'>
                    <h2>About</h2>
                    <button onClick={() => setIsOpen(!isOpen)} className='text-sm bg-alpha text-white px-2 py-0.5'>Close <span className='text-xs font-[Days]'>X</span></button>
                </div>
                <div className='text-center px-4 py-2 text-sm leading-5'>
                    Welcome to MyStampMaker, an online tool that helps you create Custom Stamp Designs for FREE!
                </div>
            </div>
        </div>
    )
}
