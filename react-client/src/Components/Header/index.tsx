import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { PageNames, Pages } from 'consts';

function Header() {
  const navigation = useNavigate();

  const onMenuItemClick = useCallback(
    (e: any) => {
      navigation(e.key);
    },
    [navigation]
  );

  const menu = useMemo(
    () => [
      { key: Pages.Main, label: PageNames.Main, onClick: onMenuItemClick },
      { key: Pages.Questions, label: PageNames.Questions, onClick: onMenuItemClick },
      { key: Pages.About, label: PageNames.About, onClick: onMenuItemClick },
    ],
    [onMenuItemClick]
  );

  return (
    <Layout.Header>
      <Menu theme="dark" mode="horizontal" items={menu} />
    </Layout.Header>
  );
}

export default Header;
