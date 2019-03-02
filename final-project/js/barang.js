

$(document).ready(function(){
    $('#loading_wrap').show();
    // setTimeout(5000);
    // $('#loading_wrap').hidden();

});

const goods=[
    {
        id : 1,
        name : 'Hape Stawberry',
        price : 115000,
        normal_price : 140000,
        discound : '18%',
        image : 'image/flash/1.jpg',
    },
    {
        id : 2,
        name :  'JvaTech 10000mAh',
        price : 179000,
        normal_price : 499000,
        discound : '64%',
        image : 'image/flash/2.jpeg',
    },
    {
        id : 3,
        name :  'Delcell 21000mAh',
        price : 199000,
        normal_price : 499000,
        discound : '56%',
        image : 'image/flash/3.jpg',
    },
    {
        id : 4,
        name :  'Aukey 10000mAh',
        price : 199000,
        normal_price : 399000,
        discound : '50%',
        image : 'image/flash/4.jpg',
    },
    {
        id : 5,
        name :  'Logitech G300S',
        price : 209000,
        normal_price : 399000,
        discound : '48%',
        image : 'image/flash/5.jpg',
    },

];

let cart =[];

goods.map((row,key)=>{
    $('#flash-list').append( '<div class="col-2 container-thing"><a href="" class="goods" id="'+ row.id+'">' +
        ' <img src=" '+row.image+' " class="thing-img"/>' +
        '<div class="thing-name">'+ row.name +'</div>' +
        '<span class="thing-normal-price">Rp.'+ row.normal_price+'</span>' +
        '<div class="thing-flash-price">Rp.'+ row.price+'</div>' +
        '</a></div>')
});


$('.goods').click(function(e){
    e.preventDefault();
    let id = $(this).prop('id');
    let item =  goods.filter(good => good.id === parseInt(id));
    let isSet = cart.filter(cart =>cart.id === parseInt(id));

    if(isSet.length===0){
        const data ={
            id  : item[0].id,
            mount : 1,
            price : item[0].price,
            total_price : item[0].price,
            name : item[0].name,
            image : item[0].image,
        };

        cart.push(data);
    }
    else{
        addGoods(id);
    }

    cartMapping();
});


function cartMapping(){
    let cartSelector = $('.cart');
    let total_price =0;
    cartSelector.empty();
    if(cart.length===0){
        cartSelector.append('<div> Keranjang Kosong</div>');
        cartSelector.append('<div class="center"> Total Harga : </div> <div class="total_price center">Rp. '+total_price+'</div>');
    }
    else{
        cart.map((row,key)=>{
            cartSelector.append(' <div class="cart-detail">' +
                ' <div class="thing-name"> '+(key+1) +'.'+ row.name+'</div>' +
                '<div  class=""> Qty :'+row.mount+'</div>' +
                '<div class="thing-flash-price"> Rp.'+row.price+'</div>' +
                ' <button class="btn btn-success add" id='+row.id +'><i class="fa fa-plus"></i></button>' +
                ' <button class="btn btn-warning minus" id="'+row.id+'"><i class="fa fa-minus" style="color:white"></i></button>' +
                ' <button class="btn btn-danger delete" id="'+row.id+'"><i class="fa fa-remove" style="color:white"></i></button>' +
                ' </div>');

            total_price= total_price+ parseInt(row.price);
        });

        cartSelector.append('<div class="center"> Total Harga : </div> <div class="total_price center">Rp. '+total_price+'</div>');
        cartSelector.append('<div class="center"> <button class="btn btn-primary" id="check-out"> Check Out</button></div>');

    }
}
$(document).on('click','#check-out',function(){
    $('#cartModal').modal('show');
    $('.btn-secondary').show();
    $('.btn-primary').show();
    const body =  $('#cart-body');
    let total_price =0;
    body.empty();

    body.append('<table class="table"><thead>' +
        '<tr>' +
        '<th>No</th>' +
        '<th>Nama Barang</th>' +
        '<th>Qty</th>' +
        '<th>Price</th></tr>' +
        '</thead><tbody></tbody></table>');


    cart.map((row,key)=>{
        $('tbody').append('<tr>' +
            '<td>'+(key+1)+'</td>' +
            '<td>'+row.name+'</td>' +
            '<td>'+row.mount+'</td>' +
            '<td>'+row.price+'</td>' +
            '</tr>');
        total_price= parseInt(total_price) + row.price;
    });


    $('tbody').append('<tr><td colspan="4">Total Harga : Rp.'+total_price+'</td></tr>');
});


$(document).on('click','.add',function(){
    let id = $(this).prop('id');
    addGoods(id);
    cartMapping();
});

$(document).on('click','.minus',function(){
    let id = $(this).prop('id');
    minusGoods(id);
    cartMapping();
});

$(document).on('click','.delete',function(){
    let id = $(this).prop('id');
    console.log(id);
    deleteGoods(id);
    cartMapping();
});

function deleteGoods(id){
    let item = cart.filter(cart =>cart.id === parseInt(id));

    cart.map((row,key)=>{
        if(row.id === item[0].id)
            cart.splice(key,1);
    });
}

function addGoods(id){
    let items =  goods.filter(good => good.id === parseInt(id));
    let item = cart.filter(cart =>cart.id === parseInt(id));

    item.map((row,key)=>{
        const mount = parseInt(row.mount)+1;
        const price = parseInt(row.price) / parseInt(row.mount);

        item[key].mount = mount;
        item[key].price = price * mount;
    });
}

function minusGoods(id){
    let items =  goods.filter(good => good.id === parseInt(id));
    let item = cart.filter(cart =>cart.id === parseInt(id));

    item.map((row,key)=>{
        const mount = parseInt(row.mount)-1;
        if(mount===0){
            cart.map((row,key)=>{
              if(row.id === item[0].id)
                cart.splice(key,1);
        });
        }
        else{
            const price = parseInt(row.price) / parseInt(row.mount);

            item[key].mount = mount;
            item[key].price = price * mount;}
    });
}

$('#done').click(function(){
    cart=[];
    $('.btn-secondary').hide();
    $('.btn-primary').hide();
    $('#cart-body').empty();
    $('#cart-body').append('Done Check Outing');
    cartMapping();
});








