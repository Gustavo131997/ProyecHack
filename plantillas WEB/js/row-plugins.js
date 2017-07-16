/* ===================== write your custom javascript here ========================= */
(function($) {
    "use strict";
    // For Background Image
    var pageSection = $(".bg-img, .fixed-bg");
    pageSection.each(function(indx){
        
        if ($(this).attr("data-background")){
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });


})(jQuery);