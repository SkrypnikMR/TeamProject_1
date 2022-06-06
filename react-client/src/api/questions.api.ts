import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BackEndRoutes, ReducerNames, RESTMethods } from 'consts';
import { Question } from 'types';

enum Tags {
  Questions = 'questions',
}

export const questionsApi = createApi({
  reducerPath: ReducerNames.Questions,
  baseQuery: fetchBaseQuery({
    baseUrl: BackEndRoutes.Base,
  }),
  tagTypes: [Tags.Questions],
  endpoints: (builder) => ({
    getQuestions: builder.query<Question[], void>({
      query: () => BackEndRoutes.Questions,
      providesTags: [Tags.Questions],
    }),
    deleteQuestion: builder.mutation({
      query: (question: Question) => ({
        url: BackEndRoutes.Developers,
        method: RESTMethods.DELETE,
        body: question,
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        dispatch(
          questionsApi.util.updateQueryData('getQuestions', undefined, (questions) => {
            questions = questions.filter(({ id: questionId }) => questionId !== id);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          dispatch(questionsApi.util.invalidateTags([Tags.Questions]));
        }
      },
    }),
  }),
});

export const { useLazyGetQuestionsQuery, useDeleteQuestionMutation } = questionsApi;
