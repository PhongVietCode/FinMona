/**
 * This file contains the application's variables.
 *
 * Define color, sizes, etc. here instead of duplicating them throughout the components.
 * That allows to change them more easily later on.
 */

/**
 * Colors
 */
enum Colors {
  TRANSPARENT = "rgba(0,0,0,0)",
  WHITE = "#FFFFFF",
  PRIMARY = "#516EFC",
  TEXT_BOLD = "#28292C",
  TEXT_NORMAL="#363847",
  TEXT_LIGHT="#E3E3E9",
  STROKE="#F8F7FD",
  WARN="#FF6B84",
  BUTTON="#A682F9",
  CAUTION="#FBCF35",
  SECONDARY="#4E45BF",
  LIGHT_GRAY="#908EAB",
  SUCCESS = "#28a745",
  ERROR = "#dc3545",  
  GREEN_80="#2AB784",
  BACKGROUND="#FCFCFC",

}

enum NavigationColors {
  ACTIVE = Colors.PRIMARY,
  INACTIVE = Colors.LIGHT_GRAY
}

/**
 * FontSize
 */
enum FontSize {
  TINY = 12,
  SMALL= 15,
  REGULAR = 20,
  LARGE = 24,
  HUGE = 32,
}

/**
 * Metrics Sizes
 */
const tiny = 5; // 10
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30

enum MetricsSizes {
  TINY = tiny,
  SMALL = small,
  REGULAR = regular,
  LARGE = large,
}

export {Colors,NavigationColors,FontSize, MetricsSizes};