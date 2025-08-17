'use client';

import { useSearchParams } from 'next/navigation';
import OrnateFrame from '../components/OrnateFrame';

export default function GameOver() {
  const searchParams = useSearchParams();
  const winner = searchParams.get('winner') || 'Player1';
  
  // Sample final scores
  const finalScores = [
    { username: "Player1", avatar: "", totalScore: 5000, rank: 1 },
    { username: "Player2", avatar: "", totalScore: 3500, rank: 2 },
    { username: "Player3", avatar: "", totalScore: 2000, rank: 3 },
    { username: "Player4", avatar: "", totalScore: 1500, rank: 4 }
  ].sort((a, b) => b.totalScore - a.totalScore);

  return (
    <OrnateFrame 
      variant="game-over"
    >
      <div className="game-over-container">
        {/* Champion name */}
        <div className="champion-info">
          <div className="champion-name">{winner}</div>
        </div>

        {/* Final Standings */}
        <div className="final-standings-section">
          <h3 className="standings-title">FINAL STANDINGS</h3>
          <div className="standings-list">
            {finalScores.map((player, index) => (
              <div key={index} className={`standing-row ${index === 0 ? 'winner-standing' : ''}`}>
                <div className="standing-rank">#{player.rank}</div>
                <div className="standing-player">
                  <span className="standing-avatar">{player.avatar}</span>
                  <span className="standing-username">{player.username}</span>
                </div>
                <div className="standing-score">{player.totalScore}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </OrnateFrame>
  );
}
