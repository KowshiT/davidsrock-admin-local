import dayjs from "dayjs";
const moment = require('moment-timezone');

export const addFiveAndHalfHours = (dateString: any) => {
  const dateObj = new Date(dateString.slice(1, 25));
  dateObj.setTime(dateObj.getTime() + 5 * 60 * 60 * 1000 + 30 * 60 * 1000);
  const updatedDateString = dateObj.toString();

  console.log("updatedDateString", updatedDateString);
  return updatedDateString;
};

// GET DATE
export const getDateFromDayjsDate = (date: any) => {
  const dayJsInstance = dayjs(date);

  const dayOfMonth =
    dayJsInstance.date() < 10
      ? "0" + dayJsInstance.date()
      : dayJsInstance.date();
  const month =
    dayJsInstance.month() + 1 < 10
      ? "0" + (dayJsInstance.month() + 1)
      : dayJsInstance.month() + 1;
  const year = dayJsInstance.year();

  console.log(year + "-" + month + "-" + dayOfMonth);

  return year + "-" + month + "-" + dayOfMonth;
};

// GET TIME
export const getTimeFromString = (dateString: string) => {
  const originalDate = new Date(dateString);

  originalDate.setHours(
    originalDate.getHours() + 5,
    originalDate.getMinutes() + 30
  );

  const updatedTimeString = originalDate.toISOString();

  console.log("Updated Time:", updatedTimeString);

  return updatedTimeString;
};

export const getDateFromString = (dateString: any) => {
  const date = new Date(dateString);
  // Get the day of the month (1-31)
  const day = date.getDate();

  return day;
};

export const dateFormatForEvent = (inputDate: any) => {
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const date = new Date(inputDate);
  //return the week
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const formattedDate = `${dayOfWeek}, ${day} ${month} ${year}`;

  return formattedDate;
};

export const convertTo12HourFormat = (time24Hour) => {
  if (typeof time24Hour !== "string" || !/^\d{2}:\d{2}$/.test(time24Hour)) {
    return "Invalid time format";
  }

  const [hourStr, minuteStr] = time24Hour.split(":");
  const hours = parseInt(hourStr, 10);
  const minutes = parseInt(minuteStr, 10);

  const period = hours >= 12 ? "PM" : "AM";

  const hours12 = hours % 12 || 12; // If hours is 0, display 12

  const time12Hour = `${hours12}:${String(minutes).padStart(2, "0")} ${period}`;

  return time12Hour;
};

export const dateFormatForTimeLine = (inputDate: any) => {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const date = new Date(inputDate);
  //return the week
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const amOrpm = hour >= 12 ? "PM" : "AM";

  //convert hours 24 hours format to 12 hour format
  const formattedHours = hour % 12 === 0 ? 12 : hour % 12;

  //add leading zero for minutes
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  //formatted time
  const time = `${formattedHours}:${formattedMinutes} ${amOrpm}`;

  const formattedDate = `${day} ${month} ${year} at ${time}`;

  return formattedDate;
};

export const TimeFormatForMessage = (inputDate: any) => {
  const date = new Date(inputDate);
  //return the week
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const amOrpm = hour >= 12 ? "PM" : "AM";

  //convert hours 24 hours format to 12 hour format
  const formattedHours = hour % 12 === 0 ? 12 : hour % 12;

  //add leading zero for minutes
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  //formatted time
  const time = `${formattedHours}:${formattedMinutes} ${amOrpm}`;

  const formattedDate = `${time}`;

  return formattedDate;
};

export const sinceDateConverter = (inputDateString: string) => {
  const inputDate = new Date(inputDateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = inputDate.getDate();
  const month = monthNames[inputDate.getMonth()];
  const year = inputDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;

  console.log(formattedDate);
  return formattedDate;
};

export const getTimeDifference = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();

  const timeDifferenceInSeconds: number = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000
  );

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} second${timeDifferenceInSeconds === 1 ? "" : "s"
      } ago`;
  }

  const timeDifferenceInMinutes: number = Math.floor(
    timeDifferenceInSeconds / 60
  );

  if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes} minute${timeDifferenceInMinutes === 1 ? "" : "s"
      } ago`;
  }

  const timeDifferenceInHours: number = Math.floor(
    timeDifferenceInMinutes / 60
  );

  if (timeDifferenceInHours < 24) {
    return `${timeDifferenceInHours} hour${timeDifferenceInHours === 1 ? "" : "s"
      } ago`;
  }

  const timeDifferenceInDays: number = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays < 7) {
    return `${timeDifferenceInDays} day${timeDifferenceInDays === 1 ? "" : "s"
      } ago`;
  }

  const timeDifferenceInWeeks: number = Math.floor(timeDifferenceInDays / 7);

  if (timeDifferenceInWeeks < 4) {
    return `${timeDifferenceInWeeks} week${timeDifferenceInWeeks === 1 ? "" : "s"
      } ago`;
  }

  const timeDifferenceInMonths: number = Math.floor(timeDifferenceInDays / 30);

  if (timeDifferenceInMonths < 12) {
    return `${timeDifferenceInMonths} month${timeDifferenceInMonths === 1 ? "" : "s"
      } ago`;
  }

  const timeDifferenceInYears: number = Math.floor(timeDifferenceInMonths / 12);

  return `${timeDifferenceInYears} year${timeDifferenceInYears === 1 ? "" : "s"
    } ago`;
};

export const getTimeDifferenceWithOneLetter = (dateString: string) => {
  const date = new Date(dateString);
  const currentDate = new Date();

  const timeDifferenceInSeconds: number = Math.floor(
    (currentDate.getTime() - date.getTime()) / 1000
  );

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds}s ago`;
  }

  const timeDifferenceInMinutes: number = Math.floor(
    timeDifferenceInSeconds / 60
  );

  if (timeDifferenceInMinutes < 60) {
    return `${timeDifferenceInMinutes}m ago`;
  }

  const timeDifferenceInHours: number = Math.floor(
    timeDifferenceInMinutes / 60
  );

  if (timeDifferenceInHours < 24) {
    return `${timeDifferenceInHours}h ago`;
  }

  const timeDifferenceInDays: number = Math.floor(timeDifferenceInHours / 24);

  if (timeDifferenceInDays < 7) {
    return `${timeDifferenceInDays}d ago`;
  }

  const timeDifferenceInWeeks: number = Math.floor(timeDifferenceInDays / 7);

  if (timeDifferenceInWeeks < 4) {
    return `${timeDifferenceInWeeks}w ago`;
  }

  const timeDifferenceInMonths: number = Math.floor(timeDifferenceInDays / 30);

  if (timeDifferenceInMonths < 12) {
    return `${timeDifferenceInMonths}m ago`;
  }

  const timeDifferenceInYears: number = Math.floor(timeDifferenceInMonths / 12);

  return `${timeDifferenceInYears}y ago`;
};

export const extractTimeFromSelectedDate = (
  selectedDateObject: any
): string => {
  const hasDateProperty = selectedDateObject?.$d;

  if (hasDateProperty) {
    const selectedDate = selectedDateObject.$d;

    const hours = selectedDate.getHours().toString().padStart(2, "0"); // Ensure 2 digits
    const minutes = selectedDate.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits
    const seconds = selectedDate.getSeconds().toString().padStart(2, "0"); // Ensure 2 digits

    return `${hours}:${minutes}:${seconds}`;
  } else {
    const date = new Date(selectedDateObject);
    if (!isNaN(date.getTime())) {
      const hours = date.getHours().toString().padStart(2, "0"); // Ensure 2 digits
      const minutes = date.getMinutes().toString().padStart(2, "0"); // Ensure 2 digits
      const seconds = date.getSeconds().toString().padStart(2, "0"); // Ensure 2 digits
      const timePart = `${hours}:${minutes}:${seconds}`;
      return timePart;
    }
    return null;
  }
};

export const combineDateAndTime = (date: any, time: any) => {
  // Extract the date part from the datetime string
  let extractedDatePart;

  if (date?.$d) {
    extractedDatePart = extractDatePart(date);
  } else {
    extractedDatePart = date.substring(0, 11);
  }

  // Combine the extracted date part with the separate time value
  const combinedDateTime =
    extractedDatePart + extractTimeFromSelectedDate(time);

  return combinedDateTime;
};

// You should define the extractDatePart and extractTimeFromSelectedDate functions here

export const extractDatePart = (inputDate: any) => {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const datePart = `${year}-${month}-${day}T`;

  return datePart;
};

export const getUserTimeZone = () => {
  const userTimeZoneOffset = new Date().getTimezoneOffset(); // Offset is in minutes

  const hours = Math.floor(Math.abs(userTimeZoneOffset) / 60);
  const minutes = Math.abs(userTimeZoneOffset) % 60;

  const sign = userTimeZoneOffset > 0 ? '-' : '+';

  const formattedTimeZoneOffset = `${sign}${hours}:${String(minutes).padStart(2, '0')}`;

  console.log("User Time Zone Offset:", formattedTimeZoneOffset);

  return formattedTimeZoneOffset;
}

export const convertDateTime = (inputDateTime, userTimeZone) => {
  const inputDate = new Date(inputDateTime + "Z");

  const userTimeZoneOffset = parseTimeZoneOffset(userTimeZone);

  const targetTime = new Date(inputDate.getTime() + userTimeZoneOffset * 60000);

  const targetDateTimeString = targetTime.toISOString().slice(0, 19);

  return targetDateTimeString;
}

const parseTimeZoneOffset = (timeZone) => {
  const sign = timeZone[0] === '-' ? -1 : 1;
  const [hours, minutes] = timeZone.slice(1).split(':').map(Number);
  const offsetInMinutes = sign * (hours * 60 + minutes);
  return offsetInMinutes;
}

export const timeZoneValueFormat = (timeZone) => {
  let timeZoneVal1 = timeZone.slice(1,).split(":")[0];
  let timeZoneVal2 = timeZone.slice(1,).split(":")[1];
  let timeZoneMark = timeZone.slice(0, 1);
  let timeZoneVal1Formatted = timeZoneVal1 < 10 ? 0 + timeZoneVal1 : timeZoneVal1;

  return timeZoneMark + timeZoneVal1Formatted + ":" + timeZoneVal2;
}

export const convertDateTimeToUserTimeZone = (originalDateTimeString, targetTimeZoneOffset) => {
  // Parse the original date and time
  const originalMoment = moment(originalDateTimeString);

  // Convert to the target time zone
  const convertedMoment = originalMoment.tz(targetTimeZoneOffset);

  // Format the result
  const convertedDateTimeString = convertedMoment.format('YYYY-MM-DDTHH:mm:ssZ');
  console.log('convertedDateTimeString :>> ', convertedDateTimeString);

  return convertedDateTimeString;
}