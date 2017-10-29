const ranksData = {
  bronze: {
    name: '英勇黄铜',
    praise: '你好，我爱你，谢谢，辛苦了', 
  },
  silver: {
    name: '不屈白银', 
    praise: '你好，我爱你，谢谢，辛苦了', 
  },
  gold: {
    name: '荣耀黄金', 
    praise: '你好，我爱你，谢谢，辛苦了', 
  },
  platinum: {
    name: '华贵铂金', 
    praise: '你好，我爱你，谢谢，辛苦了', 
  },
  diamond: {
    name: '璀璨钻石', 
    praise: '你好，我爱你，谢谢，辛苦了', 
  },
  challenger: {
    name: '超凡大师', 
    praise: '你好，我爱你，谢谢，辛苦了', 
  },
  king: {
    name: '最强王者', 
    praise: '你好，我爱你，谢谢，辛苦了', 
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
