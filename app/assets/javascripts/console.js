function shareInternet(){
    $.getJSON('', function(){
        if (response.status == 200) {
            $('#alert-dialog-content').html("<div class='text-center'>CONSOLE</div><p class='success'>Internet shared with Bash Bunny</p>" +
                close_alert_dialog_button())
        }else{
            $('#alert-dialog-content').html("<div class='text-center'>CONSOLE</div><p class='alert'>Internet NOT shared with Bash Bunny</p>" +
                close_alert_dialog_button())
        }
    })
}