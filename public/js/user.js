// for make tree data: btn
const postTreeBtn = $('button#postTreeBtn');

// for make tree data: input
let treeLoc = $('input#treeLoc').val();
let status = $('input#status').val();
let name = $('input#name').val();
let date = $('input#date').val();
let pictures = $('input#pictures').val();

postTreeBtn.on('click', () => {
    console.log('postTreeBtn clicked');
    const dataJSON = {
        treeLoc: treeLoc,
        status: status,
        name: name,
        date: date,
        pictures: pictures
    }
    $.ajax({
        type: "POST",
        url = '/person/add_tree',
        data: dataJSON,
        success: function (data) {
            if (data = 'success') {
                location.reload();
            }
        }
    });
});