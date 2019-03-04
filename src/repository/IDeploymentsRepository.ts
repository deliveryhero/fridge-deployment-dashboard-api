import {Deployment} from '../model/Deployment';

export interface IDeploymentsRepository {
  addDeployment(deployment: Deployment): Promise<void>;

  listEnvironments(teamName: string): Promise<string[]>;

  listApplications(teamName: string, environmentName: string): Promise<string[]>;

  listDeployments(teamName: string, environmentName: string, applicationName: string): Promise<Deployment[]>;
}
