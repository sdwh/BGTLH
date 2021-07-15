function go(){
    var circleNow = [];
    var id = document.location.search.split('id=')[1];
    var loadData = _.find(datas, {'id' :  id});

    ['B', 'G', 'T', 'L', 'H'].forEach(c => {
        [0, 1, 2, 3, 4].forEach(x => {
            $('#' + c + x).text(loadData[c][x]);
        });
    });

    ['B', 'G', 'T', 'L', 'H'].forEach(c => {
        var intersection = _.intersection(announce[c], loadData[c]);
        _.forEach(intersection, function(num){
            var matchPosition = c + loadData[c].indexOf(num);
            $('#' + matchPosition).toggleClass('circle');
            circleNow.push(matchPosition);
        });
    });


    ['cross', 'doubleTen', 'poundSign', 'daySign', 'plum', 'full'].forEach(p => {
        var diff = _.difference(prize[p], circleNow);
        data = loadData;
        if (diff.length != 0){
            $('#analy_' + p).text(_.join(_.map(diff, lookUp), ', '));
        }
        else{
            $('#analy_' + p).text("BINGO 🤑");
        }
    });

    // _.forEach(prize['cross'], function(num){
    //     $('#' + num).toggleClass('circle');
    // });    
}