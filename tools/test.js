const { DateTime } = require("luxon");

const ms = 1596472735000;

function printDateTime(dt) {
  console.log(dt)
  console.log(dt.zoneName)
  console.log(dt.locale)
  if (
    dt > DateTime.utc().minus({ week: 1 }) &&
    dt < DateTime.utc().minus({ minute: 1 })
  ) {
    console.log(dt.toRelative());
    console.log(dt.toLocaleString(DateTime.TIME_24_WITH_LONG_OFFSET));
    return `${dt.toRelative()}, ${dt.toLocaleString(DateTime.TIME_24_SIMPLE)}`;
  } else {
    return dt.toLocaleString(DateTime.DATETIME_MED);
  }
}

const time = printDateTime(DateTime.fromMillis(ms));

console.log(time);
