import {IsNotEmpty, IsOptional} from 'class-validator';
import {IsFridgeISO8601WithoutMs} from '../custom-validation-decorator/FridgeCustomValidationDecorators';

export class Deployment {
  @IsNotEmpty()
  teamName: string;

  @IsNotEmpty()
  releaseTag: string;

  @IsNotEmpty()
  environment: string;

  @IsNotEmpty()
  applicationName: string;

  @IsNotEmpty()
  region: string;

  @IsNotEmpty()
  @IsFridgeISO8601WithoutMs()
  timestamp: string;

  @IsOptional()
  cloudProvider: string;

  @IsOptional()
  configurationData?: object;
}
