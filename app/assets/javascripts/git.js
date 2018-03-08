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
        $('#git-action-buttons').append('<i class="fa fa-spinner fa-spin"></i>')
        $.getJSON('/studio/clone_repo?repo=' + repo, function(response){
            window.reload();
        }, function(err){
            alert('Repo NOT Cloned')
        });
    }else{
        alert("Must be a BashBunny Repo");
    }
}

function gitCommand(){
    $.getJSON('/studio/git_command?command=' + $('#git-command').val(), function(response){
        $('#git-command-response').text(response.output);
    }, function(err){
        alert('Command NOT Executed')
    });
}

function deleteRepo(){
    $.getJSON('/studio/delete_repo', function(response){
        window.reload();
    });
}