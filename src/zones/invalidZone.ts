import Zone from "../zone";
import { ZoneOffsetOptions, ZoneOffsetFormat } from "../types/zone";

/**
 * A zone that failed to parse. You should never need to instantiate this.
 * @implements {Zone}
 */
export default class InvalidZone extends Zone {
  private zoneName: Readonly<string>;

  constructor(zoneName: string) {
    super();
    /**  @private */
    this.zoneName = zoneName;
  }

  /** @override **/
  get type() {
    return "invalid";
  }

  /** @override **/
  get name() {
    return this.zoneName;
  }

  /** @override **/
  get universal() {
    return false;
  }

  /** @override **/
  offsetName(_ts?: number, _options?: ZoneOffsetOptions) {
    return null;
  }

  /** @override **/
  formatOffset(_ts: number, _format: ZoneOffsetFormat) {
    return "";
  }

  /** @override **/
  offset(_ts?: number) {
    return NaN;
  }

  /** @override **/
  equals(_otherZone: Zone) {
    return false;
  }

  /** @override **/
  get isValid() {
    return false;
  }
}
