var announce = {
    'B' : [],
    'G' : [],
    'T' : [],
    'L' : [],
    'H' : []
}

var prevAnnounce = {
    'B' : [],
    'G' : [],
    'T' : [],
    'L' : [],
    'H' : []
}

// var googleDocumnetHref = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQaK6DLuGhAvDZSDbExmSZYoTvz7EZH4vAYlW3B0mS7x90zR9B3nakEBFUFKFfWm9RvAiAnmiOSftt6/pub?gid=994107281&single=true&output=csv';
// $.get(googleDocumnetHref).done(
//     function(e){ 
//         _.slice(e.split('\n'), 1).forEach(line => {
//             //datas[]
//             var ball = _.map(_.takeRight(line.split(','), 2), chiToChatr);
//             announce[ball[0]].push(parseInt(ball[1]));
//         });
//     }
// );

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1JhNG706Cx1Am4l4lpnIKWCpl17_ZxlgiW_FnUMAsYW4/edit?usp=sharing';

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: handleData,
                   simpleSheet: true } )
}

function handleData(data, tabletop) {
    _.slice(data, 1).forEach(line => {
        announce[chiToChatr(line.col)].push(parseInt(line.num));
    });

    _.slice(data, 1, data.length - 1).forEach(line => {
        prevAnnounce[chiToChatr(line.col)].push(parseInt(line.num));
    });

    var latestNum = _.last(data).col + ' ' + _.last(data).num + ' 號';
    var history = '<ol reversed>' + _.join(_.map(_.reverse(data), x =>  '<li>' + x.col + ' ' + x.num + ' 號</li>'), '') + '</ol>';
    var historyBag = {
        'history' : history,
        'count' : data.length
    }
    go(latestNum, historyBag);
}

window.addEventListener('DOMContentLoaded', init)
