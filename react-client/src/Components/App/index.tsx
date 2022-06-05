import React, { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';

import { Pages } from 'consts';
import { Main, About, Questions } from 'Pages';
import { Container } from 'Common';

import Header from 'Components/Header';

const tempStyle = { minHeight: '91vh' };

export const App: FC = () => {
  return (
    <Layout className="layout">
      <BrowserRouter>
        <Header />
        <Layout.Content style={tempStyle}>
          <Container padding="10px 50px 20px 50px" height="100%">
            <Routes>
              <Route path={Pages.Main} element={<Main />} />
              <Route path={Pages.About} element={<About />} />
              <Route path={Pages.Questions} element={<Questions />} />
            </Routes>
          </Container>
        </Layout.Content>
      </BrowserRouter>
    </Layout>
  );
};
