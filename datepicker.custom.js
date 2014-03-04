/*!
	-------------------------HELP--------------------
    -- It will create datepicker for the input elements which has specified class.
    -- How to use
        1. Prerequisites -
           -- <link rel="stylesheet" href="/css/jquery-ui.css" type="text/css" />
           -- <script language="JavaScript" src="/js/jquery-1.6.3.min.js" type="text/javascript"></script>
           -- <script language="JavaScript" src="/js/jquery-ui.min.js" type="text/javascript"></script>
           
        2. Include this js in the head of your html
           -- <script language="JavaScript" src="/js/datepicker.custom.js" type="text/javascript"></script>
          
        3. In the html specify class as: (class="date_picker", class="date_range")
           a. Simple datepicker:
              -- <input class="date_picker" type="text" ..... />
           b. Datepicker with daterange feature. i.e. end date can't be before start date:
              -- <input id="#ajx_sdate" class="date_range" enddate_id="#ajx_edate,#ajx_pdate" ..... /> 
              -- <input id="#ajx_edate" name="ajx_edate" ..... />  (use id,name as per your convenience)
              -- <input id="#ajx_pdate" name="ajx_pdate" ..... />  (use id,name as per your convenience)
              -- Here specify "date_range" class to start date input and also specify it's dependent end date input elements id's in the "enddate_id" attribute..
              -- No need to do anything with the end date input elements. Start date will do care of that.
*/

// ready function starts here
$(function(){
  
  $('input.date_picker').each(function(){ // create datepicker widget for all input elements having "date_picker" class
      $(this).datepicker(); // init
  });

 
  $('input.date_range').each(function(){ // create datepicker widget for all input elements having "date_range" class
    var $start_date_obj = $(this); // start date object   
    var $end_date_objs = $($.trim($start_date_obj.attr('enddate_id'))); // end date object
    
    $end_date_objs.attr('disabled', !$start_date_obj.val().length);
    $end_date_objs.datepicker({ // end date init
      beforeShow: function(){
        $(this).datepicker("option","minDate", $start_date_obj.val()); // end date should not be before start date
      }
    });
    
    $start_date_obj.datepicker({ // start date init
      onSelect: function(selected){
        $end_date_objs.val(''); // reset end date
        $end_date_objs.trigger('blur');
        $end_date_objs.attr('disabled', !$(this).val().length);
        $end_date_objs.datepicker("option","minDate", selected);
      }
    });
    
    $start_date_obj.blur(function(){
      if (!$(this).val().length){
        $end_date_objs.val(''); // empty end date if start date is blank
        $end_date_objs.trigger('blur');
      }
      $end_date_objs.attr('disabled', !$(this).val().length); // enable end date if user input date in the start date
    });
  
  });
  
});

// Very useful function; if you want to clean all previous states; just call this function
var reset_datepicker = function(){
  $('input.date_range').trigger('blur');
}
// ready function ends here  

/*
File Name   : datepicker.custom.js
Created By  : Anil Kumar Khichar (MA)
Created on  : Feb 28, 2014
*/
