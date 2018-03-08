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
        alert('Extension Sync Finished')
    });
}