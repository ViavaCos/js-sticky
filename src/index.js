init('.main', '.sticky')

/*
 * 设置定位
 * @params {string} selector css选择器
*/
function setPosition(selector) {
    var position = cssSupport('position', 'sticky') ? 'sticky' : 'relative';
    $(selector).css('position', position)
}

/*
 * 查询css是否支持
 * @params {string} selector css选择器
 * @returns {boolean}
*/
function cssSupport(attr, value) {
    var element = document.createElement('div');
    if (attr in element.style) {
        element.style[attr] = value;
        return element.style[attr] === value;
    } else {
        return false;
    }
}

/*
 * js设置粘性定位
 * @params {object} target 原生DOM
*/
function setSticky(target) {
    $('.sticky-warp.lt').css('position', 'relative').css('left', target.scrollLeft + 'px')
}

/*
 * 绑定滚动事件处理函数
 * @params {string} selector css选择器
*/
function bindScrollHandler(selector) {
    $(selector).on('scroll', function (event) {
        setSticky(event.target)
    })
}

/*
 * 初始化
 * @params {string} wrapSelector   外容器css选择器
 * @params {string} stickySelector 粘性元素css选择器
*/
function init(wrapSelector, stickySelector) {
    setPosition(stickySelector) // 设置定位

    // 支持原生position: sticky则直接退出
    if (cssSupport('position', 'sticky')) return;

    setSticky($(wrapSelector)[0]) // 默认
    bindScrollHandler(wrapSelector)
}
