import React from 'react';

import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import Footer from 'common/components/footer/Footer';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FooterLayout() {
  return (
    <Layout>
      <Footer />
      <Outlet />
    </Layout>
  );
}
