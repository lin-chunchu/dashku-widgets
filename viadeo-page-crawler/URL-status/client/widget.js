// You can use 3rd-party libraries with your widget. For more information, 
// check out the Docs section titled 'Using 3rd-party JS libraries'.

// The widget's html as a jQuery object
var widget = this.widget;

// This runs when the widget is loaded
this.on('load', function(data){
  widget.append("<div id='message'>awaiting transmission ...</div>").hide().fadeIn('slow');
});
// This runs when the widget receives a transmission
this.on('transmission', function (data) {
    var message = widget.find('#message');
    var tbody = widget.find('tbody');
  	var ratio = widget.find('#ratio');
    tbody.empty();
    ratio.empty();
    message.remove();
    tbody.empty();
    console.log(data);
  	ratio.append(data.ratio+"%");
    for (key in data) {
      if(data[key]!=null){
        if(data[key].statusList!=undefined){
            var prop = data[key];
            tbody.append("<tr><td><a href='" + prop.name + "' target='_blank'>" + prop.name.substring(0,30) + "</a></td><td class='note'><a href='#' class=" + getColor(prop.statusList) + " data-open='false'>" + getColor(prop.statusList) + "</a></td></tr>"+ getDetails(prop.statusList) + "");
        }
      }
    }
    $('.ko,.err4').off();
    $('.ko,.err4').on('mousedown',
  	    function(e){
  	        if ($(this).attr('data-open')=="false") {
              $(this).parents('tr').nextUntil('tr:not(.details)').show('fast');
              $(this).attr('data-open','true');
  	        }
  	        else{
			        $(this).parents('tr').nextUntil('tr:not(.details)').hide('fast');
              $(this).attr('data-open','false');
  	        }
      	    e.preventDefault();
        }
     );
});

function getColor(list){
    var classname = "ok";
  	if (list.length!=0){	
      for(key in list){
          if(list[key].status == 401 || list[key].status == 401)classname="err4";
         else{
           classname = "ko";
         	 break;
         }
      }
    }
    return classname;
}

function getDetails(statusList){
    var tpl;
     for(key in statusList){
        tpl+="<tr class='details'><td>";
        tpl+="<a href='"+statusList[key].url+"' target='_blank'>"+statusList[key].url.substring(0,30)+"</a></td><td class='ko'>"+statusList[key].status+"</td></tr>";
     }
      
    return tpl;
}
