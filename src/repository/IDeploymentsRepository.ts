import {Deployment} from '../model/Deployment';

export class RepositoryError extends Error {}

export interface IDeploymentsRepository {
  addDeployment(deployment: Deployment): Promise<void>;

  listEnvironments(teamName: string): Promise<string[]>;

  listDeployments(teamName: string, environmentName: string): Promise<Deployment[]>;
}
