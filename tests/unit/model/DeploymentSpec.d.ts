export declare class DeploymentSpec {
    private classTransformer;
    private classValidator;
    constructor();
    'empty Deployments'(): void;
    'valid deployments with all fields'(): void;
    'valid deployments with only required fields'(): void;
    'invalid deployments without one required fields'(): void;
    private assertDeploymentFixtureByFileName;
    private assertDeploymentFixture;
}
