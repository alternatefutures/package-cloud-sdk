import { graphql } from 'msw';
import { handlers as AlternateFuturesSdkHandlers } from './AlternateFuturesSdk';
import { handlers as ApplicationHandlers } from './Applications';
import { handlers as DomainsHandlers } from './Domains';
import { handlers as EnsHandlers } from './ENS';
import { handlers as FunctionsHandlers } from './Functions';
import { handlers as IpnsHandlers } from './IPNS';
import { handlers as PrivateGatewayHandlers } from './PrivateGateway';
import { handlers as ProjectsHandlers } from './Projects';
import { handlers as SitesHandlers } from './Sites';
import { handlers as UserHandlers } from './User';

export const mockGraphqlServiceApiUrl = 'https://fleek.mock.server/graphql';
export const localhost = graphql.link(mockGraphqlServiceApiUrl);

export const handlers = [
  ...AlternateFuturesSdkHandlers,
  ...ApplicationHandlers,
  ...DomainsHandlers,
  ...EnsHandlers,
  ...FunctionsHandlers,
  ...IpnsHandlers,
  ...PrivateGatewayHandlers,
  ...ProjectsHandlers,
  ...SitesHandlers,
  ...UserHandlers,
];
