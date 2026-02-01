import React, { useEffect, useState } from 'react';
import './SuccessFeedback.css';

const emojis = ['🎉', '🎊', '🌟', '😄', '🥳', '😊', '✨', '💫', '🌈', '👏', '🤩'];

const SuccessFeedback = ({ show }) => {
  const [activeEmojis, setActiveEmojis] = useState([]);

  useEffect(() => {
    if (show) {
      // Generate random emojis
      const newEmojis = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        char: emojis[Math.floor(Math.random() * emojis.length)],
        left: Math.random() * 100 + '%',
        animationDuration: 1 + Math.random() * 2 + 's',
        delay: Math.random() * 0.5 + 's',
        fontSize: 2 + Math.random() * 3 + 'rem'
      }));
      setActiveEmojis(newEmojis);
    } else {
      setActiveEmojis([]);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="success-feedback-overlay">
      {activeEmojis.map((emoji) => (
        <div
          key={emoji.id}
          className="emoji-particle"
          style={{
            left: emoji.left,
            animationDuration: emoji.animationDuration,
            animationDelay: emoji.delay,
            fontSize: emoji.fontSize
          }}
        >
          {emoji.char}
        </div>
      ))}
    </div>
  );
};

export default SuccessFeedback;
