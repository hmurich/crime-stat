var data_line = [];
var line_chart = false;
var line_chart_buld = false;

function updateLineCHart(line_data, type){
    data_line = [];

    var total_line_count = 0;
    // заполнение данных диаграммы
    $.each(line_data, function( index, value ) {
        var year = index;
        year = parseInt(year.substr(0, 4));
        var m = index;
        m = parseInt(m.substr(4, 2));
        var d = index;
        d = parseInt(d.substr(6, 2));
        value = parseInt(value);

        total_line_count = total_line_count + value;

        data_line.push({x:Date.UTC(year, m, d), y:value, id:index});
    });

    console.log('total_line_count ', total_line_count);


    var data_lenth = data_line.length; // получаем общее кол-во елемнтов
    var data_lenth_set = parseInt(data_lenth * 0.10); // получаем  кол-во елемнтов для первого вывода
    if (data_lenth_set == 0)
        data_lenth_set = data_lenth;

    // высчитываем элементы для первого вывода
    var data_set = [];
    var data_set_i = 1;
    $.each(data_line, function( index, value ) {
        if (data_set_i > data_lenth_set)
            return true;
        data_set.push(value);
        data_set_i++;
    });

    var line_color = 'rgb(128, 133, 233)';
    if (current_skin == 'skin-black')
         line_color = 'rgb(0, 255, 45)';

    var config_line = {
        chart: {
            type: 'spline',
            backgroundColor:'rgba(255, 255, 255, 0.0)',
            animation: Highcharts.svg,
            events: {
                load: function () {
                    var series = this.series[0];

                    var timerId = setTimeout(function tick() {
                        data_lenth_set++;

                        if (data_lenth_set < data_lenth && data_line[data_lenth_set] != undefined){
                            var el = data_line[data_lenth_set];
                            series.addPoint(el, true, true);

                            timerId = setTimeout(tick, 2000);
                        }
                    }, 2000);
                }
            }
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            /*
            dateTimeLabelFormats: function() {
                return  '<b>Данные показателя за день</b><br/>' +
                    Highcharts.dateFormat('%Y:%m:%d', new Date(this.x)) + ' - ' + this.y + ' дел';
            }*/
            title: {
                text: 'Данные показателя по дням'
            },
            tickPixelInterval: 150
        },
        yAxis: {
            title: {
                text: 'Кол-во '
            },
            min: 0
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        tooltip: {
            formatter: function() {
                return  '<b>Данные показателя за день</b><br/>' +
                    Highcharts.dateFormat('%d.%m.%Y', new Date(this.x)) + ' - ' + this.y + ' дел';
            }
        },

        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },

        series: [{
            name: 'Данные показателя по дням',
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
            data: data_set,
            color: line_color,
            point: {
                events: {
                    click: function () {
                        console.log('id: ' + this.id + ', value: ' + this.y);
                        showHiddenStatBlock(this.id, 'line', 'all');
                    }
                }
            }
        }]
    };

    line_chart = new Highcharts.Chart('chart-line_1', config_line);
}
