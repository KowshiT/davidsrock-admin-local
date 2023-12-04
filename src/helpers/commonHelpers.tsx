export const displayLikeCount = (likeCount) => {
  switch (likeCount) {
    case 0:
      return "0 Likes";
    case 1:
      return "1 Like";
    default:
      return `${likeCount} Likes`;
  }
}