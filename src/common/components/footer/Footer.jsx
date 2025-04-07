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
`;

const VerticallyAligned = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: ${(props) => props.width || 'auto'};
`;

const HorizontallyAligned = styled.div`
  display: flex;
  gap: ${(props) => props.gap};
  justify-content: center;
  height: ${(props) => props.height || 'auto'};
`;

const SmallButton = styled.button`
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
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  margin: ${(props) => props.margin};
  white-space: nowrap;
  overflow: visible;
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
  padding: '24px 40px',
  color: '#007F80',
  fontSize: '16px',
  hoverBgColor: '#f1f1f1',
};

export default function Footer() {
  return (
    <FooterContainer>
      <VerticallyAligned width='360px'>
        <Text fontSize='24px' fontWeight='700' margin='0px'>
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
      <VerticallyAligned width='250px'>
        <GenericButton {...whiteButton} text="LET'S CONNECT" />
        <GenericButton {...whiteButton} text='REQUEST SERVICES' />
        <HorizontallyAligned gap='16px'>
          <SmallButton>
            <FaFacebookF />
          </SmallButton>
          <SmallButton>
            <FaInstagram />
          </SmallButton>
          <SmallButton>
            <FaRegEnvelope />
          </SmallButton>
          <SmallButton>
            <FaLinkedinIn />
          </SmallButton>
        </HorizontallyAligned>
        <Text fontSize='16px' fontWeight='600' margin='72px 0px'>
          Sokana Collective is a 501c3 non profit organization EIN: 93-4646850
        </Text>
      </VerticallyAligned>
      <Img
        dimension='180px'
        src='https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/15248996/svg'
        alt='logo'
      />
    </FooterContainer>
  );
}
