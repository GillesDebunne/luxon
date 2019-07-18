import { ConversionAccuracy } from "./common";
import { NumberingSystem } from "./locale";
import { DateTimeFormatOptions } from "./datetime";

export interface DurationOptions {
  locale?: string;
  numberingSystem?: NumberingSystem;
  conversionAccuracy?: ConversionAccuracy;
  nullOnInvalid?: boolean;
}

export interface DurationObject {
  years?: number;
  quarters?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export type DurationUnit = keyof DurationObject;

export interface DurationToFormatOptions extends DateTimeFormatOptions {
  floor?: boolean;
  round?: boolean;
}
