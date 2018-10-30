$(function() {
  // 获取localStorage中的数据
  function getHistory() {
    var history = localStorage.getItem('history')
    // 如果为空，不能解析成null, 而是空数组
    history = JSON.parse(history) || []
    return history
  }

  function render() {
    // 获取历史记录
    var history = getHistory()
    // 模板引擎不能直接传递一个数组，如果是数组，需要包装成一个对象
    $('.lt_history').html(template('tpl', { list: history }))
  }
  /* 
    一：列表展示功能
    1. 获取到localStorage中的历史记录, 必须保证是一个数组
    2. 结合模版引擎渲染出来
  */
  render()

  /* 
    二：删除功能
    1. 给删除按钮注册事件
    2. 获取到删除的下标
    3. 获取localStorage中的数据
    4. 根据数组下标删除数组对应的元素
    5. 把修改后的数组重新存回localStorage中
    6. 重新渲染
   */
  $('.lt_history').on('click', '.btn_delete', function() {
    var idx = $(this).data('index')
    mui.confirm('确定要删除这条记录吗', '温馨提示', ['否', '是'], function(e) {
      if (e.index === 1) {
        var history = getHistory()
        // 删除数组对应下标的元素
        history.splice(idx, 1)
        // 存回history
        localStorage.setItem('history', JSON.stringify(history))
        // 重新渲染
        render()
      }
    })
  })

  /* 
    三：清空功能
    - 给清空按钮注册点击事件
    - 删除history
    - 重新渲染
  */
  $('.lt_history').on('click', '.btn_empty', function() {
    mui.confirm('确定要清空历史记录吗', '提示', ['确定', '取消'], function(e) {
      if (e.index === 0) {
        localStorage.removeItem('history')
        render()
      }
    })
  })

  /* 
    四：搜索功能
    1. 给搜索按钮注册点击事件
    2. 获取到文本框的value值，搜索关键字
    3. 获取到历史记录，得到一个数组

      // 判断如果这个关键字在数组中已经存在了，先删除这个关键字
      // 判断如果此时数组的长度已经大于或者等于10，先删除数组最后一项
    4. 把搜索关键字加到数组的最前面
    5. 把数组重新存回localStorage中
    6. 重新渲染（可以不做）
    7. 页面跳转，商品列表页
  */
  $('.lt_search button').on('click', function() {
    // 获取文本框的value值
    var value = $('.lt_search input')
      .val()
      .trim()
    if (!value) {
      mui.toast('请输入关键字')
      return
    }
    // 获取历史记录
    var history = getHistory()

    // 判断如果这个关键字在数组中已经存在了，先删除这个关键字
    var idx = history.indexOf(value)
    if (idx >= 0) {
      // value在数组中已经存在了
      history.splice(idx, 1)
    }

    // ECMAScript
    if (history.length >= 10) {
      history.pop()
    }

    // 把历史记录 添加到最前面
    history.unshift(value)
    // 把修改后的历史记录存回localStroage
    localStorage.setItem('history', JSON.stringify(history))
    // 重新渲染
    render()

    // 跳转到商品列表页面
    location.href = 'searchList.html?key=' + value
  })
})
