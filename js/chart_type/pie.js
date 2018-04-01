Highcharts.setOptions({
    colors: ['#D10000', '#800049', '#FF47E9', '#75D1EB', '#9E00FF', '#FF7E4D', '#945CFF', '#5C98FF', '#5CCFFF',  '#A4D100', '#5CFFBC', '#5CFF92', '#5CFF63', '#40D100',  '#800049',
            '#6BD100', '#FF47E9', '#9E00FF', '#5CFFE6', '#D1BD00', '#FFBB4D',   '#695CFF', '#FF594D']
});
//console.log(pieColors);
// обновить круговую диаграмму
var pie_index_name = false;
var pie_total_count = 0;
var pie_chart = false;
function updatePieChart(pie_data, type){
    var data_set = [];
    pie_total_count = 0;
    $.each(pie_data, function( index, value ) {
        value = parseInt(value);
        index = parseInt(index);
        if (CURRENT_TYPE == 'all')
            pie_index_name = AR_OBL[index];
        else if (CURRENT_TYPE == 'obl'){
            pie_index_name = AR_REGION[index];


        }


        if (pie_index_name == undefined){
            var str_index = index.toString().slice(-2);

            if (str_index == '00')
                pie_index_name = 'Центральный аппарат';
            else if (str_index == '88')
                pie_index_name = 'Спецпрокурора';
            else
                pie_index_name = index;
        }


        pie_total_count = pie_total_count + value;
        data_set.push({
            name: pie_index_name,
            y: value,
            id: index
        });
    });

    console.log('pie_total_count ', pie_total_count);

    $('.js_pie_count_block').html(pie_total_count);

    var  hichar_config = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y} ({point.percentage:.1f}%)</b>'
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            name: 'Кол-во',
            colorByPoint: true,
            data: data_set,
            point: {
                events: {
                    click: function () {
                        console.log('id: ' + this.id + ', value: ' + this.y);
                        showHiddenStatBlock(this.id, 'pie', 'all');
                    }
                }
            }
        }]
    }

    pie_chart = new Highcharts.Chart('chart-pie_1', hichar_config);

}
