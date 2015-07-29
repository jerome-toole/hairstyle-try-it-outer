$(function(){
    $('#webcam').photobooth().on("image",function( event, dataUrl ){
        $( "#gallery" ).append( '<img src="' + dataUrl + '" >');
    });

    $('.hair-select').click( function () {
        event.preventDefault();
        var hairurl = $(this).data("hair");
        $(".tryer__image").css( "background-image", 'url(' + hairurl + ')'); //Theme2
    })
});