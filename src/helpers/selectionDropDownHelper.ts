import {
  animalRights,
  facebookIcon,
  foodRight,
  HumanRight,
  laberRightss,
  linkedinIcon,
  politicalCampain,
  twitterIcon,
  websiteIcon,
} from "@/assetsLayer";

/**
 * Selection dropDown functions
 */
export const selectionDropDownGetValue = (value: any) => {
  return value.value;
};

export const selectionDropDownGetLable = (value: any) => {
  return value?.label;
};

export const selectionDropDownPutValues = (value: any) => {
  let options = value?.map((value: any) => ({
    value: value.preference,
    label: value.preference,
  }));
  return options;
};

export const selectionDropDownPutValuesNew = (value: any) => {
  let options = { value: value, label: value };
  return options;
};

export const selectionDropDownTagValues = (value: any) => {
  let options = value?.map((value: any) => value.value);
  return options;
};

/**
 * Selection dropDown options
 */
export const optionsCategory = [
  { value: "SEA", label: "Sea" },
  { value: "AIR", label: "Air" },
];

export const orgCategory = [
  { value: "HUMAN_RIGHTS", label: "Human Rights" },
  { value: "FOOD_RIGHTS", label: "Food Rights" },
  { value: "ANIMAL_RIGHTS", label: "Animal Rights" },
  { value: "POLITICAL_CAMPAIGNS", label: "Political Campaign" },
  { value: "LABOUR_RIGHTS", label: "Labor Rights" },
  { value: "OTHER", label: "Other" },
];

export const companySize = [
  { value: "0-1 Employees", label: "0-1 Employees" },
  { value: "2-10 Employees", label: "2-10 Employees" },
  { value: "11-50 Employees", label: "11-50 Employees" },
  { value: "51-200 Employees", label: "51-200 Employees" },
  { value: "201-500 Employees", label: "201-500 Employees" },
  { value: "501-1000 Employees", label: "501-1000 Employees" },
  { value: "1001-5000 Employees", label: "1001-5000 Employees" },
  { value: "5001-10000 Employees", label: "5001-10000 Employees" },
  { value: "10000+ Employees", label: "10000+ Employees" },
];

export const networkList = [
  { value: "FACEBOOK", label: "Facebook" },
  { value: "LINKEDIN", label: "LinkedIn" },
  { value: "TWITTER", label: "Twitter" },
  { value: "WEBSITE", label: "Website" },
];

export const interestList = [
  { value: "HUMAN_RIGHTS", label: "Human Rights", icon: HumanRight.src },
  { value: "FOOD_RIGHTS", label: "Food Rights", icon: foodRight.src },
  { value: "ANIMAL_RIGHTS", label: "Animal Rights", icon: animalRights.src },
  {
    value: "POLITICAL_CAMPAIGNS",
    label: "Political Campaigns",
    icon: politicalCampain.src,
  },
  { value: "LABOUR_RIGHTS", label: "Labor Rights", icon: laberRightss.src },
];

export const networkListWithIcon = [
  { value: "FACEBOOK", label: "Facebook", icon: facebookIcon.src },
  { value: "LINKEDIN", label: "LinkedIn", icon: linkedinIcon.src },
  { value: "TWITTER", label: "Twitter", icon: twitterIcon.src },
  { value: "WEBSITE", label: "Website", icon: websiteIcon.src },
];

export const eventTypeListWithIcons = [
  { value: "ONLINE", label: "Online" },
  { value: "PHYSICAL", label: "Physical" },
];

export const currencyList = [
  { value: "USD", label: "USD" },
  { value: "EUR", label: "EUR" },
  { value: "LKR", label: "LKR" },
  { value: "JPY", label: "JPY" },
  { value: "GBP", label: "GBP" },
  { value: "AUD", label: "AUD" },
  { value: "CAD", label: "CAD" },
  { value: "CHF", label: "CHF" },
  { value: "CNY", label: "CNY" },
  { value: "NZD", label: "NZD" },
  { value: "HKD", label: "HKD" },
];

export const timeZoneList = [
  { value: "UTC-11:00", label: "(UTC-11:00) Co-ordinated Universal Time" },
  { value: "UTC-10:00", label: "(UTC-10:00) Aleutian Standard Time" },
  { value: "UTC-10:00", label: "(UTC-10:00) Hawaiian Standard Time" },
  { value: "UTC-09:30", label: "(UTC-09:30) Marquesas Standard Time" },
  { value: "UTC-09:00", label: "(UTC-09:00) Alaskan Standard Time" },
  { value: "UTC-08:00", label: "(UTC-08:00) Pacific Standard Time" },
  { value: "UTC-07:00", label: "(UTC-07:00) US Mountain Standard Time - Arizona" },
  { value: "UTC-07:00", label: "(UTC-07:00) Mountain Standard Time - Mexico" },
  { value: "UTC-07:00", label: "(UTC-07:00) Mountain Standard Time - US & Canada" },
  { value: "UTC-07:00", label: "(UTC-07:00) Yukon Standard Time" },
  { value: "UTC-06:00", label: "(UTC-06:00) Central America Standard Time" },
  { value: "UTC-06:00", label: "(UTC-06:00) Central Standard Time - US & Canada" },
  { value: "UTC-06:00", label: "(UTC-06:00) Easter Island Standard Time" },
  { value: "UTC-06:00", label: "(UTC-06:00) Central Standard Time - Mexico" },
  { value: "UTC-06:00", label: "(UTC-06:00) Canada Central Standard Time" },
  { value: "UTC-05:00", label: "(UTC-05:00) SA Pacific Standard Time" },
  { value: "UTC-05:00", label: "(UTC-05:00) Eastern Standard Time - Mexico" },
  { value: "UTC-05:00", label: "(UTC-05:00) Eastern Standard Time - US & Canada" },
  { value: "UTC-05:00", label: "(UTC-05:00) Haiti Standard Time" },
  { value: "UTC-05:00", label: "(UTC-05:00) Cuba Standard Time" },
  { value: "UTC-05:00", label: "(UTC-05:00) US Eastern Standard Time" },
  { value: "UTC-05:00", label: "(UTC-05:00) Turks And Caicos Standard Time" },
  { value: "UTC-04:00", label: "(UTC-04:00) Paraguay Standard Time" },
  { value: "UTC-04:00", label: "(UTC-04:00) Atlantic Standard Time" },
  { value: "UTC-04:00", label: "(UTC-04:00) Venezuela Standard Time" },
  { value: "UTC-04:00", label: "(UTC-04:00) Central Brazilian Standard Time" },
  { value: "UTC-04:00", label: "(UTC-04:00) SA Western Standard Time" },
  { value: "UTC-04:00", label: "(UTC-04:00) Pacific SA Standard Time" },
  { value: "UTC-03:30", label: "(UTC-03:30) Newfoundland Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) Tocantins Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) E. South America Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) SA Eastern Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) Argentina Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) Montevideo Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) Magallanes Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) Saint Pierre Standard Time" },
  { value: "UTC-03:00", label: "(UTC-03:00) Bahia Standard Time" },
  { value: "UTC-02:00", label: "(UTC-02:00) Greenland Standard Time" },
  { value: "UTC-01:00", label: "(UTC-01:00) Azores Standard Time" },
  { value: "UTC-01:00", label: "(UTC-01:00) Cape Verde Standard Time" },
  { value: "UTC+00:00", label: "(UTC+00:00) Coordinated Universal Time" },
  { value: "UTC+00:00", label: "(UTC+00:00) Greenwich Standard Time" },
  { value: "UTC+00:00", label: "(UTC+00:00) Sao Tome Standard Time" },
  { value: "UTC+01:00", label: "(UTC+01:00) Morocco Standard Time" },
  { value: "UTC+01:00", label: "(UTC+01:00) W. Europe Standard Time" },
  { value: "UTC+01:00", label: "(UTC+01:00) Central Europe Standard Time" },
  { value: "UTC+01:00", label: "(UTC+01:00) Romance Standard Time" },
  { value: "UTC+01:00", label: "(UTC+01:00) Central European Standard Time" },
  { value: "UTC+01:00", label: "(UTC+01:00) W. Central Africa Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) GTB Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) Middle East Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) Egypt Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) E. Europe Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) West Bank Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) South Africa Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) FLE Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) Israel Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) South Sudan Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) Kaliningrad Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) Sudan Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) Libya Standard Time" },
  { value: "UTC+02:00", label: "(UTC+02:00) Namibia Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Jordan Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Arabic Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Syria Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Turkey Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Arab Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Belarus Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Russian Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) E. Africa Standard Time" },
  { value: "UTC+03:00", label: "(UTC+03:00) Volgograd Standard Time" },
  { value: "UTC+03:30", label: "(UTC+03:30) Iran Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Arabian Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Astrakhan Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Azerbaijan Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Samara Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Mauritius Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Saratov Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Georgian Standard Time" },
  { value: "UTC+04:00", label: "(UTC+04:00) Caucasus Standard Time" },
  { value: "UTC+04:30", label: "(UTC+04:30) Afghanistan Standard Time" },
  { value: "UTC+05:00", label: "(UTC+05:00) West Asia Standard Time" },
  { value: "UTC+05:00", label: "(UTC+05:00) Ekaterinburg Standard Time" },
  { value: "UTC+05:00", label: "(UTC+05:00) Pakistan Standard Time" },
  { value: "UTC+05:00", label: "(UTC+05:00) Qyzylorda Standard Time" },
  { value: "UTC+05:30", label: "(UTC+05:30) India Standard Time" },
  { value: "UTC+05:30", label: "(UTC+05:30) Sri Lanka Standard Time" },
  { value: "UTC+05:45", label: "(UTC+05:45) Nepal Standard Time" },
  { value: "UTC+06:00", label: "(UTC+06:00) Bangladesh Standard Time" },
  { value: "UTC+06:00", label: "(UTC+06:00) Central Asia Standard Time" },
  { value: "UTC+06:00", label: "(UTC+06:00) Omsk Standard Time" },
  { value: "UTC+06:30", label: "(UTC+06:30) Myanmar Standard Time" },
  { value: "UTC+07:00", label: "(UTC+07:00) SE Asia Standard Time" },
  { value: "UTC+07:00", label: "(UTC+07:00) Altai Standard Time" },
  { value: "UTC+07:00", label: "(UTC+07:00) W. Mongolia Standard Time" },
  { value: "UTC+07:00", label: "(UTC+07:00) North Asia Standard Time" },
  { value: "UTC+07:00", label: "(UTC+07:00) N. Central Asia Standard Time" },
  { value: "UTC+07:00", label: "(UTC+07:00) Tomsk Standard Time" },
  { value: "UTC+08:00", label: "(UTC+08:00) China Standard Time" },
  { value: "UTC+08:00", label: "(UTC+08:00) North Asia East Standard Time" },
  { value: "UTC+08:00", label: "(UTC+08:00) Singapore Standard Time" },
  { value: "UTC+08:00", label: "(UTC+08:00) W. Australia Standard Time" },
  { value: "UTC+08:00", label: "(UTC+08:00) Taipei Standard Time" },
  { value: "UTC+08:00", label: "(UTC+08:00) Ulaanbaatar Standard Time" },
  { value: "UTC+08:45", label: "(UTC+08:45) Aus Central W. Standard Time" },
  { value: "UTC+09:00", label: "(UTC+09:00) Transbaikal Standard Time" },
  { value: "UTC+09:00", label: "(UTC+09:00) Tokyo Standard Time" },
  { value: "UTC+09:00", label: "(UTC+09:00) North Korea Standard Time" },
  { value: "UTC+09:00", label: "(UTC+09:00) Korea Standard Time" },
  { value: "UTC+09:00", label: "(UTC+09:00) Yakutsk Standard Time" },
  { value: "UTC+09:30", label: "(UTC+09:30) Cen. Australia Standard Time" },
  { value: "UTC+09:30", label: "(UTC+09:30) AUS Central Standard Time" },
  { value: "UTC+10:00", label: "(UTC+10:00) E. Australia Standard Time" },
  { value: "UTC+10:00", label: "(UTC+10:00) AUS Eastern Standard Time" },
  { value: "UTC+10:00", label: "(UTC+10:00) West Pacific Standard Time" },
  { value: "UTC+10:00", label: "(UTC+10:00) Tasmania Standard Time" },
  { value: "UTC+10:00", label: "(UTC+10:00) Vladivostok Standard Time" },
  { value: "UTC+10:30", label: "(UTC+10:30) Lord Howe Standard Time" },
  { value: "UTC+11:00", label: "(UTC+11:00) Bougainville Standard Time" },
  { value: "UTC+11:00", label: "(UTC+11:00) Russia Time Zone 10 - Chokurdakh" },
  { value: "UTC+11:00", label: "(UTC+11:00) Magadan Standard Time" },
  { value: "UTC+11:00", label: "(UTC+11:00) Norfolk Standard Time" },
  { value: "UTC+11:00", label: "(UTC+11:00) Sakhalin Standard Time" },
  { value: "UTC+11:00", label: "(UTC+11:00) Central Pacific Standard Time" },
  { value: "UTC+12:00", label: "(UTC+12:00) Anadyr Standard Time" },
  { value: "UTC+12:00", label: "(UTC+12:00) New Zealand Standard Time" },
  { value: "UTC+12:00", label: "(UTC+12:00) Fiji Standard Time" },
  { value: "UTC+12:45", label: "(UTC+12:45) Chatham Islands Standard Time" },
  { value: "UTC+13:00", label: "(UTC+13:00) Tonga Standard Time" },
  { value: "UTC+13:00", label: "(UTC+13:00) Samoa Standard Time" },
  { value: "UTC+14:00", label: "(UTC+14:00) Line Islands Standard Time" },
];
