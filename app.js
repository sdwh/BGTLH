function go(latestNum, historyBag){
    $('#leatestNumber').text(latestNum);


    var source = document.getElementById( "table-template" ).innerHTML;
    var template = Handlebars.compile(source);

    datas = _.orderBy(datas, 'id', 'asc')

    datas.forEach(card => {
        var loadData = _.find(datas, {'id' :  card.id});

        var circleNow = [];
        ['B', 'G', 'T', 'L', 'H'].forEach(c => {
            var intersection = _.intersection(announce[c], loadData[c]);
            _.forEach(intersection, function(num){
                var matchPosition = c + loadData[c].indexOf(num);
                $('#' + matchPosition).toggleClass('circle');
                circleNow.push(matchPosition);
            });
        });

        var prevStep = [];
        ['B', 'G', 'T', 'L', 'H'].forEach(c => {
            var intersection = _.intersection(prevAnnounce[c], loadData[c]);
            _.forEach(intersection, function(num){
                var matchPosition = c + loadData[c].indexOf(num);
                $('#' + matchPosition).toggleClass('circle');
                prevStep.push(matchPosition);
            });
        });

        ['cross', 'doubleTen', 'poundSign', 'daySign', 'plum', 'full'].forEach(p => {
            var diff = _.difference(prize[p], circleNow);
            var prevDiff = _.difference(prize[p], prevStep)
            if (diff.length == 0)
            {
                card[p] = '賓果';

                if (prevDiff.length - diff.length == 1) {
                    $('#doitnow').append("卡號:" + card.id + " 賓果 " + lookUpPrize(p) + '<br/>');
                    $('#doitnow').addClass('bingoIt');
                }
                // else{
                //     console.log(prevDiff.length, diff.length)
                // }
            }
            else
            {
                card[p] = diff.length;
            }
        });

        var html = template(card);
        $("#tbody-append").append(html);

    }); // end of ForEach

    $('#historyNum').html(historyBag.history);
    $('#numCount').text(historyBag.count);

}
