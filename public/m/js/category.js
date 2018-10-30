$(function(){
  //渲染一级分类
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      
      $('.cart_left ul').html(template('tmp',info));
      renderSecond(info.rows[0].id)
    }
  })


  //点击一级分类，渲染二级
  $('.cart_left ul').on('click','li',function(){
    //切换样式
    $(this).addClass('active').siblings().removeClass('active');
    //根据一级ID渲染二级数据
    var id = $(this).data('id');
    renderSecond(id);

  })

  function renderSecond(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id,
      },
      success:function(info){
        $('.cart_right ul').html(template('tmp2',info));
      }
    })
  }
})


