import React, { ReactNode } from 'react';
import { Carousel as AntdCarousel } from 'antd';

import { FlexCol, Image } from 'Common';

interface CarouselProps {
  autoplay?: boolean;
  imagePaths?: string[] | ReactNode[];
  height?: string;
}

function Carousel({ autoplay, height = '100%' }: CarouselProps) {
  return (
    <FlexCol height={height} width="80%" margin="0 auto">
      <AntdCarousel autoplay={autoplay}>
        <Image height={height} src="./img/1slider.gif"></Image>
        <Image height={height} src="./img/2slider.gif"></Image>
        <Image height={height} src="./img/3slider.gif"></Image>
      </AntdCarousel>
    </FlexCol>
  );
}

export default Carousel;
