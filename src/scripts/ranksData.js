const ranksData = {
  bronze: {
    name: '英勇青铜',
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
      return 'silver';
    case 2:
      return 'gold';
    case 3:
      return 'platinum';
    case 4:
      return 'diamond';
    case 5:
      return 'challenger';
    case 6:
      return 'king';
    default:
      return 'king';
  }
}
