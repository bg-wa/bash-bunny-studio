function eject_bunny() {
    $.getJSON('/studio/eject_bunny', function(response){
        if(response.status == 200){
            $('#alert-dialog-content').html("<div class='text-center'>BASH BUNNY</div><p class='success'>Bash Bunny Unmounted.  Happy Bashing!</p>" +
                close_alert_dialog_button('location.reload()'))
            $('#alert-dialog').foundation('reveal', 'open');
        }else{
            $('#alert-dialog-content').html("<div class='text-center'>BASH BUNNY</div><p class='alert'>FAILED to eject Bunny!</p>" + close_alert_dialog_button())
            $('#alert-dialog').foundation('reveal', 'open');
        }
    });
}
