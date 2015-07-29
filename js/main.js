$(function(){
    $(document).ready(function() {
        $("#webcam").scriptcam();
    });

    $('.hair-select').click( function () {
        event.preventDefault();
        var hairurl = $(this).data("hair");
        $(".tryer__image").css( "background-image", 'url(' + hairurl + ')'); //Theme2
    })
});