export const formatPostDate = (date) => {
  const currentDate = new Date();

  const timeDifferenceInSeconds = Math.floor((currentDate - date) / 1000);
  const timeDifferenceInMinutes = Math.floor(timeDifferenceInSeconds / 60);
  const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
  const timeDifferenceInDays = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays > 1) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (timeDifferenceInDays === 1) {
    return "1d";
  } else if (timeDifferenceInHours >= 1) {
    return `${timeDifferenceInHours}h`;
  } else if (timeDifferenceInMinutes >= 1) {
    return `${timeDifferenceInMinutes}m`;
  } else {
    return "Just now";
  }
};

const RELATIVE_TIME_FORMATTER = new Intl.RelativeTimeFormat("en-gb", {
  style: "short",
  numeric: "auto",
});

const UNITS = {
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
};

export const formatDate = (targetDate, mode) => {
  const date = new Date(targetDate);

  if (mode === "full") return getFullTime(date);
  if (mode === "post") return formatPostDate(date);
  if (mode === "user") return getJoinedTime(date);

  return getShortTime(date);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-GB", {
    notation: number > 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(number);
};

const getFullTime = (date) => {
  const fullDate = new Intl.DateTimeFormat("en-gb", {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);

  const splittedDate = fullDate.split(", ");

  const formattedDate =
    splittedDate.length === 2
      ? [...splittedDate].reverse().join(" · ")
      : [splittedDate.slice(0, 2).join(", "), splittedDate.slice(-1)]
          .reverse()
          .join(" · ");

  return formattedDate;
};

// const getPostTime = (date) => {
//   if (isToday(date)) return getRelativeTime(date);
//   if (isYesterday(date))
//     return new Intl.DateTimeFormat("en-gb", {
//       day: "numeric",
//       month: "short",
//     }).format(date);

//   return new Intl.DateTimeFormat("en-gb", {
//     day: "numeric",
//     month: "short",
//     year: isCurrentYear(date) ? undefined : "numeric",
//   }).format(date);
// };

const getJoinedTime = (date) => {
  return new Intl.DateTimeFormat("en-gb", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const getShortTime = (date) => {
  const isNear = isToday(date)
    ? "today"
    : isYesterday(date)
    ? "yesterday"
    : null;

  return isNear
    ? `${isNear === "today" ? "Today" : "Yesterday"} at ${date
        .toLocaleTimeString("en-gb")
        .slice(0, -3)}`
    : getFullTime(date);
};

const getRelativeTime = (date) => {
  const relativeTime = calculateRelativeTime(date);

  if (relativeTime === "now") return relativeTime;

  const [number, unit] = relativeTime.split(" ");

  return `${number}${unit[0]}`;
};

const calculateRelativeTime = (date) => {
  const elapsed = +date - +new Date();

  if (elapsed > 0) return "now";

  const unitsItems = Object.entries(UNITS);

  for (const [unit, millis] of unitsItems)
    if (Math.abs(elapsed) > millis)
      return RELATIVE_TIME_FORMATTER.format(Math.round(elapsed / millis), unit);

  return RELATIVE_TIME_FORMATTER.format(Math.round(elapsed / 1000), "second");
};

const isToday = (date) => {
  return new Date().toDateString() === date.toDateString();
};

const isYesterday = (date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString() === date.toDateString();
};

const isCurrentYear = (date) => {
  return date.getFullYear() === new Date().getFullYear();
};
