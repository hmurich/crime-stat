$( document ).ready(function() {
  $( "#type_list input" ).on( "click", function() {
      $(".statia" ).html( $( "#type_list input:checked" ).siblings('label').html());
      $(".statia2").css("display",'none');
    });
  
   var statia_list = []; 
   var statia;
    $( "#article_list label" ).on( "click", function() {
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                statia = $(this).html();
                var indexElement = $.inArray($.trim(statia), statia_list);
                console.log(indexElement);
                delete statia_list[indexElement];
            }else{
                $(this).addClass('active');
                statia = $(this).html();
                statia_list.push(statia);
            }
           
          
            $(".statia2").empty();

            for (var i=0; i<statia_list.length; i++) {
                if(statia_list[i] != undefined){
                $(".statia2").append("<span>"+  statia_list[i]+",</span>");
                }
            }
          
           
           
      
        
       
    });
    

var today = new Date();
var dd = today.getDate() - 1;
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+ dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("datepicker").setAttribute("max", today);
document.getElementById("datepicker").setAttribute("value", today);
$('#filter').click();
});