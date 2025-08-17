'use client';

import Link from 'next/link';

export default function CreateRoom() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Create a Room</h1>
        <p className="text-lg text-gray-600 mb-12">
          Room creation screen coming soon...
        </p>
        
        <div className="space-y-4">
          <Link href="/game" className="block">
            <button className="start-game-btn">
              Start Game
            </button>
          </Link>
          
          <Link href="/" className="block">
            <button className="back-btn">
              Back to Main Menu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
