
$( document ).ready(function() {


    $(".search-side-bar").keyup(function(){
    _this = this;
    
    $.each($(".statistik-list li label"), function() {
        if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        } else {
            $(this).show();                
        };
    });

  $(".modal-send-button").click(function(){

  	var x = $('#coordinateValX').val();
	var y = $('#coordinateValY').val();

	var typeCam = $('.select-type-cam option:selected').val();
	var addressCam = $('.addres-cam').val();
	var descriptionCam =  $('.des-cam').val();
	var EMAIL = $('.email_cam').val();
	var fioCam = $('.fio-cam').val();
	var subarea = $('.select-ray-cam option:selected').val();
    console.log(typeCam)

	var obj = {
		geometry: {
			"x": x, 
			"y": y,
		},
		attributes:{
			"TYPE": typeCam,
			"ADERESS":addressCam,
			"DESCRIPTION": descriptionCam,
			"CHECKED": 0,
			"EMAIL": EMAIL,
			"FIO": fioCam,
			"SUBAREA":subarea,
		}
	
	};

	var features =[];
	features.push(obj)
	console.log(features);
	jsonString = JSON.stringify(features);
	console.log(jsonString);
 
  	 $.ajax({
                type: "POST",
                url: "http://infopublic.pravstat.kz:8399/arcgis/rest/services/Help_objects2/FeatureServer/1/addFeatures",
                //dataType: 'JSON',
                data:  {
                	'features' : jsonString,//'[{"geometry":{"x":-113,"y":30.80}, "attributes":{"TYPE":1,"ADERESS":"-- любой переданный адрес -- 45 ","DESCRIPTION":"добавлено из скрипта php","CHECKED":0}}]',
                	'f': 'html'
                },
               
                
                
                success: function(data, code){
                	//console.log(data,code);
                	console.log($('#modal2').attr('id'));
                	$('.modal2').css('display','none');
                	$('.overlay').css('display','none');
                	location.reload();

                },
                
                error:  function(xhr, str){
                     console.log(xhr,str);
                },
                
                complete:  function(){ //а тут ничего из предложенных параметров не берем :)
                    console.log("complete");
                }
            
            });


	});
  

});

(function($) {
$(function() {

    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function eraseCookie(name) {
        createCookie(name,"",-1);
    }

    $('ul.tabs-head').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs-body__item').removeClass('active').eq($(this).index()).addClass('active');
        var ulIndex = $('ul.tabs-head').index($(this).parents('ul.tabs-head'));
        eraseCookie('tabCookie' + ulIndex);
        createCookie('tabCookie' + ulIndex, $(this).index(), 365);
    });
    $('ul.tabs-head').on('click', 'li:not(.active)', function() {
        $(this)
            .addClass('active').siblings().removeClass('active')
            .closest('div.tabs').find('div.tabs-body__item').removeClass('active').eq($(this).index()).addClass('active');
        var ulIndex = $('ul.tabs-head').index($(this).parents('ul.tabs-head'));
        eraseCookie('tabCookie' + ulIndex);
        createCookie('tabCookie' + ulIndex, $(this).index(), 365);
    });

    

    

    

});
})(jQuery);

$(document).ready(function() {
   $('.datepicker').datepicker({
    dateFormat : "yy-mm-dd",
    minDate: new Date($('#hiddendelivdate').val()),
    monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
});
$(".test_search").click(function(){
        console.log('test');
                $.ajax({
                        type: "GET",
                        url:"http://infopublic.pravstat.kz:8399/arcgis/rest/services/stat/MapServer/1/query?where=CRIME_CODE+%3D%270990%27+AND+DATE_REP+%3D+DATE+%272018-03-29%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=CRIME_CODE%2CREG_CODE%2CK10%2CK%2CCODE&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson",
                        //url:"http://infopublic.pravstat.kz:8399/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102100&geometries=%5B"+result2+"%2C"+ result1+"%5D&transformation=&transformForward=true&f=pjson",
                        crossDomain: true,
                        dataType: 'json',
                        success: function(data, code){
                            console.log(data);
                            /*
                            //alert(data,code);
                            
                            //console.log(data.geometries[0].x);
                            $('.result3').data( "foo",data.geometries[0].x);
                            $('.result4').data( "foo",data.geometries[0].y);
                            var test2 = $('.result3').data('foo');
                            var test3 = $('.result4').data('foo');
                            console.log(test2);
                            console.log(test3);
                            */
                            
                        },
                        
                        error:  function(xhr, str){
                             console.log(xhr,str);
                        },
                        complete:  function(){ //а тут ничего из предложенных параметров не берем :)
                            console.log("complete");
                        }
                    
                    });


    });


    if ($(".js_find_address").length > 0){
        $( ".js_find_address" ).autocomplete({

            source: function( request, response ) {
                

                $.ajax({
                    type: "POST",
                    url: "http://192.168.177.233:6520/api/v1/geocoder",
                 	data:{
                 		name:'Казахстан,' + request.term,
                 	},
       
                 	crossDomain: true,
                 	dataType:'json',
                 	crossDomain: true,

                     success: function (data) {
                        console.log(data);
                       

                        response (data);
                    },
                    error: function (jqXHR, exception,data) {
                    	console.log(jqXHR);
                    	console.log(exception);

                    }
                    
                });
                
            },
            select: function(event, ui) {
                event.preventDefault();
                $(this).val(ui.item.label);
                var coords = ui.item.value;
                result= coords.split(' ');
                //console.log(result);
               // console.log(result[0], result[1]);
                var test = result[0];
                $('.result1').val(result[0]);
                $('.result2').val(result[1]);
                var yandexCoordinateX = $('.result1').val();
                var yandexCoordinateY = $('.result2').val();
               // console.log(yandexCoordinateX);
                //console.log(yandexCoordinateY);

          //       var result1 = $('.result1').val();
        		// var result2 = $('.result2').val()

		 		$.ajax({
		                type: "GET",
		                url:"http://infopublic.pravstat.kz:8399/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102100+&geometries="+yandexCoordinateY+"%2C"+ yandexCoordinateX+"&transformation=&transformForward=true&f=pjson",
		                //url:"http://infopublic.pravstat.kz:8399/arcgis/rest/services/Utilities/Geometry/GeometryServer/project?inSR=4326&outSR=102100&geometries=%5B"+result2+"%2C"+ result1+"%5D&transformation=&transformForward=true&f=pjson",
		                crossDomain: true,
		   				dataType: 'jsonp',
		                success: function(data, code){
		                	/*
		                	//alert(data,code);
		                	//console.log(data);
		                	//console.log(data.geometries[0].x);
		                	$('.result3').data( "foo",data.geometries[0].x);
		                	$('.result4').data( "foo",data.geometries[0].y);
		                	var test2 = $('.result3').data('foo');
		                	var test3 = $('.result4').data('foo');
		                	console.log(test2);
		                	console.log(test3);
		                	*/
		                	var res = document.querySelector('#result3');
		                	res.dataset.x = data.geometries[0].x;
		                	res.dataset.y = data.geometries[0].y;

		                	console.log(res, res.dataset, res.dataset.x, res.dataset.y);
		                },
		                
		                error:  function(xhr, str){
		                     console.log(xhr,str);
		                },
		                
		                complete:  function(){ //а тут ничего из предложенных параметров не берем :)
		                    console.log("complete");
	                    	$("#gotopoint").click();
		                }
		            
		            });

					
					
  //console.log($('.js_find_address_lat').val(), $('.js_find_address_lng').val());
		            },
		        });
    
        /*$('.js_find_address_submit').click(function(){
            var city_id = $('.js_find_address_city_id').val();
            var find_address = $('.js_find_address').val();
            var lat = $('.js_find_address_lat').val();
            var lng = $('.js_find_address_lng').val();

            console.log(city_id, find_address, lat, lng);
            console.log('asdasd');

            if (city_id == '0' || city_id == 0 || find_address == '')
                return false;

            if (lat == '' || lng == '' || lat == undefined || lng == undefined || lat == 0 || lat == '0' || lng == 0 || lng == '0'){
                $( ".js_find_address" ).autocomplete("search");
                return false;
            }

            return true;
        })
        */
    }

    // С„СѓРЅРєРёРё РїРѕРєР°Р·Р° РІС‹СЃРїР»С‹РІР°СЋС‰РµРіРѕ РѕРєРЅР°
    if (($(".js_alert_mess_block").length > 0)){
		$('.js_alert_mess_block .alert-exit').click(function(){
			var parent_block = $(this).closest( ".js_alert_mess_block" );
			parent_block.remove();
		});

		setTimeout(function(){
			$( ".js_alert_mess_block" ).remove();
		}, 5000);
	}


});
});

 