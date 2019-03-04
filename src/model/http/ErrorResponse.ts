import {IsNotEmpty} from 'class-validator';
import {IsFridgeISO8601WithoutMs} from '../../custom-validation-decorator/FridgeCustomValidationDecorators';

export class ErrorResponse {
  @IsNotEmpty()
  @IsFridgeISO8601WithoutMs()
  readonly timestamp: string;

  @IsNotEmpty()
  readonly message: string;
}
