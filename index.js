/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
var url = "";

inquirer
  .prompt([
    {
        type: "input",
        name: "url",
        message : "Enter the url to be converted into qr code: ",
    }
  ])
  .then((answers) => {
    url = answers.url;
    console.log(url);
    fs.writeFile('URL.txt', url, (err) => {
        if (err) throw err;
    });
    var qr_image = qr.image(url, {type: 'png'});
    qr_image.pipe(fs.createWriteStream('qr_image.png'));
    console.log("QR created with the name qr_image.png");
})
  .catch((error) => {
    if (error.isTtyError) {
      "Incorrect URL"
    } else {
      "Something else went wrong"
    }
  });


