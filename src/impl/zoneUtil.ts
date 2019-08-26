/**
 * @private
 */

import Zone from "../zone";
import IANAZone from "../zones/IANAZone";
import FixedOffsetZone from "../zones/fixedOffsetZone";
import InvalidZone from "../zones/invalidZone";
import SystemZone from "../zones/systemZone";

import { isUndefined, isString, isNumber } from "./util";
import { ZoneParameter } from "../types/zone";

export function normalizeZone(input: ZoneParameter, defaultZone: Zone) {
  if (isUndefined(input) || input === null) return defaultZone;
  if (input instanceof Zone) return input;
  if (isString(input)) {
    const lowered = input.toLowerCase();
    if (lowered === "default") return defaultZone;
    if (lowered === "system") return SystemZone.instance;
    if (lowered === "utc") return FixedOffsetZone.utcInstance;
    const offset = IANAZone.parseGMTOffset(input);
    if (offset != null) {
      // handle Etc/GMT-4, which V8 chokes on
      return FixedOffsetZone.instance(offset);
    }
    if (IANAZone.isValidSpecifier(lowered)) return IANAZone.create(input);
    return FixedOffsetZone.parseSpecifier(lowered) || new InvalidZone(input);
  }
  if (isNumber(input)) return FixedOffsetZone.instance(input);
  // GILLES commenting out for now
  // if (typeof input === "object" && input.offset && typeof input.offset === "number") {
  // This is dumb, but the instanceof check above doesn't seem to really work
  // so we're duck checking it
  // return input;
  // }
  return new InvalidZone(input);
}
