import React, { useRef } from 'react';

import PropTypes from 'prop-types';

const VideoPlayer = ({ videoLink, isRegistered }) => {
  console.log('Video link', videoLink);
  const videoRef = useRef(null);

  // useEffect(() => {
  //   setHasAccess(isRegistered);
  // }, [isRegistered]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <video
        ref={videoRef}
        src={videoLink}
        title='Course Video'
        controls
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {!isRegistered && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(0, 127, 128, 0.6)', // More transparent version of #007F80
            backdropFilter: 'blur(2px)',
            padding: '15px',
            borderRadius: '5px',
            color: 'white',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            maxWidth: '300px',
          }}
        >
          <p style={{ margin: '0' }}>
            This is a preview version. Please register to access the full
            course.
          </p>
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
