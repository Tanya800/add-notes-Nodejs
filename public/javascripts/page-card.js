// $('.btn-save-edit').on('click',e=>{
//     $.ajax({
//         url: 'form.php',
//         type: 'post',
//         dataType: 'html',
//         data: $(this).serialize(),
//         success: function(data){
//             $('#msg').html(data);
//         }
//     });
// })

$('.btn-remove').on('click',e=>{
    let id = e.target.dataset.id;
    let url = 'http://localhost:3000/note/'+ id+'/delete';
    document.location.href = url;
    // $.ajax({
    //     url: url,
    //     type: 'post',
    //     dataType: 'text'
    // }).done(function(data){
    //     console.log(data)
    // });
})