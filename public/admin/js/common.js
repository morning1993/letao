//进度条
$(document).ajaxStart(function(){
  NProgress.start();
})
$(document).ajaxStop(function(){
  NProgress.done();
})

//二级分类
$('.category>a').on('click',function(){
  $(this).next().slideToggle();
})

// 侧边栏隐藏
$('.icon_menu').on('click',function(){
  $('.it_aside').toggleClass('active');
  $('body').toggleClass('active');

})

//登出
$('.icon_logout').on('click',function(){
  $('#logoutModal').modal('show');
})
$('.logout').on('click',function(){
  $.ajax({
    type:'get',
    url:'/employee/employeeLogout',
    success:function(info){
      location.href = "login.html";
    }
  })
})

