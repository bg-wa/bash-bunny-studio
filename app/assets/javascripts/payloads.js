$(document).ready(
    function(){
        $('.data-table').DataTable({
            "columnDefs": [{
                "targets": 'no-sort',
                "orderable": false
            }]
        });
    }
);

function copyPayload(switch_position, path){
    $('#alert-dialog-content').html("<p class=''>Are you sure you want to overwrite Switch " + switch_position +"?</p>" +
        "<button class='button secondary' onclick='writeToSwitch(" + switch_position + ", \"" + path + "\")'>Yes</button>" +
        "<button class='button' onclick='$(\"#alert-dialog\").foundation(\"reveal\", \"close\");'>Cancel</button>");
    $('#alert-dialog').foundation('reveal', 'open');
}

function writeToSwitch(switch_position, path){
    $.getJSON('/studio/copy_payload?switch_position=' + switch_position + "&path="+ path, function(response){
        if(response.status == 200){
            $('#alert-dialog-content').html("<p class='success'>Payload copied to Switch " + switch_position +"</p>" +
                close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }else{
            $('#alert-dialog-content').html("<p class='alert'>Payload NOT Copied</p>" + close_alert_dialog_button)
            $('#alert-dialog').foundation('reveal', 'open');
        }
    });
}