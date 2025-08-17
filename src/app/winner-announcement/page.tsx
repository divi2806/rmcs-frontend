'use client';

import { useSearchParams } from 'next/navigation';

export default function WinnerAnnouncement() {
  const searchParams = useSearchParams();
  const round = searchParams.get('round') || '3';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="winner-announcement-screen">
        {/* Next game countdown */}
        <div className="next-game-text">
          Next game starts in 5
        </div>
        
        {/* Progress bar */}
        <div className="countdown-progress">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
}
