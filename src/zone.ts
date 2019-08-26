import { ZoneIsAbstractError } from "./errors";
import { ZoneOffsetOptions, ZoneOffsetFormat } from "./types/zone";

/**
 * @interface
 * An abstract Zone class
 */
export default abstract class Zone {
  /**
   * The type of zone
   * @abstract
   * @type {string}
   */
  get type(): string {
    throw new ZoneIsAbstractError();
  }

  /**
   * The name of this zone.
   * @abstract
   * @type {string}
   */
  get name(): string {
    throw new ZoneIsAbstractError();
  }

  /**
   * Returns whether the offset is known to be fixed for the whole year.
   * @abstract
   * @type {boolean}
   */
  get universal(): boolean {
    throw new ZoneIsAbstractError();
  }

  /**
   * Returns the offset's common name (such as EST) at the specified timestamp
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the name
   * @param {Object} options - Options to affect the format
   * @param {string} options.format - What style of offset to return. Accepts 'long' or 'short'.
   * @param {string} options.locale - What locale to return the offset name in.
   * @return {string | null}
   */
  offsetName(_ts: number, _options: ZoneOffsetOptions): string | null {
    throw new ZoneIsAbstractError();
  }

  /**
   * Returns the offset's value as a string
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to get the offset
   * @param {string} format - What style of offset to return.
   *                          Accepts 'narrow', 'short', or 'techie'. Returning '+6', '+06:00', or '+0600' respectively
   * @return {string}
   */
  formatOffset(_ts: number, _format: ZoneOffsetFormat): string {
    throw new ZoneIsAbstractError();
  }

  /**
   * Return the offset in minutes for this zone at the specified timestamp.
   * @abstract
   * @param {number} ts - Epoch milliseconds for which to compute the offset
   * @return {number}
   */
  offset(_ts: number): number {
    throw new ZoneIsAbstractError();
  }

  /**
   * Return whether this Zone is equal to another zone
   * @abstract
   * @param {Zone} otherZone - the zone to compare
   * @return {boolean}
   */
  equals(_otherZone: Zone): boolean {
    throw new ZoneIsAbstractError();
  }

  /**
   * Return whether this Zone is valid.
   * @abstract
   * @type {boolean}
   */
  get isValid(): boolean {
    throw new ZoneIsAbstractError();
  }
}
