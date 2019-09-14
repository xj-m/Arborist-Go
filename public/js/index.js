const loginBtn = $('button#loginBtn');
const userEmail = $('input#userName');
const userPsw = $('input#userPsw');

loginBtn.on('click', () => {
    console.log('login btn clicked');
    $.ajax({
        type: 'GET',
        url: '/login',
        success: function (data) {}
    });
});