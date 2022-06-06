import React from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { Pages } from 'consts';
import { Main, About, Questions } from 'Pages';

function Routes() {
  return (
    <RouterRoutes>
      <Route path={Pages.Main} element={<Main />} />
      <Route path={Pages.About} element={<About />} />
      <Route path={Pages.Questions} element={<Questions />} />
    </RouterRoutes>
  );
}

export default Routes;
