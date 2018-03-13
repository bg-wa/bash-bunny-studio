var code_editor

$(document).ready(
    function () {
        $("textarea").each(function () {
            code_editor = CodeMirror.fromTextArea($(this).get(0), {
                lineNumbers: true,
                mode: 'text/x-sh',
                theme: 'monokai'
            });
        });
        var switch_position = $('.switch-1').length > 0 ? 1 : 2
        updatePayloadEditor('/payloads/switch' + switch_position, 'payload.txt', switch_position)
    }
);

function writePayload(switch_position, file, create) {
    file_path = file ? file : $('.switch-' + switch_position + '.local-path').text()
    $.post('/studio/write_payload', {
        payload: create ? '# Created with Bash Bunny Studio' : code_editor.getValue(),
        file: file_path
    }, function (response) {
        if (response.status == 200) {
            $('#alert-dialog-content').html("<div class='text-center'>PAYLOAD</div><p class='success'>Payload saved to " + response.file + "</p>" +
                close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
            updateFileList(response.file)
        } else {
            $('#alert-dialog-content').html("<div class='text-center'>PAYLOAD</div><p class='alert'>File Not Saved</p>" + close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }
    });
}

function updatePayloadEditor(path, file, switch_position) {
    var file_path = path + '/' + file
    $.getJSON('/studio/payload_script?file=' + file_path, function (response) {
        code_editor.setValue(response.payload)
        $('.edit-file-link').removeClass('active')
        $('.switch-' + switch_position + '.edit-file-link:contains("' + file + '")').addClass('active')
        $('.switch-' + switch_position + '.local-path').text(file_path)
    });
}

function createFileInput(switch_position) {
    $('#alert-dialog-content').html("<div>" +
        "<div class='text-center'>CREATE FILE</div>" +
        "<label>New File Name" +
        "<input type='text' id='create-file-input' placeholder='payload.txt' />" +
        "</label>" +
        "<button class='button secondary' onclick='createFile(" + switch_position + ")'>Create</button>" +
        "<div class='text-center'>OR</div>" +
        "<label for='switch-" + switch_position + "-upload'>Upload</label>" +
        "<input type='file' id='switch-" + switch_position + "-upload' name='switch-" + switch_position + "-upload' />"
    );
    $('#alert-dialog').foundation('reveal', 'open');
}

function createFile(switch_position){
  writePayload(switch_position, '/payloads/switch' + switch_position + '/' + $('#create-file-input').val(), true);
}

function updateFileList(file_path){
    var split_file_name = file_path.split('/');
    var file_name = split_file_name[split_file_name.length -1];
    var switch_position = split_file_name[split_file_name.length -2].replace('switch', '');
    $('#file-list').prepend('<li><a class="switch-' + switch_position + ' edit-file-link" onclick="updatePayloadEditor(\'/payloads/switch' + switch_position + '\', \'' + file_name + '\', ' + switch_position + ')">' + file_name + '</a></li>')
}