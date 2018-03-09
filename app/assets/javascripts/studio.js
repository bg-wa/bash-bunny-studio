function eject_bunny() {
    $.getJSON('/studio/eject_bunny', function(response){
        if(response.status == 200){
            alert("Bash Bunny Unmounted.  Happy Bashing! ");
            location.reload();
        }else{
            alert('FAILED to eject Bunny');
        }
    });
}
