$(function () {

  //渲染商品
  function render() {
    var param = {
      page: 1,
      pageSize: 100,
      proName: key,
    }
    //判断是否需要排序
    var $active = $('.it_sort li.active');

    if ($active.length === 1) {
      var type = $active.data('type');
      var value = $active.find('span').hasClass('fa-angle-down') ? 2 : 1;
      param[type] = value;
    }

    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: param,
      success: function (info) {
        $('.product').html(template('tmp', info))
      }
    })

  }

  var key = getSearch().key;
  //讲传来的key放入input
  $('.it_search input').val(key);
  render();

  // 搜索功能
  $('.it_search button').on('click', function () {
    var key = $('.it_search input')
      .val()
      .trim();
    if (!key) {
      mui.toast('请输入搜索关键字');
      return;
    }
    // 页面跳转
    window.location.href = 'searchList.html?key=' + key;
  })

  //商品排序
  $('.it_sort li[data-type]').on('click', function () {

    var $this = $(this);
    if ($this.hasClass('active')) {
      $this
        .find('span')
        .toggleClass('fa-angle-down')
        .toggleClass('fa-angle-up');
    } else {
      $this
        .addClass('active')
        .siblings()
        .removeClass('active');

      $('.it_sort li')
        .find('span')
        .removeClass('fa-angle-up')
        .addClass('fa-angle-down');

    }
    render();

  })


})