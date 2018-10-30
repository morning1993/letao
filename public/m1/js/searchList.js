$(function() {
  function render() {
    // 1. 如何确定是否传递排序参数？？   只要找lt_sort下的active类
    // 2. 如何确定传price还是num？？    给库存以及价格添加了一个自定义的属性
    // 3. 如何确定传1还是2的问题？？     判断span是否有fa-angle-down:2  1
    var param = {
      proName: key,
      page: 1,
      pageSize: 100
    }

    // 1. 确定是否需要传排序参数
    var $active = $('.lt_sort li.active')
    // 有一个active的li，说明需要传递参数
    if ($active.length === 1) {
      // 2. 确定传递哪个参数
      var type = $active.data('type')
      // 3. 确定1还是2
      var value = $active.find('span').hasClass('fa-angle-down') ? 2 : 1
      param[type] = value
    }

    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function(info) {
        console.log(info)
        $('.product').html(template('tpl', info))
      }
    })
  }

  var key = getSearch().key
  $('.lt_search input').val(key)
  render()

  // 搜索功能
  $('.lt_search button').on('click', function() {
    var key = $('.lt_search input')
      .val()
      .trim()
    if (!key) {
      mui.toast('请输入搜索关键字')
      return
    }
    // 页面跳转
    window.location.href = 'searchList.html?key=' + key
  })

  // 排序功能
  $('.lt_sort li[data-type]').on('click', function() {
    var $this = $(this)
    if ($this.hasClass('active')) {
      // 有 修改当前li下的span的类  fa-angle-down  fa-angle-up
      $this
        .find('span')
        .toggleClass('fa-angle-down')
        .toggleClass('fa-angle-up')
    } else {
      // 没有
      $this
        .addClass('active')
        .siblings()
        .removeClass('active')
      // 所有的箭头往下
      $('.lt_sort span')
        .removeClass('fa-angle-up')
        .addClass('fa-angle-down')
    }

    // 重新渲染
    render()
  })
})
