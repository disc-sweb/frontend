import React from 'react';

import styled from 'styled-components';

import ClassCard from './ClassCard';

const ClassesStyling = styled.div`
  h1 {
    text-align: center;
    color: #007575;
    margin-bottom: 40px;
  }

  .courses-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    justify-content: center;
  }

  padding: 50px 100px 0px 100px;
  height: 100%;
  background-color: #fbe9fd;

  @media (max-width: 768px) {
    padding: 30px 20px 0px 20px;

    .courses-container {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
`;

const SampleClassData = [
  {
    class_title: 'Class 1',
    class_duration: '1 hour',
    class_price: 10.0,
    class_description: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris sagittis quisque ornare condimentum egestas. Habitant purus primis non ipsum, vehicula fusce feugiat. Commodo magna per ullamcorper cubilia hac congue. Viverra tortor ac vulputate nisl at potenti. Erat eros dolor litora hendrerit mattis.

    Natoque quis facilisis dolor porta vehicula vulputate suspendisse. Praesent velit dis pretium litora habitant magnis vitae sit massa. Natoque in ultrices integer duis porttitor convallis. Ligula conubia elementum libero elit laoreet ipsum tempus nam. Arcu vulputate montes ullamcorper nunc hac vehicula tristique ullamcorper. Neque ultricies venenatis suscipit purus risus litora. Facilisi ornare et vestibulum himenaeos sit eros. Aptent id class ad, non eu augue. Tempor luctus libero varius vehicula nascetur; interdum pellentesque accumsan.
    `,
  },
  {
    class_title: 'Class 2',
    class_duration: '2 hours',
    class_price: 20.0,
    class_description: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris sagittis quisque ornare condimentum egestas. Habitant purus primis non ipsum, vehicula fusce feugiat. Commodo magna per ullamcorper cubilia hac congue. Viverra tortor ac vulputate nisl at potenti. Erat eros dolor litora hendrerit mattis.

    Natoque quis facilisis dolor porta vehicula vulputate suspendisse. Praesent velit dis pretium litora habitant magnis vitae sit massa. Natoque in ultrices integer duis porttitor convallis. Ligula conubia elementum libero elit laoreet ipsum tempus nam. Arcu vulputate montes ullamcorper nunc hac vehicula tristique ullamcorper. Neque ultricies venenatis suscipit purus risus litora. Facilisi ornare et vestibulum himenaeos sit eros. Aptent id class ad, non eu augue. Tempor luctus libero varius vehicula nascetur; interdum pellentesque accumsan.
    `,
  },
  {
    class_title: 'Class 3',
    class_duration: '1 hours',
    class_price: 30.0,
    class_description: `
    Lorem ipsum odor amet, consectetuer adipiscing elit. Mauris sagittis quisque ornare condimentum egestas. Habitant purus primis non ipsum, vehicula fusce feugiat. Commodo magna per ullamcorper cubilia hac congue. Viverra tortor ac vulputate nisl at potenti. Erat eros dolor litora hendrerit mattis.
    
    Natoque quis facilisis dolor porta vehicula vulputate suspendisse. Praesent velit dis pretium litora habitant magnis vitae sit massa. Natoque in ultrices integer duis porttitor convallis. Ligula conubia elementum libero elit laoreet ipsum tempus nam. Arcu vulputate montes ullamcorper nunc hac vehicula tristique ullamcorper. Neque ultricies venenatis suscipit purus risus litora. Facilisi ornare et vestibulum himenaeos sit eros. Aptent id class ad, non eu augue. Tempor luctus libero varius vehicula nascetur; interdum pellentesque accumsan.
    `,
  },
];

const Classes = () => {
  return (
    <ClassesStyling>
      <h1>Classes</h1>
      <div className='courses-container'>
        {SampleClassData.map((classData, index) => (
          <ClassCard
            key={index}
            class_title={classData.class_title}
            class_duration={classData.class_duration}
            class_price={classData.class_price}
            class_description={classData.class_description}
          />
        ))}
      </div>
    </ClassesStyling>
  );
};

export default Classes;
