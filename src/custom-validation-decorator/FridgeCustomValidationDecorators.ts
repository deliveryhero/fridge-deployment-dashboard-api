import {registerDecorator, ValidationArguments, ValidationOptions, Validator} from 'class-validator';

const validator = new Validator();

/**
 * Valid formats
 * 2010-02-18T11:22:33Z
 */
export function IsFridgeISO8601WithoutMs(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFridgeISO8601WithoutMs',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return validator.isISO8601(value) &&
              value.match(
                  /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\dZ$/
              );
        },
        defaultMessage: defaultMessage,
      },
    });
  };
}

function defaultMessage(validationArguments?: ValidationArguments): string {
  return `${validationArguments.property} is not valid`;
}
