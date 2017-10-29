function createOption(desc, options, answerIndex) {
  return {
    desc,
    options,
    answerIndex,
  };
}

const quizData = [
  createOption('播放上面的音乐，在下方选出其代表的英雄角色名', ['麦冬', '然然', '萌萌', '杰杰'], 0),
  createOption('播放上面的音乐，在下方选出其代表的英雄角色名', ['妈妈咪呀', '然然', '萌萌', '杰杰'], 1),
];

export default quizData;
