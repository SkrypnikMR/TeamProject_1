import React from 'react';

import { useGetDevelopersQuery } from 'api';

import Page from 'Components/Page';
import Error from 'Components/Error';
import Loader from 'Components/Loader';
import DeveloperCard from 'Components/DeveloperCard';
import { FlexRow } from 'Common';

export function Main() {
  const { data: developers, isFetching, isError } = useGetDevelopersQuery();

  if (isError) {
    return (
      <Page title="Developers">
        <Error />
      </Page>
    );
  }

  if (isFetching) {
    return (
      <Page title="Developers">
        <Loader />
      </Page>
    );
  }

  return (
    <Page title="Developers">
      <FlexRow gap="100px" flexWrap="wrap" justifyContent="center">
        {developers?.map((developer) => (
          <DeveloperCard key={developer.id} {...developer} />
        ))}
      </FlexRow>
    </Page>
  );
}
