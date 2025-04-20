import React, { useEffect, useRef, useState } from 'react';

import PropTypes from 'prop-types';

const VideoPlayer = ({ videoLink, isRegistered, onRegister }) => {
  const videoRef = useRef(null);
  const [hasAccess, setHasAccess] = useState(isRegistered);

  useEffect(() => {
    setHasAccess(isRegistered);
  }, [isRegistered]);

  const handleTimeUpdate = () => {
    if (hasAccess) {
      return; //Skip time limit check if the user is registered
    }

    const currentTime = videoRef.current.currentTime;

    if (currentTime >= 600) {
      // 10 minutes limits
      videoRef.current.pause();
      setHasAccess(false);
      showRegisterPrompt();
    }
  };

  const showRegisterPrompt = () => {
    // Show a prompt or modal to register for the course
    alert(
      'You have reached the 10-minute free limit. Please register to continue watching.'
    );
  };

  const handleResumeVideo = () => {
    if (isRegistered) {
      setHasAccess(true);
      videoRef.current.play();
    } else {
      alert('Please register first to continue watching the video.');
      onRegister();
    }
  };

  return (
    <div>
      {hasAccess ? (
        <video
          ref={videoRef}
          src={videoLink}
          title='Course Video'
          controls
          onTimeUpdate={handleTimeUpdate}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      ) : (
        <div>
          <p>
            Your free 10‑minute trial has ended. Please register to continue.
          </p>
          <button onClick={handleResumeVideo}>Resume Video</button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

VideoPlayer.propTypes = {
  videoLink: PropTypes.string.isRequired,
  isRegistered: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
};
