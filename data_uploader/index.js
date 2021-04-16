const papa = require('papaparse')
const fs = require('fs')
const process = require('process')

const directory = '/home/dexter/Desktop/stocking_data'

// fs.readdir(directory, (err, files) => {
//     if (err) {
//         console.log('something broke with the directory')
//     }

//     files.forEach((file) => {
//         // read in from papa parse
//         console.log(file)
        
//         // upload to mongo

//     })
// 
const files = fs.readdirSync(directory)

files.forEach((file) => {
            // read in from papa parse
            const fileContents = fs.readFileSync(`${directory}/${file}`)
            const fileJson = papa.parse(fileContents)
    
            // upload to mongo

        })