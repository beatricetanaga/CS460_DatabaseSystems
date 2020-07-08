'use strict';
const fs = require('fs');
const Papa = require('papaparse');

function loopThroughData(json) {
    //one row
    for(let i=0; i < json.length; ++i) {
        let newJson = {"business_id":json[i]["business_id"], "Sunday": 0, "Monday": 0, "Tuesday": 0, "Wednesday": 0, "Thursday": 0, "Friday": 0, "Saturday": 0}
        const days = Object.keys(json[i]);
        //remove business_id
        days.shift();
        for(let x=0; x < days.length; ++x) {
          newJson[days[x].split('_')[0]] += parseInt(json[i][days[x]]);
        }

        json[i] = newJson;
    }

    const newCsv = Papa.unparse(json);
    fs.writeFileSync('./newCheckins.csv', newCsv);
}

function parseCSV(file) {
    Papa.parse(file, {
        delimiter: ';',
        header: true,
        complete: function(results) {
            console.log("Finished Parsing CSV, getting data");
            loopThroughData(results.data);
        }
    });
}

let csv = fs.readFileSync('./Checkins.csv','utf8');
parseCSV(csv);