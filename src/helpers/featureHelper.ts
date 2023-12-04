export const displayParticipantCount = (participantCount) => {
  if (participantCount > 100) {
    return "100+";
  } else if (participantCount === 100) {
    return participantCount;
  } else if (participantCount > 9 && participantCount < 100) {
    return ("0" + participantCount);
  } else if (participantCount > 0 && participantCount < 10) {
    return ("00" + participantCount);
  } else {
    return "000";
  }
}