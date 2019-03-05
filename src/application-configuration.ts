export interface IApplicationConfig {
    readonly stage: string;
    readonly aws: IAwsConfig;
}
export class ApplicationConfig implements IApplicationConfig {
    constructor(
      readonly stage: string,
      readonly aws: IAwsConfig,
    ) {}
}

export interface IAwsConfig {
    region: string;
    accountId: string;
    dynamoDB: {
        endpoint: string;
        tables: {
          deployments: {
                tableName: string;
            };
        },
    };
}
