var MAP_BOX = document.querySelector('#map_box');

includeHtml('map/allrepublic.html', MAP_BOX);
includeHtml('map/almaty_city.html', MAP_BOX);
includeHtml('map/astana_city.html', MAP_BOX);
includeHtml('map/obl_akm.html', MAP_BOX);
includeHtml('map/obl_aktobe.html', MAP_BOX);
includeHtml('map/obl_almata.html', MAP_BOX);
includeHtml('map/obl_atiray.html', MAP_BOX);
includeHtml('map/obl_karaganda.html', MAP_BOX);
includeHtml('map/obl_kizil.html', MAP_BOX);
includeHtml('map/obl_kost.html', MAP_BOX);
includeHtml('map/obl_mangist.html', MAP_BOX);
includeHtml('map/obl_pavlodar.html', MAP_BOX);
includeHtml('map/obl_sev_kaz.html', MAP_BOX);
includeHtml('map/obl_taraz.html', MAP_BOX);
includeHtml('map/obl_uko.html', MAP_BOX);
includeHtml('map/obl_vko.html', MAP_BOX);
includeHtml('map/obl_zko.html', MAP_BOX);


$(document).ready(function() {
    $('.svg_obl').css('height', '100%');
    $('.svg_obl').hide();
    $('#svg_all_rep').show();

    $('.js_svg_obl_background').click(function(){
        $('.svg_obl').hide();
        $('#svg_all_rep').show();


        var obl = document.querySelector('.svg_obl.active');
        obl.classList.remove('active');

        var obl = document.querySelector('#svg_all_rep');
        obl.classList.add('active');

        MAP.init();
    });

    $('.js_sel_obl').click(function(){
        var id = $(this).data('id');
        $('#svg_all_rep').hide();
        $('#svg_obl_'+id).show();

        var obl = document.querySelector('#svg_all_rep');
        obl.classList.remove('active');

        var obl = document.querySelector('#svg_obl_'+id);
        obl.classList.add('active');

        MAP.init();
    });
});
