const ranksData = {
  bronze: {
    name: '英勇青铜',
    praise: '哼！一个能打的都没有', 
    shareDesc: '我在英雄联盟音乐排位赛中获得电竞贝多芬称号！你呢？',
  },
  silver: {
    name: '不屈白银', 
    praise: '今天的召唤师峡谷那么安静，只有人头和你', 
    shareDesc: '我在英雄联盟音乐排位赛中获得电竞贝多芬称号！你呢？',
  },
  gold: {
    name: '荣耀黄金', 
    praise: '真抱歉，召唤师，耳机是否忘在了家里', 
    shareDesc: '我在英雄联盟音乐排位赛中获得荣耀黄金称号！你呢？',
  },
  platinum: {
    name: '华贵铂金', 
    praise: '再来一次，最强王者就是你！', 
    shareDesc: '我在英雄联盟音乐排位赛中获得华贵铂金称号！你呢？',
  },
  diamond: {
    name: '璀璨钻石', 
    praise: '优秀不值一提，我必须达到，完美', 
    shareDesc: '我在英雄联盟音乐排位赛中获得璀璨钻石称号！你呢？',
  },
  challenger: {
    name: '超凡大师', 
    praise: '真正的大师永远怀着一颗学徒的心', 
    shareDesc: '我在英雄联盟音乐排位赛中获得超凡大师称号！你呢？',
  },
  king: {
    name: '最强王者', 
    praise: '地表最强，电竞肖邦就是你！', 
    shareDesc: '我在英雄联盟音乐排位赛中获得最强王者称号！你呢？',
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
