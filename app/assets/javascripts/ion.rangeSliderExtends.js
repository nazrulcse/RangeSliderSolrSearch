(function($) {
    "use strict";
    var plugin_count = 0;
    var pol = "<span class='irs-grid-pol' style='left:new_width%;'></span>";
    var pol_text = "<span class='irs-grid-text js-grid-text-index_value' style='left: new_width%; margin-left: -0.69444%;'>new_value</span>";
    $.fn.customRange = function(options) {
        return this.each(function (){
            $(this).ionRangeSlider(options);
            if(options.labels) {
                var step_width = 0;
                var per_step = (100 / (options.labels.length - 1));
                var irsGrid = "";
                $.each(options.labels, function(index, value) {
                    if(value != '') {
                        if(options.postfix) {
                            value += options.postfix;
                        }
                        else if(options.prefix)  {
                            value = options.prefix + value;
                        }
                        irsGrid += pol_text.replace('index_value', index).replace('new_width', step_width).replace('new_value', value)
                        irsGrid += pol.replace('new_width', step_width);
                    }
                    step_width += per_step;
                });
                $(this).prev(".irs-with-grid").find('.irs-grid').html(irsGrid);
            }
            plugin_count++;
        });
    }
})(jQuery);



