/*!
	-------------------------HELP--------------------
    -- This JS enhances loading image show/hide feature during the ajax requests.
    -- It's a global solution, you just include this JS in your html; rest it will take care of.
    -- How to use
        1. Prerequisites -
           -- <script language="JavaScript" src="/js/jquery-1.6.3.min.js" type="text/javascript"></script>
           
        2. Include this js in the head of your html
           -- <script language="JavaScript" src="/js/jquery.ajaxsetup.custom.js" type="text/javascript"></script>
        
        3. If you don't want this loading_div feature for a particular ajax call, just disable the global event like (global : false) -
            $.ajax({
              url: '...',
              dataType: 'json',
              global: false, // to overide loadind_div feature which is defined in "security.autocomplete.js"
              data: {
                'xyz'  : $.trim($('#x').val()),
                'r_no'          : Math.random()
              },
            success: function(res) {
              // success body
            }
            -- Note: Gloabl event can't be disabled with $.getJSON implementation. In that case you need to converet it to $.ajax shown above.
*/

// ready function starts here
$(function(){

  var loading_div = $("<div id='loading_div' style='position: absolute; overflow: hidden; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; display: none; background: url(images/ajax-loader.gif) 50% 50% no-repeat #000; opacity: 0.6; filter: alpha(opacity=60);'></div>");
  $("body").append(loading_div);  // append te loading div into dom, which will be show/hide during ajax
  
  $.ajaxSetup({ cache: false }); // cache false
  
  $(document).bind("ajaxSend", function(){
    $("#loading_div").show(); // show loading image once the ajax request ignites
    $("#loading_div").css({"height":$('body')[0].scrollHeight+"px"});
  }).bind("ajaxComplete", function(){
    $("#loading_div").hide(); // hide loading image ajax request is completed
  });

});
// ready function starts here

/*
File Name   : jquery.ajaxsetup.custom.js
Created By  : Anil Kumar Khichar (MA)
Created on  : March 03, 2014
PTID        : 66504400
Description : Continuation of #64670538 for Gabelli Research Coverage-Small Updates
*/