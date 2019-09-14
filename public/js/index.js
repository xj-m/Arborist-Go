const postButton = $('button#postButton');
const posterName = $('input#posterName');
const postContent = $('textarea#postContent');
// assign del func for every del button
Array.from(document.querySelectorAll('.delBtn')).forEach(function (button) {
    $('#' + button.id).on('click', () => {
        $.ajax({
            type: 'POST',
            url: '/del_post',
            data: {
                id: button.id
            },
            success: function (data) {
                if (data == 'success') {
                    location.reload();
                }
            }
        });
    });
});

postButton.on('click', () => {
    console.log('post Btn clicked');
    let posterName = posterName.val();
    let postContent = postContent.val();

    $.ajax({
        type: 'POST',
        url: '/submit_post',
        data: {
            posterName: posterName,
            postContent: postContent
        },
        success: function (data) {
            if (data == 'success') {
                location.reload();
            }
        }
    });
});