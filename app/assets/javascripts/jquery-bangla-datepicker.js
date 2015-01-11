(function($) {
    $.fn.bdatepicker = function(options) {
        var settings = {
          input: $(this),
          local: {
              closeText: "Done", // Display text for close link
              prevText: "Prev", // Display text for previous month link
              nextText: "Next", // Display text for next month link
              currentText: "Today", // Display text for current month link
              monthNames: ["January","February","March","April","May","June",
                  "July","August","September","October","November","December"], // Names of months for drop-down and formatting
              monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
              dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
              dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
              dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
              weekHeader: "Wk", // Column header for week of the year
              dateFormat: "mm/dd/yy", // See format options on parseDate
              firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
              isRTL: false, // True if right-to-left language, false if left-to-right
              showMonthAfterYear: false, // True if the year select precedes month, false for month then year
              yearSuffix: "" // Additional text to append to the year in the month headers
          },
          drawMonth: 0,
          drawYear: 0,
          selectedDay: 0,
          selector: '#ui-bdatepicker-div table.ui-datepicker-calendar tbody td a'
        }
        $.extend(settings, options);
        set_initial_date();
        var bmainDivId = 'ui-bdatepicker-div'
        this.bdpDiv ="<div id='" + bmainDivId + "'class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>";
        if ($("#"+ bmainDivId).length === 0) {
            $("body").append(this.bdpDiv);
        }

        $(this).click(function() {
            set_initial_date();
            showDatePicker();
        });

        $(document).on("click", "#ui-bdatepicker-div .ui-datepicker-next, #ui-bdatepicker-div .ui-datepicker-prev", function(){
            if($(this).attr('data-handler') == 'next') {
               settings.drawMonth += 1;
            }
            else {
               settings.drawMonth -= 1;
            }
            if(settings.drawMonth >= 12) {
               settings.drawYear += 1;
               settings.drawMonth = 0;
            }
            else if(settings.drawMonth <= 0) {
               settings.drawYear -= 1;
               settings.drawMonth = 11;
            }
            title = getTitle();
            $(this).parent().find('.ui-datepicker-title').html(title);
            new_data = generateDate();
            $("#ui-bdatepicker-div table.ui-datepicker-calendar tbody").html(new_data);
        });

        $(document).on("click", settings.selector, function() {
            element = $(this).parents('td');
            day = element.attr('data-day');
            month = element.attr('data-month');
            year = element.attr('data-year');
            formatted_date = day + "/" + (parseInt(month) + 1) + "/" + year;
            settings.input.val(formatted_date);
            $(settings.selector).removeClass('ui-state-active');
            $(this).addClass('ui-state-active');
            //hideDatePicker();
        });

        $(document).on('mouseenter mouseleave', settings.selector, function(e) {
            if(e.type == 'mouseenter') {
                $(this).addClass('ui-state-hover');
            }
            else {
                $(this).removeClass('ui-state-hover');
            }
        });
//        , function() {
//            console.log("Hover out");
//            $(this).removeClass('ui-state-hover');
//        }
        $(document).mouseup(function (e) {
            var container = $("#" + bmainDivId);
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                hideDatePicker();
            }
        });

        function generateHeader() {
            title = "<div class='ui-datepicker-title'>" + getTitle() + "</div>";
            html = "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all'>";
            html += "<a title="+settings.local.prevText+" data-handler='prev' class='ui-datepicker-prev ui-corner-all'><span class='ui-icon ui-icon-circle-triangle-w'>"+settings.local.prevText+"</span></a>";
            html += "<a title="+settings.local.nextText+" data-handler='next' class='ui-datepicker-next ui-corner-all'><span class='ui-icon ui-icon-circle-triangle-w'>"+settings.local.nextText+"</span></a>";
            html += title;
            return html + '</div>';
        }

        function getTitle() {
            monthName = "<span class='ui-datepicker-month'>"+settings.local.monthNames[settings.drawMonth]+" </span>";
            yearName = "<span class='ui-datepicker-year'>"+translateNumber(settings.drawYear)+"</span>";
            return monthName + yearName;
        }

        function generateData() {
            var firstDay = settings.local.firstDay;
            var thead = "";
            calender = "<table class='ui-datepicker-calendar'><thead>" + "<tr>";
            for (dow = 0; dow < 7; dow++) { // days of the week
                day = (dow + firstDay) % 7;
                thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +
                    "<span title='" + settings.local.dayNames[day] + "'>" + settings.local.dayNamesMin[day] + "</span></th>";
            }
            calender += thead + "</tr></thead>";
            tbody = generateDate();
            calender += tbody + "</tbody>";
            return calender + "</table>"
        }

        function generateDate() {
            var tbody = "";
            var today = getCurrentDay();
            days_in_month = daysInMonth(settings.drawMonth + 1, settings.drawYear);
            first_day = getFirstDayInMonth(settings.drawMonth, settings.drawYear);
            //console.log("month" + settings.drawMonth + " Year: " + settings.drawYear + " day: " + days_in_month + " First: " + first_day);
            leadDays = (first_day - settings.local.firstDay + 7) % 7;
            numRows = Math.ceil((leadDays + days_in_month) / 7); // calculate the number of rows to generate
            var printDate = daylightSavingAdjust(new Date(settings.drawYear, settings.drawMonth, 1 - leadDays));
            for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
                tbody += "<tr>";
                for (dow = 0; dow < 7; dow++) { // create date picker days
                    otherMonth = (printDate.getMonth() !== settings.drawMonth);
                    unselectable = otherMonth;
                    tbody += "<td class='" + ((dow + settings.local.firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "")
                        + "' data-handler='selectDay' data-year='" + printDate.getFullYear() + "' data-month='"+ printDate.getMonth() + "' data-day='"+ printDate.getDate() +"'>";
                    if(!unselectable) {
                        tbody += "<a class='ui-state-default "+(settings.selectedDay === printDate.getDate() ? ' ui-state-active ' : '') +
                            (today === printDate.getDate() ? 'ui-state-highlight' : '') + "' href='#'>"+ translateNumber(printDate.getDate()) +"</a>";
                    }
                    tbody += "</td>";
                    printDate.setDate(printDate.getDate() + 1);
                    printDate = daylightSavingAdjust(printDate);
                }
                tbody += "</tr>";
            }
            return tbody;
        }

        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }

        function getFirstDayInMonth(m, y) {
            var firstDay = new Date(y, m, 1);
            return firstDay.getDay();
        }

        function daylightSavingAdjust(date) {
            if (!date) {
                return null;
            }
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date;
        }

        function getCurrentDay() {
            var date = new Date();
            return date.getDate();
        }

        function translateNumber(num) {
            numbers = settings.local.numbers;
            num = "" + num;
            var num_trans = "";
            for(i = 0; i < num.length; i++) {
              num_trans += numbers[num[i]];
            }
            return num_trans;
        }

        function showDatePicker() {
            date_picker = $("#" + bmainDivId);
            calender_body = generateHeader() + generateData('');
            date_picker.html(calender_body);
            var position = settings.input.position();
            position.top += settings.input.outerHeight();
            date_picker.css({display: 'block', position: 'absolute', top: position.top, left: position.left});
        }

        function hideDatePicker() {
            date_picker = $("#" + bmainDivId);
            date_picker.css({display: 'none', position: 'absolute', top: 0, left: -100});
        }

        function set_initial_date() {
            var date = new Date();
            if(settings.input.val() != '') {
                date_n =  settings.input.val().split('/');
                date = new Date(date_n[2], (parseInt(date_n[1]) - 1), date_n[0]);
            }
            settings.drawMonth = date.getMonth();
            settings.drawYear = date.getFullYear();
            settings.selectedDay = date.getDate();
        }
    }
})(jQuery);