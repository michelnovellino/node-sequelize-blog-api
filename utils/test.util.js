const fs = require("fs");

readStream = fs.createReadStream("./public/text/names.txt");
writeStream = fs.createReadStream("./public/text/names2.txt");