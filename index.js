const fs = require('fs');

const filePath = './nativeEmojis.json';


const sourcePath = './svg';
const destinationPath = './svgUsed';

const copyEmojiFile = (fileName) => {
  const sourceFile = `${sourcePath}/${fileName}`;
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
