var code_editor

$(document).ready(
    function(){
        $("textarea").each(function() {
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

function writePayload(switch_position){
    var file = $('.switch-' + switch_position + '.local-path').text()
    $.post('/studio/write_payload', {
        payload: code_editor.getValue(),
        file: file
    }, function(response){
        if(response.status == 200){
            $('#alert-dialog-content').html("<p class='success'>Payload saved to " + response.file +"</p>" +
                close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }else{
            $('#alert-dialog-content').html("<p class='alert'>File Not Saved</p>" + close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }
    });
}

function updatePayloadEditor(path, file, switch_position){
    var file_path = path + '/' + file
    $.getJSON('/studio/payload_script?file=' + file_path, function(response){
        code_editor.setValue(response.payload)
        $('.edit-file-link').removeClass('active')
        $('.switch-' + switch_position + '.edit-file-link:contains("' + file + '")').addClass('active')
        $('.switch-' + switch_position + '.local-path').text(file_path)
    });
}