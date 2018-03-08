function eject_bunny() {
    $.getJSON('/studio/eject_bunny', function(response){
        if(response.status == 200){
            alert('Bunny Ejected. Happy Bashing!');
            location.reload();
        }else{
            alert('FAILED to eject Bunny');
        }
    });
}
