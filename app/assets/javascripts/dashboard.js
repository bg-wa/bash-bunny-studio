var switch_1_editor, switch_2_editor

$(document).ready(
    function(){
        $("textarea").each(function() {
            var editor = CodeMirror.fromTextArea($(this).get(0), {
                lineNumbers: true,
                mode: 'text/x-sh',
                theme: 'monokai'
            });
            if(switch_1_editor == null){
                switch_1_editor = editor
            }else{
                switch_2_editor = editor
            }
        });
        updatePayloadEditor('/payloads/switch1', 'payload.txt', 1)
        $("#tabs").tabs({
            activate: function (event, ui) {
                var active = $('#tabs').tabs('option', 'active');
                switch(active) {
                    case 0:
                        updatePayloadEditor('/payloads/switch1', 'payload.txt', 1)
                        break;
                    case 1:
                        updatePayloadEditor('/payloads/switch2', 'payload.txt', 2)
                        break;
                    case 4:
                        checkLocalRepo();
                        break;
                    default:
                        //Do Nothing
                }
            }
        });
        $("button").button();
        $(":checkbox").checkboxradio();
        $('.data-table').DataTable({
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false
            }]
        });
    }
);

function writePayload(switch_position){
    var payload_text
    if(switch_position == 1){
        payload_text = switch_1_editor.getValue()
    }else{
        payload_text = switch_2_editor.getValue()
    }
    var file = $('.switch-' + switch_position + '.local-path').text()
    $.post('/dashboard/write_payload', {
        payload: payload_text,
        file: file
    }, function(response){
        alert('Payload Saved to ' + response.file)
    });
}

function checkLocalRepo(){
    $.getJSON('/dashboard/check_repo', function(response){
        if(response.status == 200){
            $('.clone-setting').hide();
            $('.pull-setting').show();
        }else{
            $('.clone-setting').show();
            $('.pull-setting').hide();
            $('#git-repo').val(localStorage.getItem('custom-repo') || 'https://github.com/hak5/bashbunny-payloads.git')
        }
    });
}

function cloneRepo(){
    if($('#git-repo').val().indexOf('/bashbunny-payloads.git') >= 0){
        repo = $('#git-repo').val();
        localStorage.setItem('custom-repo', repo);
        $('#git-action-buttons').append('<i class="fa fa-spinner fa-spin"></i>')
        $.getJSON('/dashboard/clone_repo?repo=' + repo, function(response){
            $('#git-action-buttons i').remove()
            checkLocalRepo();
        }, function(err){
            alert('Repo NOT Cloned')
        });
    }else{
        alert("Must be a BashBunny Repo");
    }
}

function gitCommand(){
    $.getJSON('/dashboard/git_command?command=' + $('#git-command').val(), function(response){
        $('#git-command-response').text(response.output);
    }, function(err){
        alert('Command NOT Executed')
    });
}

function deleteRepo(){
    $.getJSON('/dashboard/delete_repo', function(response){
        checkLocalRepo();
    });
}

function syncExtensions(){
    var extensions = $('input[id^=extension-checkbox]')
    var extension_ids = []
    $.each(extensions, function(index, item){
        if($(item).is(':checked')){
            var parsed_extension = item.id.split('-')
            extension_ids.push(parseInt(parsed_extension[parsed_extension.length-1]));
        }
    });
    $.getJSON('/dashboard/sync_extensions?extensions=' + extension_ids, function(response){
        alert('Extension Sync Finished')
    });
}

function copyPayload(switch_position, path){
    if(confirm('Are you sure you want to overwrite Switch ' + switch_position + '?') == true){
        $.getJSON('/dashboard/copy_payload?switch_position=' + switch_position + "&path="+ path, function(response){
            alert('Payload copied to Switch ' + switch_position)
        });
    }
}

function eject_bunny() {
    $.getJSON('/dashboard/eject_bunny', function(response){
        if(response.status == 200){
            alert('Bunny Ejected. Happy Bashing!');
            location.reload();
        }else{
            alert('FAILED to eject Bunny');
        }
    });
}

function updatePayloadEditor(path, file, switch_position){
    var file_path = path + '/' + file
    $.getJSON('/dashboard/payload_script?file=' + file_path, function(response){
        if(switch_position == 1){
            switch_1_editor.setValue(response.payload)
        }else{
            switch_2_editor.setValue(response.payload)
        }
        $('.edit-file-link').removeClass('active-file')
        $('.switch-' + switch_position + '.edit-file-link:contains("' + file + '")').addClass('active-file')
        $('.switch-' + switch_position + '.local-path').text(file_path)
    });
}