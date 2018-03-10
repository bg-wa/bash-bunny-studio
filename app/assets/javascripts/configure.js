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
        updateConfigEditor()
    }
);

function writeConfig(){
    $.post('/studio/write_payload', {
        payload: code_editor.getValue(),
        file: 'config.txt'
    }, function(response){
        response.status == 200 ? alert('Configuration Saved') : alert('Configuration Not Saved')
    });
}

function updateConfigEditor(){
    $.getJSON('/studio/payload_script?file=config.txt', function(response){
        code_editor.setValue(response.payload)
    });
}