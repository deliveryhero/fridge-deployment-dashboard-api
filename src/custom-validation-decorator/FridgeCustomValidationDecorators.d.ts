import { ValidationOptions } from 'class-validator';
/**
 * Valid formats
 * 2010-02-18T11:22:33Z
 */
export declare function IsFridgeISO8601WithoutMs(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
