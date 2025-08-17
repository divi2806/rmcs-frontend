'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Game() {
  const [isShuffling, setIsShuffling] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [reactions, setReactions] = useState<Array<{id: string, emoji: string, timestamp: number, x: number, y: number}>>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false, false]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Sample user data for each card
  const cardUsers = [
    { username: "Player1", avatar: "👑" },
    { username: "Player2", avatar: "🎭" },
    { username: "Player3", avatar: "🛡️" },
    { username: "Player4", avatar: "⚔️" }
  ];

  // Role data with correct image names
  const cardContent = [
    { 
      role: "RAJA", 
      subtitle: "राजा", 
      points: "+1000", 
      image: "/king.png", 
      color: "#FFD700",
      message: "You Are The Raja!"
    },
    { 
      role: "MANTRI", 
      subtitle: "मंत्री", 
      points: "+800", 
      image: "/mantri.png", 
      color: "#4CAF50",
      message: "You Are The Mantri!"
    },
    { 
      role: "CHOR", 
      subtitle: "चोर", 
      points: "-500", 
      image: "/chor.png", 
      color: "#F44336",
      message: "You Are The Chor!"
    },
    { 
      role: "SIPAHI", 
      subtitle: "सिपाही", 
      points: "+300", 
      image: "/sipahi.png", 
      color: "#2196F3",
      message: "You Are The Sipahi!"
    }
  ];

  useEffect(() => {
    // Start the game after component mounts
    const timer = setTimeout(() => {
      setGameStarted(true);
      // Shuffle animation lasts for 2 seconds
      setTimeout(() => {
        setIsShuffling(false);
      }, 2000);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

  const handleCardFlip = (cardIndex: number) => {
    if (isShuffling || isTransitioning) return; // Don't allow flipping during shuffle or transition
    
    // Start the transition
    setIsTransitioning(true);
    
    // First flip the card
    setFlippedCards(prev => {
      const newFlipped = [...prev];
      newFlipped[cardIndex] = true;
      return newFlipped;
    });
    
    // After flip animation completes, navigate to lobby
    setTimeout(() => {
      window.location.href = `/lobby?role=${cardIndex}`;
    }, 800); // Match the flip animation duration
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="game-screen">
        {/* Game Header */}
        <div className="game-header">
          {/* Left Exit Icon */}
          <div className="header-icon-right">
          <img src="/exit.svg" alt="Exit" width="16" height="16" />
          </div>

          {/* Curved Header Background */}
          <div className="header-curved-bg">
            <svg xmlns="http://www.w3.org/2000/svg" width="389" height="69" viewBox="0 0 389 69" fill="none">
              <path d="M389 0H280.419C273.101 0 266.715 4.96504 264.912 12.0575L253.754 55.9425C251.951 63.035 245.566 68 238.248 68H150.752C143.434 68 137.049 63.035 135.246 55.9425L124.088 12.0575C122.285 4.96504 115.899 0 108.581 0H0" stroke="url(#paint0_linear_1_670)" strokeWidth="2"/>
              <defs>
                <linearGradient id="paint0_linear_1_670" x1="194.5" y1="69.0968" x2="194.5" y2="-13.1613" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#DADADA" stopOpacity="0.2"/>
                  <stop offset="1" stopColor="#DADADA"/>
                </linearGradient>
              </defs>
            </svg>
            
            {/* Header Content */}
            <div className="header-content">
              <div className="round-text">Round 1</div>
              <div className="timer-text">00</div>
            </div>
          </div>

          {/* Right Help Icon */}
          <div className="header-icon-right">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18.375 9C18.375 11.7628 16.1053 14.0672 13.125 14.5369V14.625C13.125 14.9234 13.0065 15.2095 12.7955 15.4205C12.5845 15.6315 12.2984 15.75 12 15.75C11.7016 15.75 11.4155 15.6315 11.2045 15.4205C10.9935 15.2095 10.875 14.9234 10.875 14.625V13.5C10.875 13.2016 10.9935 12.9155 11.2045 12.7045C11.4155 12.4935 11.7016 12.375 12 12.375C14.2744 12.375 16.125 10.8609 16.125 9C16.125 7.13906 14.2744 5.625 12 5.625C9.72563 5.625 7.875 7.13906 7.875 9C7.875 9.29837 7.75647 9.58452 7.5455 9.7955C7.33452 10.0065 7.04837 10.125 6.75 10.125C6.45163 10.125 6.16548 10.0065 5.9545 9.7955C5.74353 9.58452 5.625 9.29837 5.625 9C5.625 5.89875 8.48438 3.375 12 3.375C15.5156 3.375 18.375 5.89875 18.375 9ZM12 17.625C11.6292 17.625 11.2666 17.735 10.9583 17.941C10.65 18.147 10.4096 18.4399 10.2677 18.7825C10.1258 19.1251 10.0887 19.5021 10.161 19.8658C10.2334 20.2295 10.412 20.5636 10.6742 20.8258C10.9364 21.088 11.2705 21.2666 11.6342 21.339C11.9979 21.4113 12.3749 21.3742 12.7175 21.2323C13.0601 21.0904 13.353 20.85 13.559 20.5417C13.765 20.2334 13.875 19.8708 13.875 19.5C13.875 19.0027 13.6775 18.5258 13.3258 18.1742C12.9742 17.8225 12.4973 17.625 12 17.625Z" fill="#D9D9D9"/>
            </svg>
          </div>
        </div>

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

        {/* Game Cards Grid */}
        <div className="game-content">
          <div className={`memory-cards-container ${isShuffling ? 'shuffling' : ''}`}>
            {[1, 2, 3, 4].map((cardId, index) => (
              <div 
                key={cardId}
                className={`memory-card-wrapper ${isShuffling ? 'shuffle-animation' : ''}`}
                style={{
                  animationDelay: `${cardId * 0.1}s`
                }}
                onClick={() => handleCardFlip(index)}
              >
                <div className={`memory-card ${flippedCards[index] ? 'flipped' : ''}`}>
                  {/* Front Side */}
                  <div className="card-front">
                    <img 
                      src="/mystery.png" 
                      alt={`Mystery Card ${cardId}`}
                      className="memory-card-image"
                    />
                    
                    {/* User Profile Overlay */}
                    <div className="user-profile-overlay">
                      <div className="user-info-pill">
                        <span className="user-avatar">{cardUsers[index].avatar}</span>
                        <span className="username">{cardUsers[index].username}</span>
                      </div>
                    </div>
                  </div>

                  {/* Back Side - Just the role image */}
                  <div className="card-back">
                    <div className="card-back-image-only">
                      <Image 
                        src={cardContent[index].image} 
                        alt={cardContent[index].role}
                        width={180}
                        height={180}
                        className="card-back-role-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
