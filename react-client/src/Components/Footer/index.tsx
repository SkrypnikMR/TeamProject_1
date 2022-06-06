import React from 'react';
import { Link } from 'react-router-dom';

import { FlexRow, LayoutFooter, Span } from 'Common';
import { Pages } from 'consts';

function Footer() {
  return (
    <LayoutFooter width="100%" padding="0" height="5.8vh">
      <FlexRow
        justifyContent="center"
        background="#141414"
        minWidth="100%"
        height="100%"
        color="white"
        alignItems="center"
        gap="5px"
      >
        <Span width="auto">© 2021. All Rights Reserved | Design by</Span>
        <Link to={Pages.About}>bigBossesExtraSmart | Join us right now!</Link>
      </FlexRow>
    </LayoutFooter>
  );
}

export default Footer;
