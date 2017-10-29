const ranksData = {
  bronze: {

  },
  silver: {

  },
  gold: {

  },
  platinum: {

  },
  diamond: {

  },
  challenger: {

  },
  king: {

  },
};

export default ranksData;

export function getRankName(score) {
  switch (Math.ceil(score / 10)) {
    case 0:
      return 'bronze';
    case 1:
    case 2:
      return 'silver';
    case 3:
    case 4:
      return 'gold';
    case 5:
    case 6:
      return 'platinum';
    case 7:
    case 8:
      return 'diamond';
    case 9:
      return 'challenger';
    case 10:
      return 'king';
    default:
      return 'bronze';
  }
}
