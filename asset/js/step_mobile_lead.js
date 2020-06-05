var nameInput = document.getElementById('name');
var nextbtn1 = document.getElementById('nameNextBtn');
var progressName = document.getElementById('progress_fillName_1');

function checkName(){
    if(nameInput.value.length < 1){
        nextbtn1.classList.remove("show")
        progressName.classList.remove("active")
    }else{
        nextbtn1.classList.add("show")
        // progressName.classList.add("active")
    }
}




// emil check
var Uemail = document.getElementById('email');
var emailMessage = document.getElementById('EmailError');
var emailNext = document.getElementById('emailNextBtn');
var progressEmail = document.getElementById('progress_fill2_email');

var mailformat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
var mailformate2 = 'abcd@gmail.com';
function checkEmail(){
    if(Uemail.value.length < 1){
        emailNext.classList.remove("show");
        progressEmail.classList.remove("active");
    }else{
        emailNext.classList.add("show");
        // progressEmail.classList.add("active");
    }
    // value check 1
    if(Uemail.value.match(mailformat))
    {
        emailMessage.innerHTML = '';
        emailNext.classList.remove("dissable");
    }else
    {
        emailMessage.innerHTML = 'Error. Please enter email in correct format';
        emailNext.classList.add("dissable");
    }
};




// phone check
// var phoneError = document.getElementById('phoneError');
// var PhoneNext = document.getElementById('phoneNextBtn');
// var phone = document.getElementById('phone');
// var regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
// var progressphone = document.getElementById('progress_fill3_phone');
// function phoneCheck(){
//     if(phone.value.length < 5){
//         PhoneNext.classList.remove("show");
        
//     }else{
//         PhoneNext.classList.add("show");
        
//     }


//     // value check 1
//     if(phone.value.match(regPhone))
//     {
//         phoneError.innerHTML = '';
//         PhoneNext.classList.remove("dissable");
//         progressphone.classList.add("active");
//     }else
//     {
//         phoneError.innerHTML = 'Error. Please enter 10 digit mobile no.';
//         PhoneNext.classList.add("dissable");
//         progressphone.classList.remove("active");
//     }

// };