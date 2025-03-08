import React from 'react';

import styled from 'styled-components';

import { SectionComponent } from 'common/components/section/SectionComponent';
import HomeDoulaProgram from 'pages/home/components/HomeDoulaProgram';
import HomeIntro from 'pages/home/components/HomeIntro';

// const TextContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
// `;

const HomePage = styled.div`
  flex: 1 0 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 72px;
`;

export default function Home() {
  // const { user } = useContext(UserContext);

  return (
    <HomePage>
      {/* <TextContainer>
        <Title>Home Page</Title>
        <Subtitle>Welcome, {user?.firstname || 'User'}!</Subtitle>
      </TextContainer>
      <UsersList /> */}
      <SectionComponent
        sectionTitle='Welcome to our Training Academy - Where We Are Empowering Change Through Education!'
        sectionDescript={[
          'Step into a world where ancient wisdom and modern expertise converge to create a holistic approach to doula care. At Sokana Collective, we honor the rich traditions of birth support while embracing the latest evidence-based practices, ensuring all people/doulas are equipped to provide comprehensive care to families of all backgrounds.',
          'Our training academy offers a diverse array of classes, meticulously crafted to cater to every aspect of doula practice. From prenatal education and labor support techniques to postpartum care and lactation consulting, our curriculum is designed to empower you with the skills and knowledge needed to confidently guide families through their unique fertility, birthing journeys, and beyond.',
          'Led by experienced instructors and rooted in a deep reverence for the birthing process, our training programs emphasize the importance of cultural sensitivity, inclusivity, and compassionate care. Join our community of passionate individuals dedicated to nurturing a supportive and empowering environment for expectant people and families.',
        ]}
        sectionGap={72}
        sectionPaddingBot={128}
        backgroundColor='#FBE9FD'
        moreButton={true}
        titleColor={'#007575'}
        body={<HomeIntro />}
      />
      <SectionComponent
        sectionTitle='Illinois Medicaid-Certified Doula Program'
        sectionDescript={[]}
        sectionGap={0}
        sectionPaddingBot={128}
        backgroundColor='#FFFFFF'
        moreButton={true}
        titleColor={'#000000'}
        body={<HomeDoulaProgram />}
      />
    </HomePage>
  );
}
