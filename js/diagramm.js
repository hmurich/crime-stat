class Diagramm {
    constructor(selector){
        this.selector = selector;

        this.conf = {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Регионы в цифрах'
            },
            xAxis: {
                categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Population (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Year 1800',
                data: [107, 31, 635, 203, 2]
            }]
        };
    }
    init(){
        this.data = MAIN_DATA.data;
        this.obl_id = MAP.obl_id;

        this.diagramm_cat = [];
        this.diagramm_value = [{
            data: []
        }];

        this.parseData();
        this.show();
    }
    parseData(){
        let data = [];

        for (let region_id in this.data){
            let value = this.data[region_id];

            if (this.obl_id == 0){
                if (region_id.length != 4)
                    continue;

                data.push([DICT['area'+region_id], value]);
            }
            else {

                if (region_id.indexOf(this.obl_id.toString()) < 0)
                    continue;

                if (DICT['reg'+region_id] != undefined)
                    data.push([DICT['reg'+region_id], value]);
            }
        }

        data.sort(function(a, b) {
            return b[1] - a[1];
        });

        for (let key in data){
            let region = data[key][0];
            let value = data[key][1];

            this.diagramm_cat.push(region);
            this.diagramm_value[0]['data'].push(value);
        }

    }
    show(){
        this.conf['xAxis']['categories'] = this.diagramm_cat;
        this.conf['series'] = this.diagramm_value;


        Highcharts.chart(this.selector, this.conf);
    }
}

DIAGRAMM = new Diagramm('chart-bar_1');
