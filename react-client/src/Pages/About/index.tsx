import React from 'react';
import Page from 'Components/Page';
import Carousel from 'Components/Carousel';

export function About() {
  return (
    <Page title="About us">
      <Carousel autoplay height="70vh" />
    </Page>
  );
}
