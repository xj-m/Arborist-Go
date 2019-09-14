const submitLogBtn = $('button#submitLogBtn');
const userEmail = $('input#userName');
const userPsw = $('input#userPsw');

submitLogBtn.on('click', () => {
    let userEmail = userEmail.val();
    let userPsw = userPsw.val();
    $.ajax({
        type: 'POST',
        url: '/login',
        data: {
            userEmail = userEmail,
            userPsw = userPsw
        },
        success: function (data) {
            // if (data == 'success') {
            //     location.reload();
            // }
        }
    })


})