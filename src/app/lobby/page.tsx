'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

export default function Lobby() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || '0';
  
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

  const roleData = cardContent[parseInt(role)];

  const handleRevealYourself = () => {
    // Navigate to revealed game page with current role
    window.location.href = `/revealed?role=${role}`;
  };

  const handleBackToGame = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="role-reveal-screen zoom-in">
        {/* Header with same design as game */}
        <div className="game-header">
          {/* Left Exit Icon */}
          <div className="header-icon-right" onClick={handleBackToGame}>
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

        {/* Just the simple image - like your second image */}
        <div className="role-card-container">
          <div className="role-card-stamp">
            <div className="simple-image-only">
              <Image 
                src={roleData.image} 
                alt={roleData.role}
                width={280}
                height={280}
                className="role-image-simple"
              />
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="role-message">
          {roleData.message}
        </div>

        {/* Reveal Yourself Button - Only show for Raja (0) and Mantri (1) */}
        {(parseInt(role) === 0 || parseInt(role) === 1) && (
          <div className="reveal-button-container">
            <button className="reveal-yourself-btn" onClick={handleRevealYourself}>
              <svg xmlns="http://www.w3.org/2000/svg" width="246" height="59" viewBox="0 0 246 59" fill="none">
                <g filter="url(#filter0_d_1_3681)">
                  <mask id="mask0_1_3681" style={{maskType: "alpha"}} maskUnits="userSpaceOnUse" x="6" y="0" width="234" height="46">
                    <path d="M221.61 0H24.3904C19.8396 0 15.6804 2.57419 13.6504 6.64711L6.83397 20.3236C5.99393 22.009 5.99393 23.991 6.83397 25.6764L13.6504 39.3529C15.6804 43.4258 19.8396 46 24.3904 46H221.61C226.16 46 230.32 43.4258 232.35 39.3529L239.166 25.6764C240.006 23.991 240.006 22.009 239.166 20.3236L232.35 6.64711C230.32 2.57419 226.16 0 221.61 0Z" fill="#2942FF"/>
                  </mask>
                  <g mask="url(#mask0_1_3681)">
                    <g opacity="0.5">
                      <g filter="url(#filter1_i_1_3681)">
                        <path d="M221.61 0H24.3904C19.8396 0 15.6804 2.57419 13.6504 6.64711L6.83397 20.3236C5.99393 22.009 5.99393 23.991 6.83397 25.6764L13.6504 39.3529C15.6804 43.4258 19.8396 46 24.3904 46H221.61C226.16 46 230.32 43.4258 232.35 39.3529L239.166 25.6764C240.006 23.991 240.006 22.009 239.166 20.3236L232.35 6.64711C230.32 2.57419 226.16 0 221.61 0Z" fill="#A3A3A3"/>
                      </g>
                      <path d="M24.3906 0.5H221.609C225.971 0.5 229.957 2.9669 231.902 6.87012L238.719 20.5469C239.489 22.0917 239.489 23.9083 238.719 25.4531L231.902 39.1299C229.957 43.0331 225.971 45.5 221.609 45.5H24.3906C20.0295 45.5 16.0431 43.0331 14.0977 39.1299L7.28125 25.4531C6.51143 23.9083 6.51143 22.0917 7.28125 20.5469L14.0977 6.87012C16.0431 2.9669 20.0295 0.5 24.3906 0.5Z" stroke="url(#paint0_linear_1_3681)"/>
                    </g>
                    <g opacity="0.9" filter="url(#filter2_f_1_3681)">
                      <ellipse cx="188.952" cy="-5.5" rx="110.677" ry="8.5" fill="white"/>
                    </g>
                    <path opacity="0.21" d="M146.501 1.86719L86.5652 55.9463L61.9509 44.0791L121.886 -10L146.501 1.86719ZM105.525 -3.7832L45.5906 50.2959L37.3376 46.3174L97.2732 -7.76172L105.525 -3.7832Z" fill="white" fillOpacity="0.3"/>
                  </g>
                </g>
                <defs>
                  <filter id="filter0_d_1_3681" x="0.403941" y="0" width="245.192" height="58.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="7"/>
                    <feGaussianBlur stdDeviation="2.9"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_3681"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_3681" result="shape"/>
                  </filter>
                  <filter id="filter1_i_1_3681" x="6.20394" y="0" width="233.592" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="-7"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1_3681"/>
                  </filter>
                  <filter id="filter2_f_1_3681" x="38.2743" y="-54" width="301.355" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_1_3681"/>
                  </filter>
                  <linearGradient id="paint0_linear_1_3681" x1="123" y1="46" x2="123" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#F2C1F1" stopOpacity="0.38"/>
                    <stop offset="1" stopColor="#F2C1F1" stopOpacity="0.32"/>
                  </linearGradient>
                </defs>
              </svg>
              <span className="reveal-button-text">REVEAL YOURSELF</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
