const { log } = require("console");
const fs=require("fs");

//if file exist no issue otherwise create a new file
fs.writeFileSync('a.txt','hello this is akriti');

// for adding text
fs.appendFileSync('a.txt','😍');

//read data
const data= fs.readFileSync('a.txt')
console.log(data);

//encoding data so that we get it in string form
const data2= fs.readFileSync('a.txt','utf8')
console.log(data2);


// read in string form
const act_data=data.toString()
console.log(act_data);

// rename file
fs.renameSync('a.txt','b.txt')

// to delete file
// fs.unlinkSync('b.txt');

// to delete folder
// fs.rmdirSync('folder name')
