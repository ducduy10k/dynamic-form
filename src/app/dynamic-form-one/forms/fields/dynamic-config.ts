import { FieldType } from './field-type';

export type DynamicConfig = {
  key: string;
  fieldType: FieldType;
  prop: { [key: string]: any };
};
