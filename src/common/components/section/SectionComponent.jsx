import React from 'react';

import PropTypes from 'prop-types';

import './SectionComponent.css';

const SectionComponent = ({
  sectionTitle,
  sectionDescript,
  sectionGap,
  sectionPaddingBot,
  backgroundColor = 'transparent',
  body,
}) => {
  // Normalize any smart apostrophes to standard ones
  // const normalizedDescript = sectionDescript.replace(/['']/g, "'");

  return (
    <div className='page-section-cont' style={{ backgroundColor }}>
      <div
        className='page-section'
        style={{
          gap: `${sectionGap}rem`,
          paddingBottom: `${sectionPaddingBot}rem`,
        }}
      >
        <div className='section-header'>
          <div className='section-title'>{sectionTitle}</div>
          {/* Changed from span to div and using normalized text */}
          <div className='section-descript'>{sectionDescript}</div>
        </div>
        {body}
      </div>
    </div>
  );
};

// prop validation via proptypes
SectionComponent.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  sectionDescript: PropTypes.string.isRequired,
  sectionGap: PropTypes.number.isRequired,
  sectionPaddingBot: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  moreButton: PropTypes.bool,
  body: PropTypes.node,
};

export { SectionComponent };
