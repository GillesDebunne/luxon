/* eslint no-global-assign: "off" */
import { DateTime, Settings, Duration } from "../src/luxon";
import { NumberingSystem, CalendarSystem } from "../src/types/locale";
import { ZoneLike } from "../src/types/zone";

const withoutIntl = function(name: string, f: Function) {
  const fullName = `With no Intl support, ${name}`;
  test(fullName, () => {
    const intl = Intl;
    try {
      // @ts-ignore
      Intl = undefined;
      Settings.resetCaches();
      f();
    } finally {
      // @ts-ignore
      Intl = intl;
    }
  });
};

const withoutFTP = function(name: string, f: Function) {
  const fullName = `With no FormatToParts support, ${name}`;
  test(fullName, () => {
    const { formatToParts } = Intl.DateTimeFormat.prototype;
    try {
      Intl.DateTimeFormat.prototype.formatToParts = undefined;
      Settings.resetCaches();
      f();
    } finally {
      Intl.DateTimeFormat.prototype.formatToParts = formatToParts;
    }
  });
};

const withoutRTF = function(name: string, f: Function) {
  const fullName = `With no RelativeTimeFormat support, ${name}`;
  test(fullName, () => {
    const rtf = Intl.RelativeTimeFormat;
    try {
      // @ts-ignore
      Intl.RelativeTimeFormat = undefined;
      Settings.resetCaches();
      f();
    } finally {
      Intl.RelativeTimeFormat = rtf;
    }
  });
};

const withoutZones = function(name: string, f: Function) {
  const fullName = `With no time zone support, ${name}`;
  test(fullName, () => {
    const { DateTimeFormat } = Intl;
    try {
      // @ts-ignore
      Intl.DateTimeFormat = (locale, opts = {}) => {
        if (opts.timeZone) {
          throw new Error(`Unsupported time zone specified ${opts.timeZone}`);
        }
        return DateTimeFormat(locale, opts);
      };

      Intl.DateTimeFormat.prototype = DateTimeFormat.prototype;

      Settings.resetCaches();
      f();
    } finally {
      Intl.DateTimeFormat = DateTimeFormat;
    }
  });
};

const withNow = function(name: string, dt: DateTime, f: Function) {
  test(name, () => {
    const previousNow = Settings.now;

    try {
      Settings.now = () => dt.valueOf();
      f();
    } finally {
      Settings.now = previousNow;
    }
  });
};

const withDefaultZone = function(zone: ZoneLike, f: Function) {
  const previousDefaultZone = Settings.defaultZone;
  try {
    Settings.setDefaultZone(zone);
    f();
  } finally {
    Settings.setDefaultZone(previousDefaultZone);
  }
};

const withDefaultLocale = function(locale: string | undefined, f: Function) {
  const previousDefaultLocale = Settings.defaultLocale;
  try {
    Settings.defaultLocale = locale;
    f();
  } finally {
    Settings.defaultLocale = previousDefaultLocale;
  }
};

const withDefaultNumberingSystem = function(
  numberingSystem: NumberingSystem | undefined,
  f: Function
) {
  const previousNumberingSystem = Settings.defaultNumberingSystem;
  try {
    Settings.defaultNumberingSystem = numberingSystem;
    f();
  } finally {
    Settings.defaultNumberingSystem = previousNumberingSystem;
  }
};

const withDefaultOutputCalendar = function(
  outputCalendar: CalendarSystem | undefined,
  f: Function
) {
  const previousOutputCalendar = Settings.defaultOutputCalendar;
  try {
    Settings.defaultOutputCalendar = outputCalendar;
    f();
  } finally {
    Settings.defaultOutputCalendar = previousOutputCalendar;
  }
};

const atHour = function(hour: number) {
  return DateTime.fromObject({ year: 2017, month: 5, day: 25 })
    .startOf("day")
    .set({ hour });
};

const conversionAccuracy = function(duration: Duration) {
  const fourWeeks = {
    years: 0,
    quarters: 0,
    months: 0,
    weeks: 4,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0
  };
  const isCasual = duration.set(fourWeeks).normalize().months === 1;
  return isCasual ? "casual" : "longterm";
};

const Helpers = {
  withoutIntl,
  withoutFTP,
  withoutRTF,
  withoutZones,
  withNow,
  withDefaultZone,
  withDefaultLocale,
  withDefaultNumberingSystem,
  withDefaultOutputCalendar,
  atHour,
  conversionAccuracy
};

export default Helpers;
