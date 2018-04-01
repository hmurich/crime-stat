
$(document).ready(function() {
    $('#article_list').hide();
    $('#type_list input:checkbox').on('click', function() {
        // in the handler, 'this' refers to the box clicked on
        var $box = $(this);
        if ($box.is(":checked")) {
            var group = "input:checkbox[name='" + $box.attr("name") + "']";
            $(group).prop("checked", false);
            $box.prop("checked", true);

            changeType(parseInt( $(this).attr('id')));
        } else {
            $box.prop("checked", false);

            changeType(false);
        }
    });

    $('#datepicker').change(function(){
        console.log( $(this).val());
    });

    function changeType(type_id){
        if (type_id == 5)
            $('#article_list').show();
        else
            $('#article_list').hide();
    }

    $('#filter').click(function(){
        var data = $('#datepicker').val();
        var type = $( "#type_list input:checked" ).attr('id');
        var ar_art = [];

        $('#article_list input:checked').each(function(i, art) {
            ar_art.push($(this).attr('id'));
        });

        if (data == '' || type == undefined )
            return false;


        type = parseInt(type);


        MAIN_DATA.getData(data, type, ar_art);
    });
});
