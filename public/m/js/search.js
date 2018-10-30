$(function () {
  //从localStorage获取数据
  function getHistory() {
    var history = localStorage.getItem('history');
    history = JSON.parse(history) || [];
    return history;
  }
  //渲染从localStorage获取的数据
  function render() {
    var history = getHistory();
    $('.it_history').html(template('tmp', { list: history }));
  }
  render();

  //删除功能
  $('.it_history').on('click', '.btn_delete', function () {
    var idx = $(this).data('index');
    mui.confirm('确定要删除这条记录吗', '温馨提示', ['否', '是'], function (e) {
      if (e.index === 1) {
        var history = getHistory();
        history.splice(idx, 1);
        localStorage.setItem('history', JSON.stringify(history));
        render();
      }
    })
  })

  //清空记录
  $('.it_history').on('click', '.btn_empty', function () {
    mui.confirm('确定要清空记录吗', '温馨提示', ['否', '是'], function (e) {
      localStorage.removeItem('history');
      render();
    })
  })


  //搜索功能
  $('.it_search button').on('click', function () {
    var value = $('.it_search input').val().trim();

    if (!value) {
      mui.toast('请输入搜索关键字')
      return;
    }

    var history = getHistory();
    var idx = history.indexOf(value);
    if (idx >= 0) {
      history.splice(idx, 1);
    }
    if (history.length >= 10) {
      history.pop();
    }
    history.unshift(value);
    localStorage.setItem('history', JSON.stringify(history));
    render();

    location.href = "searchList.html?key=" + value;
  })
})