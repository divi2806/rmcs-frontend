'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

export default function RevealedGame() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const myRole = searchParams.get('role') || '0';
  const [reactions, setReactions] = useState<Array<{id: string, emoji: string, timestamp: number, x: number, y: number}>>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [votes, setVotes] = useState<{[key: number]: 'chor' | 'sipahi' | null}>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [results, setResults] = useState<{[key: number]: boolean}>({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [isCorrectGuess, setIsCorrectGuess] = useState(false);
  const [autoRevealedCards, setAutoRevealedCards] = useState<number[]>([]);
  const [isAutoRevealing, setIsAutoRevealing] = useState(false);
  
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

  // Simulate revealed players (in real app, this would come from game state)
  // For demo: assume Raja (0) and Mantri (1) have revealed themselves
  const revealedPlayers = [0, 1]; // Raja and Mantri revealed
  const myRoleIndex = parseInt(myRole);
  
  // Actual roles for validation (in real app, this would be from game state)
  const actualRoles = {
    0: 'raja',    // Player1 is Raja
    1: 'mantri',  // Player2 is Mantri  
    2: 'chor',    // Player3 is Chor
    3: 'sipahi'   // Player4 is Sipahi
  };

  const handleVote = (cardIndex: number, voteType: 'chor' | 'sipahi') => {
    if (hasSubmitted) return;
    
    setVotes(prev => ({
      ...prev,
      [cardIndex]: prev[cardIndex] === voteType ? null : voteType
    }));
  };

  const handleSubmitVotes = () => {
    if (hasSubmitted) return;
    
    // Check if votes are correct
    const newResults: {[key: number]: boolean} = {};
    let correctCount = 0;
    
    Object.entries(votes).forEach(([cardIndex, vote]) => {
      const actualRole = actualRoles[parseInt(cardIndex) as keyof typeof actualRoles];
      const isCorrect = vote === actualRole;
      newResults[parseInt(cardIndex)] = isCorrect;
      if (isCorrect) correctCount++;
    });
    
    setResults(newResults);
    setHasSubmitted(true);
    
    // Check if all guesses were correct
    const allCorrect = correctCount === Object.keys(votes).length;
    setIsCorrectGuess(allCorrect);
    
    // Start auto-revealing cards after a short delay
    setTimeout(() => {
      setIsAutoRevealing(true);
      autoRevealCards();
    }, 1000);
    
    // Show result modal after cards are revealed
    setTimeout(() => {
      setShowResultModal(true);
    }, 2500);
  };

  const autoRevealCards = () => {
    // Get the cards that were voted on (mystery cards)
    const votedCardIndices = Object.keys(votes).map(Number);
    
    // Reveal them one by one with animation
    votedCardIndices.forEach((cardIndex, index) => {
      setTimeout(() => {
        setAutoRevealedCards(prev => [...prev, cardIndex]);
      }, index * 800); // 800ms delay between each reveal
    });
  };

  const canSubmit = Object.keys(votes).length === 2 && 
                   Object.values(votes).includes('chor') && 
                   Object.values(votes).includes('sipahi');

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
      x: Math.random() * 300 + 50,
      y: Math.random() * 400 + 100
    };
    setReactions(prev => [...prev, newReaction]);
    setShowEmojiPicker(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="game-screen">
        {/* Game Header */}
        <div className="game-header">
          {/* Left Exit Icon */}
          <Link href="/game">
            <div className="header-icon-right">
              <img src="/exit.svg" alt="Exit" width="16" height="16" />
            </div>
          </Link>

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

        {/* Game Cards Grid - Similar to /game but showing revealed roles */}
        <div className="game-content">
          <div className="memory-cards-container">
            {[0, 1, 2, 3].map((cardIndex) => {
              const isRevealed = revealedPlayers.includes(cardIndex) || autoRevealedCards.includes(cardIndex);
              const currentVote = votes[cardIndex];
              const isCorrect = results[cardIndex];
              
              return (
                <div 
                  key={cardIndex}
                  className="memory-card-wrapper"
                  style={{ position: 'relative' }}
                >
                  <div className={`memory-card ${isRevealed ? 'flipped' : ''}`}>
                    {/* Front Side - Mystery card for unrevealed */}
                    <div className="card-front">
                      <img 
                        src="/mystery.png" 
                        alt={`Mystery Card ${cardIndex + 1}`}
                        className="memory-card-image"
                      />
                      
                      {/* User Profile Overlay */}
                      <div className="user-profile-overlay">
                        <div className="user-info-pill">
                          <span className="user-avatar">{cardUsers[cardIndex].avatar}</span>
                          <span className="username">{cardUsers[cardIndex].username}</span>
                        </div>
                      </div>
                    </div>

                    {/* Back Side - Show role if revealed, mystery if not */}
                    <div className="card-back">
                      {isRevealed ? (
                        <div className="card-back-image-only">
                          <Image 
                            src={cardContent[cardIndex].image} 
                            alt={cardContent[cardIndex].role}
                            width={180}
                            height={180}
                            className="card-back-role-image"
                          />
                        </div>
                      ) : (
                        <div className="card-back-image-only">
                          <img 
                            src="/mystery.png" 
                            alt="Mystery Role"
                            className="card-back-role-image"
                            style={{ width: '180px', height: '180px', objectFit: 'contain' }}
                          />
                        </div>
                      )}
                      
                      {/* User Profile Overlay on back too */}
                      <div className="user-profile-overlay">
                        <div className="user-info-pill">
                          <span className="user-avatar">{cardUsers[cardIndex].avatar}</span>
                          <span className="username">{cardUsers[cardIndex].username}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Voting Buttons - Only show for unrevealed cards and if user is Mantri */}
                  {!revealedPlayers.includes(cardIndex) && !autoRevealedCards.includes(cardIndex) && myRoleIndex === 1 && (
                    <div className="voting-buttons">
                      {/* Chor Button */}
                      <button
                        className={`vote-btn chor-btn ${currentVote === 'chor' ? 'selected' : ''} ${
                          hasSubmitted ? (isCorrect && currentVote === 'chor' ? 'correct' : 
                                        currentVote === 'chor' ? 'incorrect' : '') : ''
                        }`}
                        onClick={() => handleVote(cardIndex, 'chor')}
                        disabled={hasSubmitted}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="32" viewBox="0 0 140 32" fill="none">
                          <defs>
                            <filter id={`filter0_d_chor_${cardIndex}`} x="0" y="0" width="140" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                              <feOffset dy="3"/>
                              <feGaussianBlur stdDeviation="2"/>
                              <feComposite in2="hardAlpha" operator="out"/>
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_chor"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_chor" result="shape"/>
                            </filter>
                          </defs>
                          <g filter={`url(#filter0_d_chor_${cardIndex})`}>
                            <path d="M122.5 0H17.5C12.8056 0 8.56667 2.67654 6.57817 6.87292L3.47645 13.4365C2.70949 15.0594 2.70949 16.9406 3.47645 18.5635L6.57817 25.1271C8.56667 29.3235 12.8056 32 17.5 32H122.5C127.194 32 131.433 29.3235 133.422 25.1271L136.524 18.5635C137.291 16.9406 137.291 15.0594 136.524 13.4365L133.422 6.87292C131.433 2.67654 127.194 0 122.5 0Z" fill="#ED6977"/>
                          </g>
                        </svg>
                        <span className="vote-btn-text">CHOR</span>
                      </button>

                      {/* Sipahi Button */}
                      <button
                        className={`vote-btn sipahi-btn ${currentVote === 'sipahi' ? 'selected' : ''} ${
                          hasSubmitted ? (isCorrect && currentVote === 'sipahi' ? 'correct' : 
                                        currentVote === 'sipahi' ? 'incorrect' : '') : ''
                        }`}
                        onClick={() => handleVote(cardIndex, 'sipahi')}
                        disabled={hasSubmitted}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="140" height="32" viewBox="0 0 140 32" fill="none">
                          <defs>
                            <filter id={`filter0_d_sipahi_${cardIndex}`} x="0" y="0" width="140" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                              <feOffset dy="3"/>
                              <feGaussianBlur stdDeviation="2"/>
                              <feComposite in2="hardAlpha" operator="out"/>
                              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_sipahi"/>
                              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_sipahi" result="shape"/>
                            </filter>
                          </defs>
                          <g filter={`url(#filter0_d_sipahi_${cardIndex})`}>
                            <path d="M122.5 0H17.5C12.8056 0 8.56667 2.67654 6.57817 6.87292L3.47645 13.4365C2.70949 15.0594 2.70949 16.9406 3.47645 18.5635L6.57817 25.1271C8.56667 29.3235 12.8056 32 17.5 32H122.5C127.194 32 131.433 29.3235 133.422 25.1271L136.524 18.5635C137.291 16.9406 137.291 15.0594 136.524 13.4365L133.422 6.87292C131.433 2.67654 127.194 0 122.5 0Z" fill="#2196F3"/>
                          </g>
                        </svg>
                        <span className="vote-btn-text">SIPAHI</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Button - Only show if Mantri and has valid votes */}
          {myRoleIndex === 1 && canSubmit && !hasSubmitted && (
            <div className="submit-votes-container">
              <button className="submit-votes-btn" onClick={handleSubmitVotes}>
                <svg xmlns="http://www.w3.org/2000/svg" width="235" height="46" viewBox="0 0 235 46" fill="none">
                  <g filter="url(#filter0_d_1_1059)">
                    <path d="M215.171 0H19.8287C15.1873 0 10.9621 2.67654 8.97908 6.87292L5.87737 13.4365C5.11041 15.0594 5.11041 16.9406 5.87737 18.5635L8.97908 25.1271C10.9621 29.3235 15.1873 32 19.8287 32H215.171C219.813 32 224.038 29.3235 226.021 25.1271L229.123 18.5635C229.89 16.9406 229.89 15.0594 229.123 13.4365L226.021 6.87292C224.038 2.67654 219.813 0 215.171 0Z" fill="url(#paint0_linear_1_1059)"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_1_1059" x="0" y="0" width="235" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="7"/>
                      <feGaussianBlur stdDeviation="2.5"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_1059"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_1059" result="shape"/>
                    </filter>
                    <linearGradient id="paint0_linear_1_1059" x1="117.5" y1="0" x2="117.5" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#C0413B"/>
                      <stop offset="1" stopColor="#C5504A"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="submit-button-text">SUBMIT VOTES</span>
              </button>
            </div>
          )}
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

        {/* Result Modal */}
        {showResultModal && (
          <div className="modal-overlay">
            <div className="result-modal">
              <div className="result-modal-content">
                <div className="result-icon">
                  {isCorrectGuess ? '🎉' : '❌'}
                </div>
                <h2 className="result-title">
                  {isCorrectGuess ? 'Perfect!' : 'Not Quite!'}
                </h2>
                <p className="result-message">
                  {isCorrectGuess 
                    ? 'All your guesses were correct!' 
                    : `${Object.values(results).filter(Boolean).length}/${Object.keys(votes).length} correct guesses. Try again next round!`
                  }
                </p>
                <button 
                  className="result-modal-btn"
                  onClick={() => {
                    setShowResultModal(false);
                    // Navigate to round over screen with results
                    router.push(`/round-over?round=1&correct=${isCorrectGuess}`);
                  }}
                >
                  <span className="result-modal-btn-text">Continue</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
