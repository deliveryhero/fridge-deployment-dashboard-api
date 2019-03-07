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
    dynamoDB: {
        endpoint: string;
        tables: {
          deployments: {
                tableName: string;
            };
        },
    };
}
