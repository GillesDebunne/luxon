import Zone from "./zone";
import DateTime from "./datetime";

// these aren't really private, but nor are they really useful to document

/**
 * @private
 */
class LuxonError extends Error {}

/**
 * @private
 */
export class UnitOutOfRangeError extends LuxonError {
  constructor(unit: string, value: unknown) {
    super(`you specified ${value} (of type ${typeof value}) as a ${unit}, which is invalid`);
  }
}

/**
 * @private
 */
export class InvalidUnitError extends LuxonError {
  constructor(unit: string) {
    super(`Invalid unit ${unit}`);
  }
}

/**
 * @private
 */
export class InvalidZoneError extends LuxonError {
  constructor(zone: Zone) {
    super(`${zone.name} is an invalid or unknown zone specifier`);
  }
}

/**
 * @private
 */
export class MissingPlatformFeatureError extends LuxonError {
  constructor(feature: string) {
    super(`missing ${feature} support`);
  }
}

/**
 * @private
 */
export class MismatchedWeekdayError extends LuxonError {
  constructor(weekday: number, inst: DateTime) {
    super(`you can't specify both a weekday of ${weekday} and a date of ${inst.toISO()}`);
  }
}

/**
 * @private
 */
export class UnparsableStringError extends LuxonError {
  constructor(format: string, text: string) {
    super(`can't parse ${text} into format ${format}`);
  }
}

/**
 * @private
 */
export class ConflictingSpecificationError extends LuxonError {}

/**
 * @private
 */
export class InvalidArgumentError extends LuxonError {}

/**
 * @private
 */
export class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
  }
}
