'use client';

import Link from 'next/link';
import { useState } from 'react';
import WaitingLobby from './components/WaitingLobby';

export default function Home() {
  const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  const [showRoomTypeModal, setShowRoomTypeModal] = useState(false);
  const [showJoinPrivateRoomModal, setShowJoinPrivateRoomModal] = useState(false);
  const [showJoinPublicRoomModal, setShowJoinPublicRoomModal] = useState(false);
  const [showWaitingLobby, setShowWaitingLobby] = useState(false);
  const [playerName, setPlayerName] = useState('sejalbatra');
  const [roomType, setRoomType] = useState('public');
  const [roomCode, setRoomCode] = useState('GQJ2F');
  const [selectedRoom, setSelectedRoom] = useState('GQJ2F');
  const [currentRoomId, setCurrentRoomId] = useState('');
  const [currentRoomType, setCurrentRoomType] = useState<'private' | 'public'>('public');
  const [isHost, setIsHost] = useState(false);

  // Sample players for demo - showing both full and partial lobby states
  const [currentPlayers, setCurrentPlayers] = useState([
    {
      id: '1',
      username: 'Soxenasaheb.base.eth',
      avatar: '👑',
      isHost: true
    }
  ]);

  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCreateRoom = () => {
    // Handle room creation logic here
    console.log('Creating room with:', { playerName, roomType });
    const newRoomId = generateRoomId();
    setCurrentRoomId(newRoomId);
    setCurrentRoomType(roomType as 'private' | 'public');
    setIsHost(true);
    setShowCreateRoomModal(false);
    setShowWaitingLobby(true);
  };

  const handleJoinPrivateRoom = () => {
    // Handle private room joining logic here
    console.log('Joining private room with:', { playerName, roomCode });
    setCurrentRoomId(roomCode);
    setCurrentRoomType('private');
    setIsHost(false);
    setShowJoinPrivateRoomModal(false);
    setShowWaitingLobby(true);
  };

  const handleJoinPublicRoom = () => {
    // Handle public room joining logic here
    console.log('Joining public room:', selectedRoom, 'with player:', playerName);
    setCurrentRoomId(selectedRoom);
    setCurrentRoomType('public');
    setIsHost(false);
    setShowJoinPublicRoomModal(false);
    setShowWaitingLobby(true);
  };

  const handleRoomTypeSelection = (type: 'private' | 'public') => {
    setShowRoomTypeModal(false);
    if (type === 'private') {
      setShowJoinPrivateRoomModal(true);
    } else {
      setShowJoinPublicRoomModal(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="main-game-screen">
        <div className="buttons-container">
          <button 
            className="image-button create-room-btn"
            onClick={() => setShowCreateRoomModal(true)}
          >
            <img src="/create.png" alt="Create a Room" className="button-image" />
          </button>
          
          <button 
            className="image-button play-online-btn"
            onClick={() => setShowRoomTypeModal(true)}
          >
            <img src="/play.png" alt="Play Online" className="button-image" />
          </button>
        </div>
      </div>

      {/* Create Room Modal */}
      {showCreateRoomModal && (
        <div className="modal-overlay">
          <div className="create-room-modal">
            {/* Close button */}
            <button 
              className="modal-close-btn"
              onClick={() => setShowCreateRoomModal(false)}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Create Room</h2>
              <p className="modal-subtitle">Start A New Game Session!</p>
            </div>

            {/* Player Name Input */}
            <div className="modal-section">
              <label className="modal-label">Player Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="modal-input"
                placeholder="Enter your name"
              />
            </div>

            {/* Room Type Selection */}
            <div className="modal-section">
              <label className="modal-label">Room Type</label>
              <div className="room-type-buttons">
                <button
                  className={`room-type-btn ${roomType === 'private' ? 'active' : ''}`}
                  onClick={() => setRoomType('private')}
                >
                  <div className="radio-icon">
                    {roomType === 'private' ? '●' : '○'}
                  </div>
                  Private Room
                </button>
                <button
                  className={`room-type-btn ${roomType === 'public' ? 'active' : ''}`}
                  onClick={() => setRoomType('public')}
                >
                  <div className="radio-icon">
                    {roomType === 'public' ? '●' : '○'}
                  </div>
                  Public Room
                </button>
              </div>
              <p className="room-type-note">*Invite Only</p>
            </div>

            {/* Create Room Button */}
            <div className="modal-create-button-container">
              <button className="modal-create-room-btn" onClick={handleCreateRoom}>
                <svg width="247" height="59" viewBox="0 0 247 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_38_2790)">
                    <mask id="mask0_38_2790" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="6" y="0" width="235" height="46">
                      <path d="M222.11 0H24.8904C20.3396 0 16.1804 2.57419 14.1504 6.64711L7.33397 20.3236C6.49393 22.009 6.49393 23.991 7.33397 25.6764L14.1504 39.3529C16.1804 43.4258 20.3396 46 24.8904 46H222.11C226.66 46 230.82 43.4258 232.85 39.3529L239.666 25.6764C240.506 23.991 240.506 22.009 239.666 20.3236L232.85 6.64711C230.82 2.57419 226.66 0 222.11 0Z" fill="#2942FF"/>
                    </mask>
                    <g mask="url(#mask0_38_2790)">
                      <g opacity="0.5">
                        <g filter="url(#filter1_i_38_2790)">
                          <path d="M222.11 0H24.8904C20.3396 0 16.1804 2.57419 14.1504 6.64711L7.33397 20.3236C6.49393 22.009 6.49393 23.991 7.33397 25.6764L14.1504 39.3529C16.1804 43.4258 20.3396 46 24.8904 46H222.11C226.66 46 230.82 43.4258 232.85 39.3529L239.666 25.6764C240.506 23.991 240.506 22.009 239.666 20.3236L232.85 6.64711C230.82 2.57419 226.66 0 222.11 0Z" fill="#A3A3A3"/>
                        </g>
                        <path d="M24.8906 0.5H222.109C226.471 0.5 230.457 2.9669 232.402 6.87012L239.219 20.5469C239.989 22.0917 239.989 23.9083 239.219 25.4531L232.402 39.1299C230.457 43.0331 226.471 45.5 222.109 45.5H24.8906C20.5295 45.5 16.5431 43.0331 14.5977 39.1299L7.78125 25.4531C7.01143 23.9083 7.01143 22.0917 7.78125 20.5469L14.5977 6.87012C16.5431 2.9669 20.5295 0.5 24.8906 0.5Z" stroke="url(#paint0_linear_38_2790)"/>
                      </g>
                      <g opacity="0.9" filter="url(#filter2_f_38_2790)">
                        <ellipse cx="189.452" cy="-5.5" rx="110.677" ry="8.5" fill="white"/>
                      </g>
                      <path opacity="0.21" d="M147.001 1.86719L87.0652 55.9463L62.4509 44.0791L122.386 -10L147.001 1.86719ZM106.025 -3.7832L46.0906 50.2959L37.8376 46.3174L97.7732 -7.76172L106.025 -3.7832Z" fill="white" fillOpacity="0.3"/>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_d_38_2790" x="0.903857" y="0" width="245.192" height="58.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="7"/>
                      <feGaussianBlur stdDeviation="2.9"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_38_2790"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_38_2790" result="shape"/>
                    </filter>
                    <filter id="filter1_i_38_2790" x="6.70386" y="0" width="233.592" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="-7"/>
                      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
                      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_38_2790"/>
                    </filter>
                    <filter id="filter2_f_38_2790" x="38.7744" y="-54" width="301.355" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_38_2790"/>
                    </filter>
                    <linearGradient id="paint0_linear_38_2790" x1="123.5" y1="46" x2="123.5" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F2C1F1" stopOpacity="0.38"/>
                      <stop offset="1" stopColor="#F2C1F1" stopOpacity="0.32"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="modal-create-button-text">CREATE ROOM</span>
              </button>
            </div>

            {/* Info Box */}
            <div className="modal-info-box">
              <h3 className="info-box-title">Public Room :</h3>
              <ul className="info-box-list">
                <li>You'll become the host and can start the game once 4 players join.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Room Type Selection Modal */}
      {showRoomTypeModal && (
        <div className="modal-overlay">
          <div className="room-type-selection-modal">
            {/* Close button */}
            <button 
              className="modal-close-btn"
              onClick={() => setShowRoomTypeModal(false)}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Choose Room Type</h2>
              <p className="modal-subtitle">Select how you want to play</p>
            </div>

            {/* Room Type Buttons */}
            <div className="room-type-selection-buttons">
              <button
                className="room-type-selection-btn"
                onClick={() => handleRoomTypeSelection('private')}
              >
                <span className="room-type-selection-text">Join Private Room</span>
              </button>
              <button
                className="room-type-selection-btn"
                onClick={() => handleRoomTypeSelection('public')}
              >
                <span className="room-type-selection-text">Join Public Room</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Private Room Modal */}
      {showJoinPrivateRoomModal && (
        <div className="modal-overlay">
          <div className="create-room-modal">
            {/* Close button */}
            <button 
              className="modal-close-btn"
              onClick={() => setShowJoinPrivateRoomModal(false)}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Join Private Room</h2>
              <p className="modal-subtitle">Enter An Existing Room</p>
            </div>

            {/* Player Name Input */}
            <div className="modal-section">
              <label className="modal-label">Player Name</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="modal-input"
                placeholder="Enter your name"
              />
            </div>

            {/* Room Code Input */}
            <div className="modal-section">
              <label className="modal-label">Room Code</label>
              <input
                type="text"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="modal-input"
                placeholder="Enter 5-digit Room Code"
                maxLength={5}
              />
            </div>

            {/* Join Room Button */}
            <div className="modal-create-button-container">
              <button className="modal-create-room-btn" onClick={handleJoinPrivateRoom}>
                <svg width="247" height="59" viewBox="0 0 247 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_38_2791)">
                    <mask id="mask0_38_2791" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="6" y="0" width="235" height="46">
                      <path d="M222.11 0H24.8904C20.3396 0 16.1804 2.57419 14.1504 6.64711L7.33397 20.3236C6.49393 22.009 6.49393 23.991 7.33397 25.6764L14.1504 39.3529C16.1804 43.4258 20.3396 46 24.8904 46H222.11C226.66 46 230.82 43.4258 232.85 39.3529L239.666 25.6764C240.506 23.991 240.506 22.009 239.666 20.3236L232.85 6.64711C230.82 2.57419 226.66 0 222.11 0Z" fill="#2942FF"/>
                    </mask>
                    <g mask="url(#mask0_38_2791)">
                      <g opacity="0.5">
                        <g filter="url(#filter1_i_38_2791)">
                          <path d="M222.11 0H24.8904C20.3396 0 16.1804 2.57419 14.1504 6.64711L7.33397 20.3236C6.49393 22.009 6.49393 23.991 7.33397 25.6764L14.1504 39.3529C16.1804 43.4258 20.3396 46 24.8904 46H222.11C226.66 46 230.82 43.4258 232.85 39.3529L239.666 25.6764C240.506 23.991 240.506 22.009 239.666 20.3236L232.85 6.64711C230.82 2.57419 226.66 0 222.11 0Z" fill="#A3A3A3"/>
                        </g>
                        <path d="M24.8906 0.5H222.109C226.471 0.5 230.457 2.9669 232.402 6.87012L239.219 20.5469C239.989 22.0917 239.989 23.9083 239.219 25.4531L232.402 39.1299C230.457 43.0331 226.471 45.5 222.109 45.5H24.8906C20.5295 45.5 16.5431 43.0331 14.5977 39.1299L7.78125 25.4531C7.01143 23.9083 7.01143 22.0917 7.78125 20.5469L14.5977 6.87012C16.5431 2.9669 20.5295 0.5 24.8906 0.5Z" stroke="url(#paint0_linear_38_2791)"/>
                      </g>
                      <g opacity="0.9" filter="url(#filter2_f_38_2791)">
                        <ellipse cx="189.452" cy="-5.5" rx="110.677" ry="8.5" fill="white"/>
                      </g>
                      <path opacity="0.21" d="M147.001 1.86719L87.0652 55.9463L62.4509 44.0791L122.386 -10L147.001 1.86719ZM106.025 -3.7832L46.0906 50.2959L37.8376 46.3174L97.7732 -7.76172L106.025 -3.7832Z" fill="white" fillOpacity="0.3"/>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_d_38_2791" x="0.903857" y="0" width="245.192" height="58.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="7"/>
                      <feGaussianBlur stdDeviation="2.9"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_38_2791"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_38_2791" result="shape"/>
                    </filter>
                    <filter id="filter1_i_38_2791" x="6.70386" y="0" width="233.592" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="-7"/>
                      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
                      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_38_2791"/>
                    </filter>
                    <filter id="filter2_f_38_2791" x="38.7744" y="-54" width="301.355" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_38_2791"/>
                    </filter>
                    <linearGradient id="paint0_linear_38_2791" x1="123.5" y1="46" x2="123.5" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F2C1F1" stopOpacity="0.38"/>
                      <stop offset="1" stopColor="#F2C1F1" stopOpacity="0.32"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="modal-create-button-text">JOIN ROOM</span>
              </button>
            </div>

            {/* Info Box */}
            <div className="modal-info-box">
              <h3 className="info-box-title">Ask the host for the 5-digit room code to join their game.</h3>
            </div>
          </div>
        </div>
      )}

      {/* Join Public Room Modal */}
      {showJoinPublicRoomModal && (
        <div className="modal-overlay">
          <div className="create-room-modal">
            {/* Close button */}
            <button 
              className="modal-close-btn"
              onClick={() => setShowJoinPublicRoomModal(false)}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="modal-header">
              <h2 className="modal-title">Join Public Room</h2>
              <p className="modal-subtitle">1 Available</p>
            </div>

            {/* Available Rooms List */}
            <div className="public-rooms-list">
              <button
                className={`public-room-item ${selectedRoom === 'room1' ? 'selected' : ''}`}
                onClick={() => setSelectedRoom('room1')}
              >
                <span className="room-name">Room 1</span>
                <span className="room-capacity">1/4</span>
              </button>
              <button
                className={`public-room-item ${selectedRoom === 'room2' ? 'selected' : ''}`}
                onClick={() => setSelectedRoom('room2')}
              >
                <span className="room-name">Room 2</span>
                <span className="room-capacity">3/4</span>
              </button>
            </div>

            {/* Join Room Button */}
            <div className="modal-create-button-container">
              <button className="modal-create-room-btn" onClick={handleJoinPublicRoom}>
                <svg width="247" height="59" viewBox="0 0 247 59" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g filter="url(#filter0_d_38_2792)">
                    <mask id="mask0_38_2792" style={{maskType:"alpha"}} maskUnits="userSpaceOnUse" x="6" y="0" width="235" height="46">
                      <path d="M222.11 0H24.8904C20.3396 0 16.1804 2.57419 14.1504 6.64711L7.33397 20.3236C6.49393 22.009 6.49393 23.991 7.33397 25.6764L14.1504 39.3529C16.1804 43.4258 20.3396 46 24.8904 46H222.11C226.66 46 230.82 43.4258 232.85 39.3529L239.666 25.6764C240.506 23.991 240.506 22.009 239.666 20.3236L232.85 6.64711C230.82 2.57419 226.66 0 222.11 0Z" fill="#2942FF"/>
                    </mask>
                    <g mask="url(#mask0_38_2792)">
                      <g opacity="0.5">
                        <g filter="url(#filter1_i_38_2792)">
                          <path d="M222.11 0H24.8904C20.3396 0 16.1804 2.57419 14.1504 6.64711L7.33397 20.3236C6.49393 22.009 6.49393 23.991 7.33397 25.6764L14.1504 39.3529C16.1804 43.4258 20.3396 46 24.8904 46H222.11C226.66 46 230.82 43.4258 232.85 39.3529L239.666 25.6764C240.506 23.991 240.506 22.009 239.666 20.3236L232.85 6.64711C230.82 2.57419 226.66 0 222.11 0Z" fill="#A3A3A3"/>
                        </g>
                        <path d="M24.8906 0.5H222.109C226.471 0.5 230.457 2.9669 232.402 6.87012L239.219 20.5469C239.989 22.0917 239.989 23.9083 239.219 25.4531L232.402 39.1299C230.457 43.0331 226.471 45.5 222.109 45.5H24.8906C20.5295 45.5 16.5431 43.0331 14.5977 39.1299L7.78125 25.4531C7.01143 23.9083 7.01143 22.0917 7.78125 20.5469L14.5977 6.87012C16.5431 2.9669 20.5295 0.5 24.8906 0.5Z" stroke="url(#paint0_linear_38_2792)"/>
                      </g>
                      <g opacity="0.9" filter="url(#filter2_f_38_2792)">
                        <ellipse cx="189.452" cy="-5.5" rx="110.677" ry="8.5" fill="white"/>
                      </g>
                      <path opacity="0.21" d="M147.001 1.86719L87.0652 55.9463L62.4509 44.0791L122.386 -10L147.001 1.86719ZM106.025 -3.7832L46.0906 50.2959L37.8376 46.3174L97.7732 -7.76172L106.025 -3.7832Z" fill="white" fillOpacity="0.3"/>
                    </g>
                  </g>
                  <defs>
                    <filter id="filter0_d_38_2792" x="0.903857" y="0" width="245.192" height="58.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="7"/>
                      <feGaussianBlur stdDeviation="2.9"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_38_2792"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_38_2792" result="shape"/>
                    </filter>
                    <filter id="filter1_i_38_2792" x="6.70386" y="0" width="233.592" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dy="-7"/>
                      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.11 0"/>
                      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_38_2792"/>
                    </filter>
                    <filter id="filter2_f_38_2792" x="38.7744" y="-54" width="301.355" height="97" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                      <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur_38_2792"/>
                    </filter>
                    <linearGradient id="paint0_linear_38_2792" x1="123.5" y1="46" x2="123.5" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#F2C1F1" stopOpacity="0.38"/>
                      <stop offset="1" stopColor="#F2C1F1" stopOpacity="0.32"/>
                    </linearGradient>
                  </defs>
                </svg>
                <span className="modal-create-button-text">JOIN ROOM</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Waiting Lobby Modal */}
      <WaitingLobby
        isVisible={showWaitingLobby}
        onClose={() => setShowWaitingLobby(false)}
        roomType={currentRoomType}
        roomId={currentRoomId}
        isHost={isHost}
        currentPlayers={currentPlayers}
      />
    </div>
  );
}
