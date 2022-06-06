import React, { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Container, Layout, LayoutContent } from 'Common';

import Header from 'Components/Header';
import Footer from 'Components/Footer';
import Routes from 'Components/Routes';

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Layout height="100%">
        <Header />
        <LayoutContent height="86vh">
          <Container padding="10px 50px 20px 50px" height="100%" overflow="auto">
            <Routes />
          </Container>
        </LayoutContent>
        <Footer />
      </Layout>
    </BrowserRouter>
  );
};
