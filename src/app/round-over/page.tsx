'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RoundOver() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactions, setReactions] = useState<Array<{id: string, emoji: string, timestamp: number, x: number, y: number}>>([]);
  const currentRound = parseInt(searchParams.get('round') || '1');
  const isCorrectGuess = searchParams.get('correct') === 'true';

  // Sample player scores (in real app, this would come from game state)
  const playerScores = [
    { 
      username: "Player1", 
      avatar: "👑", 
      role: "RAJA",
      roundScore: 1000,
      totalScore: 1000 
    },
    { 
      username: "Player2", 
      avatar: "🎭", 
      role: "MANTRI",
      roundScore: isCorrectGuess ? 800 : 0,
      totalScore: isCorrectGuess ? 800 : 0
    },
    { 
      username: "Player3", 
      avatar: "🛡️", 
      role: "CHOR",
      roundScore: -500,
      totalScore: -500
    },
    { 
      username: "Player4", 
      avatar: "⚔️", 
      role: "SIPAHI",
      roundScore: 300,
      totalScore: 300
    }
  ];

  // Auto-remove reactions after 3 seconds
  useEffect(() => {
    reactions.forEach(reaction => {
      const timer = setTimeout(() => {
        setReactions(prev => prev.filter(r => r.id !== reaction.id));
      }, 3000);
      return () => clearTimeout(timer);
    });
  }, [reactions]);

  const emojis = ['😀', '😂', '🥰', '😎', '🤩'];

  const handleEmojiSelect = (emoji: string) => {
    const newReaction = {
      id: Math.random().toString(36).substr(2, 9),
      emoji,
      timestamp: Date.now(),
      x: Math.random() * 300 + 50, // Random position
      y: Math.random() * 400 + 100
    };
    setReactions(prev => [...prev, newReaction]);
    setShowEmojiPicker(false);
  };

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Navigate to next round automatically
      router.push('/game');
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="round-over-screen">
        {/* Background with role.png */}
        <div className="round-over-background"></div>
        
        {/* Add Reaction Button & Emoji Bar */}
        <div className="reaction-container">
          <button 
            className="add-reaction-btn"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Image src="/Plus.svg" alt="Add Reaction" width={14} height={14} />
            <span>Add Reaction</span>
          </button>
          
          {/* Horizontal Emoji Bar */}
          <div className={`emoji-bar ${showEmojiPicker ? 'emoji-bar-open' : ''}`}>
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className="emoji-quick-btn"
                onClick={() => handleEmojiSelect(emoji)}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        
        {/* Ornate border frame */}
        <div className="border-frame">
          {/* Corner decorations */}
          <div className="corner-decoration top-left">✦</div>
          <div className="corner-decoration top-right">✦</div>
          <div className="corner-decoration bottom-left">✦</div>
          <div className="corner-decoration bottom-right">✦</div>
          
          {/* Multiple nested borders */}
          <div className="nested-border-1">
            <div className="nested-border-2">
              <div className="nested-border-3">
                <div className="nested-border-4">
                  <div className="round-over-content">
                    
                    {/* Round Over Title */}
                    <div className="round-over-header">
                      <h1 className="round-over-title">Round {currentRound} Complete</h1>
                      <p className="round-over-subtitle">Final Scores</p>
                    </div>

                    {/* Player Scores Grid */}
                    <div className="player-scores-grid">
                      {playerScores.map((player, index) => (
                        <div key={index} className="player-score-card">
                          <div className="player-score-header">
                            <span className="player-avatar">{player.avatar}</span>
                            <span className="player-username">{player.username}</span>
                          </div>
                          <div className="player-role">{player.role}</div>
                          <div className="score-section">
                            <div className="round-score">
                              <span className="score-label">Round {currentRound}:</span>
                              <span className={`score-value ${player.roundScore >= 0 ? 'positive' : 'negative'}`}>
                                {player.roundScore >= 0 ? '+' : ''}{player.roundScore}
                              </span>
                            </div>
                            <div className="total-score">
                              <span className="score-label">Total:</span>
                              <span className={`score-value ${player.totalScore >= 0 ? 'positive' : 'negative'}`}>
                                {player.totalScore >= 0 ? '+' : ''}{player.totalScore}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Countdown Timer */}
                    <div className="countdown-section">
                      <div className="countdown-text">Next Round Starting In</div>
                      <div className="countdown-timer">
                        <div className="countdown-circle">
                          <svg className="countdown-svg" width="80" height="80">
                            <circle
                              cx="40"
                              cy="40"
                              r="35"
                              stroke="rgba(255, 255, 255, 0.3)"
                              strokeWidth="3"
                              fill="transparent"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="35"
                              stroke="#FFF"
                              strokeWidth="3"
                              fill="transparent"
                              strokeLinecap="round"
                              strokeDasharray={`${2 * Math.PI * 35}`}
                              strokeDashoffset={`${2 * Math.PI * 35 * (1 - countdown / 15)}`}
                              className="countdown-progress"
                            />
                          </svg>
                          <div className="countdown-number">{countdown}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Reactions */}
        {reactions.map((reaction) => (
          <div
            key={reaction.id}
            className="floating-reaction"
            style={{
              left: `${reaction.x}px`,
              top: `${reaction.y}px`,
            }}
          >
            {reaction.emoji}
          </div>
        ))}
      </div>
    </div>
  );
}
