// for make tree data: btn
const postTreeBtn = $('button#postTreeBtn');

// for make tree data: input
let treeLoc = $('input#treeLoc').val();
let status = $('input#status').val();
let name = $('input#name').val();
let date = $('input#date').val();
let pictures = $('input#pictures').val();

//add event listener to each delete button for every post dynamically
Array.from(documant.querySelectorAll('.delBtn')).forEach(function (button) {
    $('#' + button.id).on('click', (event) => {
        $.ajax({
            type: 'POST',
            url: '/person/del_tree',
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

postTreeBtn.on('click', () => {
    console.log('postTreeBtn clicked');
    const dataJSON = {
        treeLoc: treeLoc,
        status: status,
        name: name,
        date: date,
        pictures: pictures
    };
    $.ajax({
        type: 'POST',
        url: '/person/add_tree',
        data: dataJSON,
        success: function (data) {
            if (data == 'success') {
                location.reload();
            }
        }
    });
});