// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery.turbolinks
//= require jquery_ujs
//= require_tree .
//= require turbolinks

$(function() {
    Range = $("#custom-range").customRange({
        type: "double",
        grid: true,
        steps: 0.1,
        postfix: ' feet',
        labels: ['4', '5', '6', '7']
    });


    Range = $("#education-range").customRange({
        type: "double",
        grid: true,
        steps: 0.1,
        values: ['SSC', 'SSC Reading', 'HSC', 'HSC Reading', 'BSC', 'BSC Reading', 'MSC'],
        labels: ['SSC', '', 'HSC', '', 'BSC', '', 'MSC']
    });

});