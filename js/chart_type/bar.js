
var height_window = $(window).height();
var height_header = $('.main-header').height();
var height_workplace = height_window - height_header;
var height_workplace_paddin_top = 15;
var height_box_margin_bottom = 20 ;
var height_box_header = 51 ;
var height_box_body = $('.svg_map_conteiner').height() - 230;
console.log(height_box_body)
var bar_data_conteiner = false;


function updateAllBar(){
    obl_id = 0;
    if (OBL_ID)
        obl_id = OBL_ID;

    $.post( "/ajax/report/map/all-inidicator", {obl_id:OBL_ID}).done(function( data ){
        if (data.success){
            bar_data_conteiner = data;
            console.log( "ajax/report/all-rep Data:", data);

            //addForRange(data.data[0], 1000, 'Сравнительная диаграмма снятых показателей', 'Снятые по отчету', 'Снятые по Заңдылық');
            //addForRange(data.data[100], 100, 'Оправдано', 'По отчету', 'По Заңдылық');
            //addForRange(data.data[200], 200, 'Прекращено (по реабилитирующим)', 'Снятые по отчету', 'Снятые по Заңдылық');


			$('.js_click_indic_block').each(function(){
                var id = $(this).data('id');
                var data_set_count= [];
                var cats_name = [];
                var el = $(this);

                el.find('.cart-item-slider').html('');
                $.each(bar_data_conteiner.data[id], function( region_id, region_count ) {
                    var region_name = AR_OBL[region_id];
                    if (region_name == undefined)
                        region_name = AR_REGION[region_id];

                    if (region_name != undefined){
                        var html_slide = '<div class="cart-item-slider-item">'+region_name+' : '+region_count+'</div>';
                        el.find('.cart-item-slider').append(html_slide);
                    }

                });

                if (typeof bar_data_conteiner.ar_indicators[id] !== 'undefined') {
                    $(this).find('.cart-item__title').html(data.ar_indicators[id]);
                    $(this).find('.cart-item__small').html(data.data_sum[id]);
                    //$(this).find('.cart-item-slider ').html(cats_name);
                }
                else if (id == 0) {
                    $(this).find('.cart-item__title').html('Исключенные эпизоды по отчету / Заңдылық');
                    $(this).find('.cart-item__small').html(data.data_sum[4] + data.data_sum[5] + data.data_sum[6] + data.data_sum[7]);
                    $.each(bar_data_conteiner.data[0][1], function( region_id, region_count,region_count_2 ) {
                        var region_name = AR_OBL[region_id];
                        if (region_name == undefined)
                            region_name = AR_REGION[region_id];

                        if (region_name != undefined){
                            var count_val_1 = data.data[0][1][region_id];
                            var count_val_2 = data.data[0][2][region_id];
                            if (count_val_1 == undefined)
                                count_val_1 = 0;
                            if (count_val_2 == undefined)
                                count_val_2 = 0;

                             var html_slide = '<div class="cart-item-slider-item">'+region_name+' : '+ count_val_1 +' / '+count_val_2+'</div>';

                            el.find('.cart-item-slider ').append(html_slide);
                        }
                    });
                }
                else if (id == 100) {
                    $(this).find('.cart-item__title').html('Оправдано по отчету / Заңдылық  ');
                    $(this).find('.cart-item__small').html(data.data_sum[2] + data.data_sum[4]);

                    $.each(bar_data_conteiner.data[100][1], function( region_id, region_count) {
                        var region_name = AR_OBL[region_id];
                        if (region_name == undefined)
                            region_name = AR_REGION[region_id];

                        if (region_name != undefined){
                            var count_val_1 = data.data[100][1][region_id];
                            var count_val_2 = data.data[100][2][region_id];
                            if (count_val_1 == undefined)
                                count_val_1 = 0;
                            if (count_val_2 == undefined)
                                count_val_2 = 0;

                            var html_slide = '<div class="cart-item-slider-item">'+region_name+' : '+ count_val_1 +' / '+count_val_2+'</div>';


                            el.find('.cart-item-slider ').append(html_slide);
                        }

                    });

                }
                else if (id == 200) {
                    $(this).find('.cart-item__title').html('Прекращено по отчету / Заңдылық');
                    $(this).find('.cart-item__small').html(data.data_sum[3] + data.data_sum[5]);
                    $.each(bar_data_conteiner.data[200][1], function( region_id, region_count) {
                        var region_name = AR_OBL[region_id];
                        if (region_name == undefined)
                            region_name = AR_REGION[region_id];

                        if (region_name != undefined){

                            var count_val_1 = data.data[200][1][region_id];
                            var count_val_2 = data.data[200][2][region_id];
                            if (count_val_1 == undefined)
                                count_val_1 = 0;
                            if (count_val_2 == undefined)
                                count_val_2 = 0;

                            var html_slide = '<div class="cart-item-slider-item">'+region_name+' : '+ count_val_1 +' / '+count_val_2+'</div>';

                            el.find('.cart-item-slider').append(html_slide);
                        }
                    });

                }
                // var test = el.(children).html();
                // if(test = 'undefined'){
                //     test.html(0);
                // }


            });

            $('.cart-item-slider').slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows:false,
                autoplay:true,
            });


             addForRange(bar_data_conteiner.data[0], 1000, 'Сравнительная диаграмма исключенных  эпизодов', 'Снятые по отчету', 'Снятые по Заңдылық');
        }
        else
            console.error( "Data Loaded:", data.mess);

    });
}

$(document).ready(function() {

    $('.js_click_indic_block').click(function (){
        var id = $(this).data('id');


        if (typeof bar_data_conteiner.ar_indicators[id] !== 'undefined') {
            updateBarChart(bar_data_conteiner.data[id], id, bar_data_conteiner.ar_indicators[id]);
        }
        else if (id == 0) {
            addForRange(bar_data_conteiner.data[0], 1000, 'Сравнительная диаграмма снятых показателей', 'Снятые по отчету', 'Снятые по Заңдылық');
        }
        else if (id == 100) {
            addForRange(bar_data_conteiner.data[100], 100, 'Оправдано', 'По отчету', 'По Заңдылық');
        }
        else if (id == 200) {
            addForRange(bar_data_conteiner.data[200], 200, 'Прекращено (по реабилитирующим)', 'Снятые по отчету', 'Снятые по Заңдылық');
        }




    });

});


function addForRange(data, indic_id, indic_name, data_set_name_1, data_set_name_2){
    //console.log(data); return false;

    var cats_name = [];
    var data_set_1 = [];
    var data_set_2 = [];

    $.each(data[1], function( region_id, region_count ) {
        var region_name = AR_OBL[region_id];
        if (region_name == undefined)
            region_name = AR_REGION[region_id];
        if (region_name == undefined)
            region_name = AR_ORGANIZATION[region_id];

        if (region_name != undefined){
            cats_name.push(region_name);

            data_set_1.push({
                name: data_set_name_1,
                y: region_count,
                id: region_id
            });

            data_set_2.push({
                name: data_set_name_2,
                y: data[2][region_id],
                id: region_id
            });
        }

    });

    //console.log(data_set_1, data_set_2); return false;

    var hichar_config_2 = {
        colors: ['#051f52', '#d10000'],
        chart: {

            type: 'column',
            height: 500,
        },
        title: {
            text: indic_name
        },
        xAxis: {
            categories: cats_name,
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
            }
        },
         plotOptions: {
            series: {
                animation: {
                    duration: 2000,
                }

            }
        },
        exporting: {
            enabled: false
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px"></span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0; color:#000"><b>{point.y} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        series: [{
            name: data_set_name_1,
            data: data_set_1,
            point: {
                events: {
                    click: function () {
                        console.log('id: ' + this.id + ', value: ' + this.y);
                        showHiddenStatBlock(this.id, indic_id);
                    }
                }
            }
        },{
            name: data_set_name_2,
            data: data_set_2,
            point: {
                events: {
                    click: function () {
                        console.log('id: ' + this.id + ', value: ' + this.y);
                        showHiddenStatBlock(this.id, indic_id);
                    }
                }
            }
        }],
        legend: {
            enabled: true
        },
        plotOptions: {
            series: {
            borderWidth: 0,
            dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
    };

    //console.log('hichar_config_2 ', hichar_config_2);

    new Highcharts.Chart('chart-bar_1', hichar_config_2);
    console.log(height_box_body);
}


function updateBarChart(data, indicator_id, indicator_name){
    //console.log(data, indicator_id, indicator_name); return false;

    var cats_name = [];
    var data_set = [];

    $.each(data, function( region_id, region_count ) {
        var region_name = AR_OBL[region_id];
        if (region_name == undefined)
            region_name = AR_REGION[region_id];



        if (region_name != undefined){
            cats_name.push(region_name);

            data_set.push({
                name: indicator_name,
                y: region_count,
                id: region_id
            });
        }

    });

    var hichar_config_2 = {
        chart: {
            type: 'column',
            height:500,
            className: 'class'+indicator_id,
        },
        title: {
            text: indicator_name
        },
        xAxis: {
            categories: cats_name,
            crosshair: true,
        },
        yAxis: {
            min: 0,
            title: {
                text: ' '
            }
        },

        exporting: {
            enabled: false
        },

        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0; color:#000"><b>{point.y} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },

        series: [{
            name: indicator_name,
            data: data_set,

            point: {
                events: {
                    click: function () {
                        console.log('id: ' + this.id + ', value: ' + this.y);
                        showHiddenStatBlock(this.id, indicator_id);
                    }
                }
            }
        }],

        legend: {
            enabled: true
        },
        plotOptions: {
            series: {
            borderWidth: 0,
            dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },
    };

    //console.log('hichar_config_2 ', hichar_config_2);

   new Highcharts.Chart('chart-bar_1', hichar_config_2);
}
