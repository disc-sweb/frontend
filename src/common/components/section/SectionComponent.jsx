import React from 'react';

// Section component
const Section = ({
  sectionTitle,
  sectionDescript,
  sectionGap,
  sectionPaddingBot,
  backgroundColor = 'transparent',
  borderRadius = 0,
  moreButton = false,
  body,
}) => {
  // Normalize any smart apostrophes to standard ones
  const normalizedDescript = sectionDescript.replace(/['']/g, "'");

  return (
    <div
      className='page-section-cont'
      style={{ backgroundColor: `${backgroundColor}` }}
    >
      <div
        className='page-section'
        style={{
          gap: `${sectionGap}rem`,
          paddingBottom: `${sectionPaddingBot}rem`,
        }}
      >
        <div className='section-header'>
          <span className='section-title'>{sectionTitle}</span>
          {/* Changed from span to div and using normalized text */}
          <div className='section-descript'>{normalizedDescript}</div>
        </div>
        {body}
        {moreButton && (
          <div className='more-btn-cont'>
            <Button
              colorClass='light-button'
              padding='1rem 3rem'
              fontSize='1.125rem'
              text='MORE'
              hasIcon={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export { Section };
