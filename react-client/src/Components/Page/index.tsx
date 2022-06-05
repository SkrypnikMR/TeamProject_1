import React, { FC, ReactNode } from 'react';
import { Typography } from 'antd';

import { FlexCol } from 'Common';

interface PageProps {
  title?: string | ReactNode;
  children?: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }) => (
  <FlexCol height="100%" gap="10px" justifyContent="flex-start">
    {title && <Typography.Title style={{ textAlign: 'center' }}>{title}</Typography.Title>}
    {children}
  </FlexCol>
);

export default Page;
