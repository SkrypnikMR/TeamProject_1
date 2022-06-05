import React from 'react';
import { Spin } from 'antd';

import { FlexCol } from 'Common';

function Loader() {
  return (
    <FlexCol height="50%">
      <Spin size="large" />
    </FlexCol>
  );
}

export default Loader;
