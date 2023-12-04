export const stringCrop = (str: string | null, charCount: number) => {
  if (str !== null) {
    if (str.length > charCount) {
      return str.substring(0, charCount) + "...";
    } else {
      return str;
    }
  } else {
    return null;
  }
};

export const toCamelCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

export const getIdFromUrl = (currentUrl: string) => {
  const regex = /-(\d+)$/;
  const matches = currentUrl.match(regex);

  let numberAfterHyphen = null;
  if (matches && matches.length > 1) {
    numberAfterHyphen = parseInt(matches[1]);
  }
  return numberAfterHyphen;
};

export const capitalizedFormat = (value: string) => {
  // Split the input text by underscores and join with spaces
  const textWithSpace = value.replace(/_/g, " ");

  // Split the text by spaces to get individual words
  const words = textWithSpace.split(" ");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      // Capitalize the first letter and make the rest of the word lowercase
      return word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();
    } else {
      return "";
    }
  });

  // Join the capitalized words back into a string
  const formattedText = capitalizedWords.join(" ");

  return formattedText;
};

export const toEllipsis = (inputString: string, count: number) => {
  if (inputString.length > count) {
    return inputString.slice(0, count) + "...";
  } else {
    return inputString;
  }
};

export const formatInterests = (interests: any) => {
  const list = interests
    ?.map((interestEntity: any) => capitalizedFormat(interestEntity.interest))
    .join(", ");

  return list;
};

export const formatNetworks = (networks: any) => {
  const list = networks.map((networkEntity: any) => ({
    type: networkEntity.networkType,
    link: networkEntity.link,
  }));

  return list;
};

export const formatDate = (selectedDateObject: any) => {
  const hasDateProperty = selectedDateObject && selectedDateObject.$d;

  if (hasDateProperty) {
    const selectedDate = selectedDateObject.$d;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // Adding 1 because months are 0-based (January is 0)
    const day = selectedDate.getDate();

    // Create the formatted date string
    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate; // Ensure that it returns a string}
  }
  return selectedDateObject;
};
