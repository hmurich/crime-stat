$(document).ready(function() {
    // go to all obl
    $('.js_svg_obl_background').click(function(){
        $('.dop_info_table').css('opacity', 1);

        $('.svg_active_svg').css('height', '0%');
        $('#svg_all_rep').css('height', $('.map').height());

        var id = $('.svg_active_svg').attr('id');
        

        CURRENT_TYPE = 'all';
        OBL_ID = 0;

 

        var map = document.querySelector('#svg_all_rep');
        var obl  = document.querySelector('#svg_obl_'+id);



        document.querySelector('.svg_obl').classList.remove('svg_active_svg');
        document.querySelector('#svg_all_rep').classList.add('svg_active_svg');

        

    });

    $('.js_sel_obl').click(function(){
        var id = $(this).data('id');

        $('#svg_all_rep').css('height', '0%');

        $('.svg_obl').css('height', '0%');
        $('#svg_obl_'+id).css('height', "100%");

        //changeSvgForControl('svg_all_rep', 'svg_obl_'+id);
        
        var map = document.querySelector('#svg_all_rep');
        var obl  = document.querySelector('#svg_obl_'+id);
       
        map.classList.remove('svg_active_svg');
        obl.classList.add('svg_active_svg');


      

        $('.js_type_name').html('районов');

        console.log('test');
    });

   


});

