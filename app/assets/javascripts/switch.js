var code_editor

$(document).ready(
    function(){
        $("textarea").each(function() {
            var editor = CodeMirror.fromTextArea($(this).get(0), {
                lineNumbers: true,
                mode: 'text/x-sh',
                theme: 'monokai'
            });
            code_editor = editor
        });
        updatePayloadEditor('/payloads/switch1', 'payload.txt', 1)
    }
);

function writePayload(switch_position){
    var file = $('.switch-' + switch_position + '.local-path').text()
    $.post('/studio/write_payload', {
        payload: code_editor.getValue(),
        file: file
    }, function(response){
        alert('Payload Saved to ' + response.file)
    });
}

function updatePayloadEditor(path, file, switch_position){
    var file_path = path + '/' + file
    $.getJSON('/studio/payload_script?file=' + file_path, function(response){
        code_editor.setValue(response.payload)
        $('.edit-file-link').removeClass('active-file')
        $('.switch-' + switch_position + '.edit-file-link:contains("' + file + '")').addClass('active-file')
        $('.switch-' + switch_position + '.local-path').text(file_path)
    });
}