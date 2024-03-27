function readprd(ElemId) {
    var sd = document.getElementById(ElemId).value;
    var strings = sd.match(/([0-9\.e+-]+)/gim, "$1");
    var prddata = new Array();
    if (strings != null && strings.length > 0) {
        var array = [];
        for (var i in strings) {
            var s = strings[i];
            // only if the string contains at least one numerical digit
            if (s.match(/.*[0-9].*/)) {
                array.push(parseFloat(strings[i]));
            }
        }
        var len = array.length;
        for (var i = 0; i < len/4; i += 1) {
            var q = parseFloat(array[i*4])
            var p1 = parseFloat(array[i*4+1]);
            //var ps=parseFloat(array[i+1]);
            prddata.push({
                x: q,
                y: p1
            });
        }
    }
    //alert(prddata[0].x);
    //alert(prddata[0].y)
    return prddata;
}

function plot() {
const myprd = readprd('textArea');
const ctx = document.getElementById('myChart').getContext('2d');
const data = {
    datasets: [{
        label: 'FMAPS(q) Prediction',
        data: myprd,
        backgroundColor: 'rgb(255, 99, 132)'
    }],
};
const config = {
    type: 'scatter',
    data: data,
    options: {
        interaction: {
            mode: 'point'
        },
        scales: {
            x: {
                type: 'logarithmic',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'q'
                }
                }
            }
        }
    }

if (typeof plot.myChart === 'undefined' || plot.myChart === null) {
    // variable is undefined or null
    plot.myChart = new Chart(ctx, config);
}else{
    plot.myChart.destroy();
    plot.myChart = new Chart(ctx, config);
}
/*
let chartStatus = Chart.getChart("myChart"); // <canvas> id
if (chartStatus != undefined) {
  chartStatus.destroy();
}
const myChart = new Chart(ctx, config);
*/
};
