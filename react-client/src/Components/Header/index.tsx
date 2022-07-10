import React, { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';

import { PageNames, Pages } from 'consts';
import { LayoutHeader } from 'Common';

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
    <LayoutHeader height="9vh">
      <Menu theme="dark" mode="horizontal" items={menu} />
    </LayoutHeader>
  );
}

export default Header;
