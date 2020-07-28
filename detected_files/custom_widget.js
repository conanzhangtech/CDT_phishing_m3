
$(function(){
	//speech bubbles
	(function(a){($.browser=$.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
			// var isMobile = /iPhone|iPod|Android/i.test(navigator.userAgent);
			       if($.browser.mobile) {
			         $('head').append('<link rel="stylesheet" type="text/css" href="//va.ecitizen.gov.sg/CFP/VA/SPF/css/Mobile.css">');
			        }
			        else
			        {
			        $('head').append('<link rel="stylesheet" type="text/css" href="//va.ecitizen.gov.sg/CFP/VA/SPF/css/Main.css">');
	}
  var browserName = navigator.appName;

    	   var currentURL = window.location.href;
		   var IEURL;
		   var CheckURL = currentURL.substring(0, 5);

		   	if (CheckURL == "https") {
		   	        IEURL = "https://va.ecitizen.gov.sg/flexAnsWS/ifaqservice.asmx/";
		   	    }
		   	    else {
		   	        IEURL = "http://va.ecitizen.gov.sg/flexAnsWS/ifaqservice.asmx/";
	    }

		   function getVersion(){
		             var ua= navigator.userAgent;
		             var  tem;
		             var M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
		             if(/trident/i.test(M[1])){
		               tem=  /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [];
		               return 'IE '+(tem[1] || '');
		               }
		               M= M[2]? [M[1], M[2]]:[navigator.appName, navigator.appVersion, '-?'];
		               if((tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		               return M.join(' ');
		           }

				   yql_url = function (source_url) {
        return "https://query.yahooapis.com/v1/public/yql?q=select * from xml where url=\"" + source_url + "\"";
    };
		           //ValidateDomain();
				Loadwidg();


		   var xmlDo;
		   var xmlJson;

          function ValidateDomain() {
             //browserName = navigator.appName;
              browserVersion = getVersion();


             if (browserName == 'Microsoft Internet Explorer'){
			 					                if (browserVersion == 'MSIE 7.0'){


			 					 	             $.ajax({
			 					 				             type: "POST",
			 					 				             url: yql_url(encodeURIComponent(IEURL + "CheckAllowedDomains")),
			 					 				             dataType: "jsonp",
			 					 				             contentType: "application/json;charset=utf-8",
			 					 				             // async: false,
			 					 				              success: function(json) {
			 					 								  xmlJson = json.results[0];

																  AjaxSucceeded();
			 					                                  }


			 					 				               /*error:  AjaxFailed,
			 					 				               complete: function(response, textStatus) {
			 					 				               return alert("Hey: " + textStatus);  } */
			 					               });
			 					               }
			 					               else{
			 					                 // Use Microsoft XDR
			 					                 var xdr = new XDomainRequest();
			 					                 xdr.open("get", IEURL + "CheckAllowedDomains");

			 					                 xdr.onerror = function () {return; }
			 					 				 xdr.ontimeout = function () { return; }
			 					                 xdr.onprogress = function () { return; }
			 					                 xdr.onload = function () {

			 					                 xmlDo = xdr.responseText;

			 					 			     // AjaxSucceeded(xmlDo);
												if( xmlDo.indexOf("true") > -1){
												Loadwidg();

												}
			 					                 };
			 					                setTimeout(function () {
			 					 			                   xdr.send();}, 0);
                }

            } else {
            url_name = IEURL ;
            $.ajax({
            type: "POST",
             url: url_name + 'CheckAllowedDomains',
            // data: { 'ProjectId': project_id, 'Source': myname, 'Platform':platform, 'PageTitle':pageTitle, 'Channel':channel },
            dataType: "xml",
            success: AjaxSucceeded
              /*error:  AjaxFailed,
              complete: function(response, textStatus) {
              return alert("Hey: " + textStatus);  }*/
             });
            }
           }
		   function Loadwidg(){

   var strTitle;
   (function(a){($.browser=$.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
   if($.browser.mobile ){
	   strTitle = "Ask about Police Matters";}
	   else{
		   strTitle = "Ask a question about Police Matters";}
	 //speech bubble vaclear,vaclose, remove ask jamie
	$("body").append('<!--[if IE 8]><div class="ie-8"><![endif]--><!--[if IE 7]><div class="ie-7"><![endif]--><script src="//va.ecitizen.gov.sg/CFP/VA/SPF/js/loadSource.js"></script><a href="javascript:void(0)" class="ask_cheryl_minimized_tab"></a><div class="chat_box no-print"><div class="chat_head"><div class="parallelogram"></div><strong>Ask Jamie @ SPF</strong><span style="color:white"> (Beta)</span><img src="//va.ecitizen.gov.sg/CFP/VA/SPF/images/neutral.png" alt="Ask Jamie" class="avatar_img"/><div class="mdone">I&#39;m Done</div><span class="VAclose"><img src="//va.ecitizen.gov.sg/CFP/VA/SPF/images/close.png" height="18" width="18" alt="close"/></span></div><div class="send_container">' + strTitle + '<div class="VAclear"></div></div><div class="avatar_content"><ul></ul><img class="load" src="//va.ecitizen.gov.sg/CFP/VA/SPF/images/ajax-loader.gif" alt="load"/></div><div class="text_chat"><textarea  name="chat_input"  disabled maxlength="170" class="chat_textarea" id="project" placeholder="Type your question ..."></textarea><ul class="autocomplete"></ul><button type="button" class="send_button">Send</button></div><div class="avatar_footer"><div class="powered_by"><p><font class="poweredbytext">Powered by </font><a href="//www.flexanswer.com" target="_blank"> flexAnswer</a><font class="poweredbytext">&trade;</font></p></div><div class="Terms"><p><a href="https://www.police.gov.sg/content/terms-of-use" target="_blank">Terms of Use</a></p></div><span class="print_link">Print<i class="icon-print icon-white"></i></span><ul class="print"></ul><div class="VAclear"></div></div></div><!--[if IE 7]></div><![endif]--><!--[if IE 8]></div><![endif]-->');
		   }
         function AjaxSucceeded(xml) {

          var doc;

           if (browserVersion == 'MSIE 7.0' || browserVersion == 'MSIE 8.0' ){
					doc = new ActiveXObject('Microsoft.XMLDOM');
					doc.async = 'false'

					 if (browserVersion == 'MSIE 7.0'){
					 					  doc.loadXML(xmlJson);}
					 					else{
					 					  doc.loadXML(xmlDo);}

					 xml  =  doc;
				 }


					 if($(xml).find('string').text() == "true"){
					 Loadwidg();

    }
    }
});
