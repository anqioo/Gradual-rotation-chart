// 页面打开就加载js
window.onload = function () {
    // 第一步:鼠标移入大盒子,显示左右箭头,移除隐藏

    // 这一步需要获取大盒子和左右箭头的盒子
    var container = document.querySelector('.container');
    var arrow = document.querySelector('.arrow');

    container.onmouseenter = function () {
        arrow.style.opacity = 1;
        clearInterval(timer);
    }
    container.onmouseleave = function () {
        arrow.style.opacity = 0;
        clearInterval(timer);
        timer = setInterval(function () {
            right.onclick()
        },1500)
    }

    // 第二步:点击小圆点切换图片
    
    // 这一步需要获取, 圆点的li和图片的li
    var olLis = document.querySelectorAll('ol li');
    var ulLis = document.querySelectorAll('ul li');

    // 遍历olLis,给每一个li加上点击事件
    olLis.forEach(function (item , index) {
        item.onclick = function () {
            // 再次遍历olLis,给每一个ol的li改变样式
            // 不能用外层遍历的参数
            olLis.forEach(function (el, i) {
                // 排他思想,先给所有的样式清除
                el.removeAttribute('class');
                ulLis[i].style.opacity = 0;
            })
            // 再单独给点击的那一项加样式
            olLis[index].className = 'current';
            ulLis[index].style.opacity = 1;

            // 统一索引，当每次圆点和图片切换时count就等于此时的索引
            count = index;
        }
    })

    // 第三步:点击左右箭头,切换图片
    
    // 这一步需要获取具体的左箭头和右箭头
    var left = document.querySelector('.arrow a:first-child');
    var right = document.querySelector('.arrow a:last-child');

    // 点击右箭头，切换图片
    // 首先每次点击右箭头，圆点和图片的索引都要加一
    // 先声明一个变量等于0，第一个图片的索引等于0
    var count = 0;
    // 加上点击事件
    right.onclick = function () {
        // 每次点击count都要加1
        count++;
        // 但是到最后一张图片时要跳转到第一张图片，此时要加判断
        if (count >= olLis.length) count = 0;
        change(count);
    }
    // 点击左箭头，切换图片
    // 每次点击左键头，索引就要减一
    left.onclick = function () {
        count--;
        // 如果到第0个图片时，再次点击就要跳转到最后一个索引对应的内容上
        if (count <= 0) count = olLis.length - 1;
        change(count);
    }

    // 第四步：自动播放
    var timer = setInterval(function () {
        right.onclick()
    },1500)

    // 封装
    // 参数不能写死，参数n等于每次调用change函数时，传入的实参
    var change = function (n) {
        olLis.forEach(function (el, i) {
            // 排他思想,先给所有的样式清除
            el.removeAttribute('class');
            ulLis[i].style.opacity = 0;
        })
        // 再单独给点击的那一项加样式
        olLis[n].className = 'current';
        ulLis[n].style.opacity = 1;
    }
}