'use client';
import React, { useState } from 'react';
import InstructionsContent from './InstructionsContent';

export default function InstructionsSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='overflow-hidden'>
      {/* Button to open modal */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className='fixed bottom-0 left-0 text-sm bg-alpha rounded-tr-lg text-white px-2.5 py-0.5 z-40'
        >
          View Instructions
        </button>
      )}

      {/* Modal panel */}
      <div
        className={`z-30 fixed bottom-0 left-0 max-h-screen overflow-y-auto max-w-md w-full bg-white border border-alpha transform ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        } transition-transform duration-500`}
      >
        {/* Top header with title and close */}
        <div className='w-full bg-alpha text-white flex items-center justify-between px-2 py-1'>
          <h2 className='text-sm font-semibold'>Instructions</h2>
          <button
            onClick={() => setIsOpen(false)}
            className='text-sm px-2 py-0.5 hover:underline'
          >
            Close <span className='text-xs font-[Days]'>×</span>
          </button>
        </div>

        {/* Instructions content */}
        <InstructionsContent />

        {/* Bottom-left close button */}
        <div className='absolute bottom-2 left-2'>
          <button
            onClick={() => setIsOpen(false)}
            className='text-xs px-2 py-1 bg-alpha text-white rounded hover:opacity-80'
          >
            × Close
          </button>
        </div>
      </div>
    </div>
  );
}
