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
        file: '/config.txt'
    }, function(response){
        if(response.status == 200){
            $('#alert-dialog-content').html("<div class='text-center'>CONFIGURATION</div><p class='success'>Configuration Saved</p>" +
                close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }else{
            $('#alert-dialog-content').html("<div class='text-center'>CONFIGURATION</div><p class='alert'>Configuration NOT Saved</p>" + close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }
    });
}

function updateConfigEditor(){
    $.getJSON('/studio/payload_script?file=/config.txt', function(response){
        code_editor.setValue(response.payload)
    });
}