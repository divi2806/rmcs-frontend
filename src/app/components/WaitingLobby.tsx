'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface WaitingLobbyProps {
  isVisible: boolean;
  onClose: () => void;
  roomType: 'private' | 'public';
  roomId: string;
  isHost: boolean;
  currentPlayers: Array<{
    id: string;
    username: string;
    avatar: string;
    isHost: boolean;
  }>;
}

export default function WaitingLobby({ 
  isVisible, 
  onClose, 
  roomType, 
  roomId, 
  isHost, 
  currentPlayers 
}: WaitingLobbyProps) {
  const router = useRouter();
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const copyRoomId = () => {
    navigator.clipboard.writeText(roomId);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  const handleStartGame = () => {
    // Navigate to game page
    router.push('/game');
  };

  // For demo purposes - add test players
  const addTestPlayer = () => {
    // This would normally be handled by the parent component
    console.log('Adding test player...');
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="waiting-lobby-modal">
        {/* Close button */}
        <button 
          className="modal-close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">
            {roomType === 'private' ? 'Join Private Room' : 'Join Public Room'}
          </h2>
          <p className="modal-subtitle">Waiting For Players</p>
        </div>

        {/* Room ID Section */}
        <div className="room-id-section">
          <div className="room-id-container">
            <span className="room-id-label">Room ID</span>
            <div className="room-id-display">
              <span className="room-id-text">{roomId}</span>
              <button 
                className="copy-room-id-btn" 
                onClick={copyRoomId}
                title="Copy Room ID"
              >
                📋
              </button>
            </div>
          </div>
          {showCopiedMessage && (
            <div className="copied-message">Room ID copied!</div>
          )}
        </div>

        {/* Players Count */}
        <div className="players-count">
          Players {currentPlayers.length}/4
        </div>

        {/* Players List */}
        <div className="players-list">
          {currentPlayers.map((player, index) => (
            <div key={player.id} className="player-item">
              <div className="player-avatar">{player.avatar}</div>
              <div className="player-info">
                <span className="player-username">{player.username}</span>
                {player.isHost && <span className="host-badge">Host</span>}
                {!player.isHost && <span className="player-badge">Player</span>}
              </div>
            </div>
          ))}
          
          {/* Empty slots */}
          {Array.from({ length: 4 - currentPlayers.length }).map((_, index) => (
            <div key={`empty-${index}`} className="player-item empty-slot">
              <div className="player-avatar empty">👤</div>
              <div className="player-info">
                <span className="player-username empty">Waiting...</span>
                <span className="player-badge empty">Player</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {isHost && currentPlayers.length >= 2 ? (
          <button className="start-game-btn" onClick={handleStartGame}>
            🎮 START GAME
          </button>
        ) : isHost && currentPlayers.length < 2 ? (
          <div className="waiting-message">
            Waiting for at least 2 players to start...
          </div>
        ) : (
          <div className="waiting-message">
            Waiting for host to start the game...
          </div>
        )}
      </div>
    </div>
  );
}
