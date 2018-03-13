function syncExtensions(){
    var extensions = $('input[id^=extension-checkbox]')
    var extension_ids = []
    $.each(extensions, function(index, item){
        if($(item).is(':checked')){
            var parsed_extension = item.id.split('-')
            extension_ids.push(parseInt(parsed_extension[parsed_extension.length-1]));
        }
    });
    $.getJSON('/studio/sync_extensions?extensions=' + extension_ids, function(response){
        if(response.status == 200){
            $('#alert-dialog-content').html("<p class='success'>Extensions Sync'd</p>" +
                close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }else{
            $('#alert-dialog-content').html("<p class='alert'>Extensions Not Sync'd</p>" + close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }
    });
}