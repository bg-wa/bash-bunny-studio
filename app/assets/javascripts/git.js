$(document).ready(
    function(){
        $('#git-repo').val(localStorage.getItem('custom-repo') || 'https://github.com/hak5/bashbunny-payloads.git');
        $('#git-command').val('');
    }
);


function cloneRepo(){
    if($('#git-repo').val().indexOf('/bashbunny-payloads.git') >= 0){
        repo = $('#git-repo').val();
        localStorage.setItem('custom-repo', repo);
        $('.clone').append('<i class="fa fa-spinner fa-spin"></i>')
        $.getJSON('/studio/clone_repo?repo=' + repo, function(response){
            location.reload();
        }, function(err){
            $('#alert-dialog-content').html("<div class='text-center'>GITHUB</div><p class='alert'>Repo NOT Cloned</p>" + close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        });
    }else{
        $('#alert-dialog-content').html("<div class='text-center'>GITHUB</div><p class='alert'>Must be a Bash Bunny Repo</p>" + close_alert_dialog_button())
        $('#alert-dialog').foundation('reveal', 'open');
    }
}

function gitCommand(){
    $.getJSON('/studio/git_command?command=' + $('#git-command').val(), function(response){
        $('#git-command-response').text(response.output);
    }, function(err){
        $('#alert-dialog-content').html("<div class='text-center'>GITHUB</div><p class='alert'>Command NOT Executed</p>" +
            close_alert_dialog_button())
        $('#alert-dialog').foundation('reveal', 'open');
    });
}

function deleteRepo(){
    $.getJSON('/studio/delete_repo', function(response){
        location.reload();
    });
}