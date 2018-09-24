"use strict"

const ChooseWinThanks = () => {
  const num = Math.floor(Math.random() * 6);

  switch (num) {
    case 0:
    return 'Why, thank you ever so much.';
    case 1:
    return 'That is frightfully decent of you.';
    case 2:
    return 'I am obliged to you for your kindness.';
    case 3:
    return 'My heart overflows at your kind words.';
    case 4:
    return 'I am truly humbled at such praise.';
    case 5:
    return 'Well said. Indeed.';
  };
};

export default ChooseWinThanks;