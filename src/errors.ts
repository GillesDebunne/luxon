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

    // See https://github.com/facebook/jest/issues/8279#issuecomment-539775425
    Object.setPrototypeOf(this, UnitOutOfRangeError.prototype);
  }
}

/**
 * @private
 */
export class InvalidUnitError extends LuxonError {
  constructor(unit: string) {
    super(`Invalid unit ${unit}`);
    Object.setPrototypeOf(this, InvalidUnitError.prototype);
  }
}

/**
 * @private
 */
export class InvalidZoneError extends LuxonError {
  constructor(zone: Zone) {
    super(`${zone.name} is an invalid or unknown zone specifier`);
    Object.setPrototypeOf(this, InvalidZoneError.prototype);
  }
}

/**
 * @private
 */
export class MissingPlatformFeatureError extends LuxonError {
  constructor(feature: string) {
    super(`missing ${feature} support`);
    Object.setPrototypeOf(this, MissingPlatformFeatureError.prototype);
  }
}

/**
 * @private
 */
export class MismatchedWeekdayError extends LuxonError {
  constructor(weekday: number, inst: DateTime) {
    super(`you can't specify both a weekday of ${weekday} and a date of ${inst.toISO()}`);
    Object.setPrototypeOf(this, MismatchedWeekdayError.prototype);
  }
}

/**
 * @private
 */
export class UnparsableStringError extends LuxonError {
  constructor(format: string, text: string) {
    super(`can't parse ${text} into format ${format}`);
    Object.setPrototypeOf(this, UnparsableStringError.prototype);
  }
}

/**
 * @private
 */
export class ConflictingSpecificationError extends LuxonError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConflictingSpecificationError.prototype);
  }
}

/**
 * @private
 */
export class InvalidArgumentError extends LuxonError {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidArgumentError.prototype);
  }
}

/**
 * @private
 */
export class ZoneIsAbstractError extends LuxonError {
  constructor() {
    super("Zone is an abstract class");
    Object.setPrototypeOf(this, ZoneIsAbstractError.prototype);
  }
}
