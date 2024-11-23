'use client'
import React, { useState } from 'react'

export default function InstructionsSection() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='overflow-hidden'>
            <button onClick={() => setIsOpen(!isOpen)} className='fixed bottom-0 left-0 text-sm bg-alpha rounded-tr-lg text-white px-2.5 py-0.5'>View Instructions</button>
            <div className={`z-30 fixed bottom-0 left-0 max-h-screen overflow-y-auto max-w-md w-full bg-white border border-alpha ${isOpen ? 'translate-y-0' : 'translate-y-full'} transition-transform duration-500`}>
                <div className='w-full bg-alpha text-white flex items-center justify-between px-2'>
                    <h2>Instructions</h2>
                    <button onClick={() => setIsOpen(!isOpen)} className='text-sm bg-alpha text-white px-2 py-0.5'>Close <span className='text-xs font-[Days]'>X</span></button>
                </div>
                <p className='px-4 py-2 text-sm leading-5'>
                    ★ Select <b>Circle</b> element to add a stamp circle<br />
                    ★ Edit the circle, change its radius and stroke width<br />
                    ★ Select <b>Round</b> Text element to add a text around the circle<br />
                    ★ Enter and edit the text, change spacing and rotate it clockwise<br />
                    ★ Select <b>Line</b> Text element to add a text in the center<br />
                    ★ Enter and edit the text, move or rotate it<br />
                    ★ Select <b>Image</b> element to add an image<br />
                    ★ Upload the image, change its size and position<br />
                    ★ Add any numbers of elements<br />
                    ★ Delete elements clicking on <b>delete x</b> <br />
                    ★ <b>Download</b> your stamp
                </p>
            </div>
        </div>
    )
}
