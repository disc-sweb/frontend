import React from 'react';

import PropTypes from 'prop-types';

import './SectionComponent.css';

const SectionComponent = ({
  sectionTitle,
  titleSize,
  sectionDescript,
  sectionAlign,
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
          <div
            className='section-title'
            style={{ color: titleColor, fontSize: `${titleSize}px` }}
          >
            {sectionTitle}
          </div>
          <div className='section-descript'>
            {sectionDescript.map((paragraph, index) => (
              <p key={index} style={{ textAlign: sectionAlign }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div>{body}</div>
      </div>
    </div>
  );
};

// prop validation via proptypes
SectionComponent.propTypes = {
  sectionTitle: PropTypes.string.isRequired,
  titleSize: PropTypes.number.isRequired,
  sectionDescript: PropTypes.arrayOf(PropTypes.string),

  sectionAlign: PropTypes.string,
  sectionGap: PropTypes.number.isRequired,
  sectionPaddingBot: PropTypes.number.isRequired,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  moreButton: PropTypes.bool,
  titleColor: PropTypes.string,
  body: PropTypes.any,
};

export { SectionComponent };
