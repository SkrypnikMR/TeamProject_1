import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackEndRoutes, ReducerNames, RESTMethods } from 'consts';
import { Developer } from 'types';

enum Tags {
  Developers = 'developers',
}

export const developersApi = createApi({
  reducerPath: ReducerNames.Developers,
  baseQuery: fetchBaseQuery({
    baseUrl: BackEndRoutes.Base,
  }),
  tagTypes: [Tags.Developers],
  endpoints: (builder) => ({
    getDevelopers: builder.query<Developer[], void>({
      query: () => BackEndRoutes.Developers,
      providesTags: [Tags.Developers],
    }),
    updateDevelopers: builder.mutation({
      query: (developer: Developer) => ({
        url: BackEndRoutes.Developers,
        method: RESTMethods.PUT,
        body: developer,
      }),
      async onQueryStarted({ id, ...put }, { dispatch, queryFulfilled }) {
        dispatch(
          developersApi.util.updateQueryData('getDevelopers', undefined, (developers) => {
            const developer = developers.find(({ id: developerId }) => developerId === id);
            if (developer) {
              Object.assign(developer, put);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(developersApi.util.invalidateTags([Tags.Developers]));
        }
      },
    }),
  }),
});

export const { useGetDevelopersQuery, useUpdateDevelopersMutation } = developersApi;
