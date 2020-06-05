var wasSubmitted = false;    

$(document).ready(function() {
    var upsc = $(window);
    var page = $('html, body');



// $('#progress1').hide();
// $('#progress2').hide();
// $('#progress3').hide();
// $('#progress4').hide();

   
    $('.formula_areaContent_slider').owlCarousel({
        items:1,
        margin:30,
        smartSpeed:450,
        autoplay: true,
        autoplayTimeout: 3000,
        loop: true,
        nav:true,
        navText: ["<i class='fal fa-angle-left'></i>","<i class='fal fa-angle-right'></i>"],
    });

    $('select').niceSelect({});

    

    $('#inputNext').on('click',function(){
        $('.form_3_input1').addClass('hide');
        $('.form_3_input2').addClass('show');
        $( "#phone" ).focus();
        $( "#phone" ).click();

        
        // $('#progress1').show();
    })

    $('#inputNext2').on('click',function(){
        $('.form_3_input2').removeClass('show');
        $('.form_3_input3').addClass('show');
        $( "#email" ).focus();
        $( "#email" ).click();


        // $('#progress1').show();
        // $('#progress2').show();
    })

    $('#inputNext3').on('click',function(){
        $('.form_3_input3').removeClass('show');
        $('.form_3_input4').addClass('show');

        // $('#progress1').show();
        // $('#progress2').show();
        // $('#progress3').show();
    })

    upsc.on('scroll',function(){
	    if (upsc.scrollTop() > 200) {
             $('#form_area').addClass('animated slideInDown fix')
          } else {
              $('#form_area').removeClass('animated slideInDown fix')
          }
	})

   
    $('#inputNext4').on('click',function(){



        // $('#progress1').show();
        // $('#progress2').show();
        // $('#progress3').show();
        // $('#progress4').show();
        if($("#drop_val").val()=="0"){

            // occupationError.innerHTML = 'Please select an option';
            mdtoast('Please select an option', {
                type: 'info'
            });
            
            return;
        }
        else{
            // occupationError.innerHTML = '';
        }

        // progressOccupation.classList.add("active");

        // $('#progress8').show();

        $('#progress8').removeAttr('hidden');
        $('#progress4').hide();

        $("#send_spinner").show();
        console.log("before: "+ wasSubmitted);
        // alert("submited");
       
        $(this).val('Please wait ...')
        .attr('disabled','disabled');


        // return;
  



		if(!wasSubmitted) {
            // alert("submited");
			wasSubmitted = true;
            console.log("after: "+ wasSubmitted);
        var name = $("#name").val();
        var email = $("#email").val();
        // var phone = $("#phone").val();
        var phone = $("#phoneCode").text()+$("#phone").val();
        var source = $("#source").val();
        // var source = "UPSC TEST CASES";
        var currentBrowserInfo = "Current Browser : "+getBrowserName();

        // if($("#gridRadios1").is(":checked")){
        //     var do_what = $("#gridRadios1").val();
        // }
        // else if($("#gridRadios2").is(":checked")){
        //     var do_what = $("#gridRadios2").val();
        // }
        // else if($("#gridRadios3").is(":checked")){
        //     var do_what = $("#gridRadios3").val();
        // }
        // else{
        //     var do_what = $("#gridRadios4").val();
        // }

        var do_what = $("#drop_val").val();
        
        



        var d = new Date();
        var currentTimeStamp = d.getTime();
        var db = firebase.firestore();
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '_' + mm + '_' + yyyy;

        // console.log(name);
        // console.log(email);
        // console.log(phone);
        // console.log(source);
        // console.log(currentBrowserInfo);
        // console.log(do_what);
        // console.log(today);


        // document.write(today);
        db.collection("leads").add({
            name: name,
            email: email,
            phone: phone,
            currentBrowserInfo: currentBrowserInfo+ "  ***  "+ navigator.userAgent,
            brand: "Upsc Pathshala",
            source:source,
            do_what: do_what,
            timestamp:currentTimeStamp,
            date_field:today
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        var otp_value = "";
        if(name && email && phone && do_what && source ){
            $.ajax({
              method: "POST",
              url: "https://api.ufaber.com/api/leads-submit/fetch-lead/",
              data: { "name": name, "email": email, "phone": phone, "do_what": do_what, "source": source, "otp_value": otp_value,"device_info":currentBrowserInfo+ "  ***  "+ navigator.userAgent  }
            }).done(function( msg ) {


                    // function showToast() {
                        // alert(1);

                        mdtoast('Your form has been submitted successfully!', {
                            type: 'success'
                        });


                    // }

                if(msg['message'] == "success"){
                    window.location.replace("http://thefluentlife.com/online/no1coaching/thanks/");
                }
                else if(msg['message'] == "all_fields"){
                    alert("Fields are missing, not all fields are selected");
                }
                else if(msg['message'] == "otp_match"){
                    alert("OTP value doesn't match, please make sure that you are entering the correct OTP");
                }
                else if(msg['message'] == "no_otp"){
                    alert("Please enter the OTP, without that your enquiry cannot be processed");
                }
            }).fail(function() {
                alert( "error" );
              });
		}
	}
	});


});


function getBrowserName() {

    if ( navigator.userAgent.indexOf("Edge") > -1 && navigator.appVersion.indexOf('Edge') > -1 ) {
        return 'Edge';
    }
    else if( navigator.userAgent.indexOf("Opera") != -1 || navigator.userAgent.indexOf('OPR') != -1 )
    {
        return 'Opera';
    }
    else if( navigator.userAgent.indexOf("Chrome") != -1 )
    {
        return 'Chrome';
    }
    else if( navigator.userAgent.indexOf("Safari") != -1)
    {
        return 'Safari';
    }
    else if( navigator.userAgent.indexOf("Firefox") != -1 ) 
    {
        return 'Firefox';
    }
    else if( ( navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true ) ) //IF IE > 10
    {
        return 'IE';
    }  
    else 
    {
        return 'unknown';
    }
}