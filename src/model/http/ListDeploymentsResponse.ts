import {Deployment} from '../Deployment';

export class ListDeploymentsResponse {
  [applicationName: string]: Deployment[];
}
