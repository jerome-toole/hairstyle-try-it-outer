$(function(){
    $('#webcam').photobooth().on("image",function( event, dataUrl ){
        $( "#gallery" ).append( '<img src="' + dataUrl + '" >');
    });
});