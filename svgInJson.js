const fs = require('fs');

const filePath = './nativeEmojis.json';

const svgPath = './svgUsed';

// const copyEmojiFile = (fileName) => {
//   const sourceFile = `${sourcePath}/${fileName}`;
//   const destinationFile = `${destinationPath}/${fileName}`;
//   fs.rename(sourceFile, destinationFile, (error) => {
//     if (error) {
//       console.error(error);
//     } else {
//       console.log('File moved successfully!');
//     }
//   });
// }

const readEmojiFile = (filename) => {
  return fs.readFileSync(filename, 'utf8')
}

const getEmojiFileName = (unified) => {
  return `${svgPath}/u${unified.replaceAll("-fe0f", "").replaceAll("-", "_")}.svg`;
}


fs.readFile(filePath, 'utf8', (error, data) => {
  if (error) {
    console.error(error);
  } else {
    const emojiData = JSON.parse(data);
    const emojis = emojiData.emojis;

    // emojiData.emojis;
    const writeData = Object.values(emojis).map((v) => {
      return {
        ...v,
        skins: v.skins.map((skin) => {
          const fileName = getEmojiFileName(skin.unified);
          return {
            ...skin,
            svg: readEmojiFile(fileName)
          }
        })
      }
    });

    // console.log(writeData)
    fs.writeFileSync('output.json', JSON.stringify(writeData));

  }
});
