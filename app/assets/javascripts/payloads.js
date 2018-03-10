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
    if(confirm('Are you sure you want to overwrite Switch ' + switch_position + '?') == true){
        $.getJSON('/studio/copy_payload?switch_position=' + switch_position + "&path="+ path, function(response){
            response.status == 200 ? alert('Payload copied to Switch ' + switch_position) : alert('Payload Not Copied')
        });
    }
}