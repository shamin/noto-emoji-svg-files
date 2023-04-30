const fs = require('fs');

const filePath = './nativeEmojis.json';


// const sourcePath = '/Users/shamin/personal/noto-emoji/third_party/region-flags/waved-svg';
// const sourcePath = '/Users/shamin/personal/noto-emoji/svg';
const destinationPath = './svgs';

const copyEmojiFile = (fileName) => {
  const sourceFile = `${sourcePath}/emoji_${fileName}`;
  console.log(sourceFile)
  const destinationFile = `${destinationPath}/${fileName}`;
  fs.rename(sourceFile, destinationFile, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('File moved successfully!');
    }
  });
}

const getEmojiFileName = (unified) => {
  return `u${unified.replaceAll("-fe0f", "").replaceAll("-", "_")}.svg`;
}


fs.readFile(filePath, 'utf8', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    const emojiData = JSON.parse(data);
    Object.values(emojiData.emojis).forEach((v) => {
      v.skins.map(({ unified }) => {
        const fileName = getEmojiFileName(unified);
        copyEmojiFile(fileName)
      })
    });
  }
});
