import React from 'react';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaRegEnvelope,
} from 'react-icons/fa';
import styled from 'styled-components';

import GenericButton from 'common/components/GenericButton';

const FooterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  background-color: #007f80;
  padding: 72px 0px;

  @media screen and (max-width: 768px) {
    padding: 64px 40px;
    flex-direction: column;
    gap: 64px;
    align-items: center;
  }
`;

const VerticallyAligned = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: var(--footer-width);

  @media screen and (max-width: 768px) {
    max-width: calc(var(--footer-width) * 0.8);
    width: 100%;
    align-items: center;
  }
`;

const HorizontallyAligned = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  gap: ${(props) => props.gap};
  justify-content: center;
  height: ${(props) => props.height || 'auto'};
`;

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: white;
  padding: 8px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: rgb(220, 220, 220);
    transform: scale(1.02);
  }
`;

const Text = styled.p`
  color: white;
  font-size: var(--footer-font-size);
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};

  @media screen and (max-width: 768px) {
    margin: 0;
    font-size: calc(var(--footer-font-size) * 0.8);
  }
`;

const Img = styled.img`
  max-width: inherit;
  max-height: inherit;
  height: ${(props) => props.dimension || 'inherit'};
  width: ${(props) => props.dimension || 'inherit'};
  object-fit: cover;
`;

const whiteButton = {
  bgColor: 'white',
  padding: '16px 40px',
  color: '#007F80',
  fontSize: '16px',
  hoverBgColor: '#f1f1f1',
};

export default function Footer() {
  const handleConnect = () => {
    window.open('https://calendly.com/sokanacollective/lets-connect', '_blank');
  };

  const handleRequest = () => {
    window.open('https://app.edoula.biz/private/form/df49ef9a', '_blank');
  };

  return (
    <FooterContainer>
      <VerticallyAligned style={{ '--footer-width': '360px' }}>
        <Text
          fontWeight='700'
          margin='0px'
          style={{ '--footer-font-size': '24px' }}
        >
          Thank you to our donors!
        </Text>
        <Img src='https://images.squarespace-cdn.com/content/v1/623f9fd83fd2075fe4f672b0/74374289-3556-461c-8cd5-9206aba70fb0/Summer%2BOaks%2BFund%2BLogo%2BHorizontal.png' />
        <HorizontallyAligned gap='24px' height='168px'>
          <Img src='https://images.squarespace-cdn.com/content/v1/623f9fd83fd2075fe4f672b0/02513dbb-7791-4b2f-841e-0a835e1bcf78/EDA_ARP_Jobs.png' />
          <Img src='https://images.squarespace-cdn.com/content/v1/623f9fd83fd2075fe4f672b0/a35dc969-022e-4657-b811-14aaa673dd04/CRBTF.jpg' />
        </HorizontallyAligned>
        <Img src='https://images.squarespace-cdn.com/content/v1/623f9fd83fd2075fe4f672b0/712e0d60-c0fc-4114-a0c1-92019feea10c/ecf-logo+%281%29.png' />
        <Img src='https://images.squarespace-cdn.com/content/v1/623f9fd83fd2075fe4f672b0/bed05e10-b16d-47ed-8c82-8ab961b9701c/BCBS+Logo.png' />
      </VerticallyAligned>
      <VerticallyAligned style={{ '--footer-width': '250px' }}>
        <GenericButton
          {...whiteButton}
          text="LET'S CONNECT"
          onClick={handleConnect}
        />
        <GenericButton
          {...whiteButton}
          text='REQUEST SERVICES'
          onClick={handleRequest}
        />
        <HorizontallyAligned gap='16px'>
          <SmallButton
            onClick={() =>
              window.open('https://facebook.com/sokanacollective', '_blank')
            }
          >
            <FaFacebookF />
          </SmallButton>
          <SmallButton
            onClick={() =>
              window.open('https://instagram.com/sokanacollective', '_blank')
            }
          >
            <FaInstagram />
          </SmallButton>
          <SmallButton
            onClick={() => window.open('mailto:info@sokanacollective.org')}
          >
            <FaRegEnvelope />
          </SmallButton>
          <SmallButton
            onClick={() =>
              window.open(
                'https://linkedin.com/company/sokanacollective',
                '_blank'
              )
            }
          >
            <FaLinkedinIn />
          </SmallButton>
        </HorizontallyAligned>
        <Text
          fontWeight='600'
          margin='72px 0px'
          style={{ '--footer-font-size': '16px' }}
        >
          Sokana Collective is a 501c3 non profit organization EIN: 93-4646850
        </Text>
      </VerticallyAligned>
      <div style={{ marginTop: '60px' }}>
        <SmallButton
          onClick={() =>
            window.open('https://app.candid.org/profile/15248996', '_blank')
          }
        >
          <Img
            dimension='180px'
            src='https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15248996/svg'
            alt='logo'
            onClick={() =>
              window.open('https://app.candid.org/profile/15248996', '_blank')
            }
          />
        </SmallButton>
      </div>
    </FooterContainer>
  );
}
