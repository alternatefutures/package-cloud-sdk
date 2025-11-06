import { graphql } from 'msw';

export const mockGraphqlServiceApiUrl = 'https://af.mock.server/graphql';
export const localhost = graphql.link(mockGraphqlServiceApiUrl);
