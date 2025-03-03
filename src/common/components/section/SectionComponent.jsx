import React from 'react';

import PropTypes from 'prop-types';

import './SectionComponent.css';

const SectionComponent = ({
  sectionTitle,
  sectionDescript,
  sectionGap,
  sectionPaddingBot,
  backgroundColor = 'transparent',
  titleColor,
  body,
}) => {
  // Normalize any smart apostrophes to standard ones
  // const normalizedDescript = sectionDescript.replace(/['']/g, "'");

  return (
    <div className='page-section-cont' style={{ backgroundColor }}>
      <div
        className='page-section'
        style={{
          gap: `${sectionGap}pt`,
          paddingBottom: `${sectionPaddingBot}pt`,
        }}
      >
        <div className='section-header'>
          <div className='section-title' style={{ color: titleColor }}>
            {sectionTitle}
          </div>
          <div className='section-descript'>
            {sectionDescript.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className='body'>{body}</div>
      </div>
    </div>
  );
};

// prop validation via proptypes
SectionComponent.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  sectionDescript: PropTypes.arrayOf(PropTypes.string),
  sectionGap: PropTypes.number.isRequired,
  sectionPaddingBot: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  moreButton: PropTypes.bool,
  titleColor: PropTypes.string,
  body: PropTypes.any,
};

export { SectionComponent };
