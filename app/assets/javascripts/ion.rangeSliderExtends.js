(function($) {
    "use strict";
    var plugin_count = 0;
    $.fn.customRange = function(options) {
        return this.each(function (){
            $(this).ionRangeSlider(options);
            if(options.labels) {
                var step = 0;
                var per_step = (100 / (options.labels.length - 1));
                var irsGrid = "";
                $.each(options.labels, function(index, value) {
                    if(value != '') {
                        if(options.postfix) {
                            value += options.postfix;
                        }
                        var pol = "<span class='irs-grid-pol' style='left:"+step+"%;'></span>";
                        var pol_text = "<span class='irs-grid-text js-grid-text-"+index+"' style='left: "+step+"%; margin-left: -0.69444%;'>"+value+"</span>";
                        irsGrid += pol + pol_text;
                    }
                    step += per_step;
                });
                $(this).prev(".irs-with-grid").find('.irs-grid').html(irsGrid);
            }
            plugin_count++;
        });
    }
})(jQuery);



