"use strict"

const ChooseWinPraise = () => {
  const num = Math.floor(Math.random() * 6);

  switch (num) {
    case 0:
    return 'How simply spiffing.';
    case 1:
    return 'How splendid of you.';
    case 2:
    return 'What talent! I do declare.';
    case 3:
    return 'A triumphant victory. I am so proud. Indeed.';
    case 4:
    return 'Good show, old chap.';
    case 5:
    return 'Such flawless skill. What a gift.';
  };
};

export default ChooseWinPraise;