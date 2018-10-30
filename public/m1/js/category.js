$(function() {
  // 页面一加载，需要加载一级分类数据
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    success: function(info) {
      console.log(info)
      $('.cart_left ul').html(template('tpl', info))

      // 渲染一级分类中第一个分类对应的二级分类
      renderSecond(info.rows[0].id)
    }
  })

  // 点击1级分类，渲染二级分类
  $('.cart_left ul').on('click', 'li', function() {
    // 切换样式
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active')
    // 根据一级的id获取二级的数据
    var id = $(this).data('id')
    renderSecond(id)
  })

  function renderSecond(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      success: function(info) {
        console.log(info)
        $('.cart_right ul').html(template('tpl2', info))
      }
    })
  }
})
