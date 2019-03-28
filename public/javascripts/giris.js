$('.toggle').on('click', function() {
    $('.toggle i').hide();
    $('.container').stop().addClass('active');
});

$('.close').on('click', function() {
    $('.container').stop().removeClass('active');
    $('.toggle i').show();
});

$('#girisbtn').click( ()=>{
   const kadi = $('#kadi').val();
   const sifre = $('#sifre').val();

    $.ajax(
        {
            type: "POST",
            url: '/giris',
            data: {kadi,sifre},
            success: function (data)
            {
                alert(data.message);
            },
        }
    );

});


$('#kayitbtn').click( ()=>{
    const kadi = $('#kkadi').val();
    const sifre = $('#ksifre').val();

    $.ajax(
        {
            type: "POST",
            url: '/kayit',
            data: {kadi,sifre},
            success: function (data)
            {
                alert(data.message);
                $('.container').stop().removeClass('active');
                $('.toggle i').show();
            },
        }
    );

});

