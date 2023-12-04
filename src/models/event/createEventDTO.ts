export default class createEventDTO {
  eventName: string;
  eventType: string;
  startDate: string;
  endDate: string;
  location: string;
  link: string;
  description: string;
  coverPhoto: string;
  isRepeat: boolean;
  isQuestion: boolean;
  isAttendeeLimit: boolean;
  attendeeLimit: any;
  isAllowGuest: boolean;
  isEventFee: boolean;
  eventFee: any;
  profileOrPartnershipId: any;
  profileType: string;

  constructor(
    eventName: string,
    eventType: string,
    startDate: string,
    endDate: string,
    location: string,
    link: string,
    description: string,
    coverPhoto: string,
    isRepeat: boolean,
    isQuestion: boolean,
    isAttendeeLimit: boolean,
    attendeeLimit: any,
    isAllowGuest: boolean,
    isEventFee: boolean,
    eventFee: any,
    profileOrPartnershipId: any,
    profileType: string,

  ) {
    this.eventName = eventName;
    this.eventType = eventType;
    this.startDate = startDate;
    this.endDate = endDate;
    this.location = location;
    this.link = link;
    this.description = description;
    this.coverPhoto = coverPhoto;
    this.isRepeat = isRepeat;
    this.isQuestion = isQuestion;
    this.isAttendeeLimit = isAttendeeLimit;
    this.attendeeLimit = attendeeLimit;
    this.isAllowGuest = isAllowGuest;
    this.isEventFee = isEventFee;
    this.eventFee = eventFee;
    this.profileOrPartnershipId = profileOrPartnershipId;
    this.profileType = profileType;
  }
}