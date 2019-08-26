import Zone from "../zone";

export interface ZoneOffsetOptions {
  format: "short" | "long";
  locale: string;
}

export type ZoneOffsetFormat = "narrow" | "short" | "techie";

export type ZoneParameter = Zone | number | string | null | undefined;
