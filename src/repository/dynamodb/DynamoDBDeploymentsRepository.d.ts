import { IDeploymentsRepository } from '../IDeploymentsRepository';
import { Deployment } from '../../model/Deployment';
export declare class DynamoDBDeploymentsRepository implements IDeploymentsRepository {
    addDeployment(deployment: Deployment): Promise<void>;
    listApplications(teamName: string, environmentName: string): Promise<string[]>;
    listDeployments(teamName: string, environmentName: string, applicationName: string): Promise<Deployment[]>;
    listEnvironments(teamName: string): Promise<string[]>;
}
