function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') { //还没有绑定函数的状态
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
  }
}

function moveElement(elemID, final_x, final_y, interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elemID)) return false;
  var elem = document.getElementById(elemID);
  if(elem.movement) { /* 为元素创建属性 */
    clearTimeout(elem.movement);
  }
  //安全性检查
  if (!elem.style.left) {
    elem.style.left = "0px";
  }
  if (!elem.style.top) {
    elem.style.top = "0px";
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  //改进动画效果
  if (xpos != final_x) {
    dist = Math.ceil((final_x-xpos)/10);
    xpos = xpos + dist;
  }
  if (ypos != final_y) {
    dist = Math.ceil((final_y-ypos)/10);
    ypos = ypos + dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('" + elemID + "'," + final_x + "," + final_y + "," + interval + ")";
  elem.movement = setTimeout(repeat, interval);
}

function prepareSlideshow() {
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  //创建窗口
  if (!document.getElementById("linklist")) return false;
  var slideshow = document.createElement("div");
  slideshow.setAttribute("id", "slideshow");
  var preview = document.createElement("img");
  preview.setAttribute("src", "images/topics.gif");
  preview.setAttribute("alt", "building blocks of web design");
  preview.setAttribute("id", "preview");
  slideshow.appendChild(preview);
  var list = document.getElementById("linklist");
  insertAfter(slideshow, list);
  var preview = document.getElementById("preview");
  var links = list.getElementsByTagName("a");

  links[0].onmouseover = function () {
    moveElement("preview", -100, 0, 10);
  }
  links[1].onmouseover = function () {
    moveElement("preview", -200, 0, 10);
  }
  links[2].onmouseover = function () {
    moveElement("preview", -300, 0, 10);
  }
}

addLoadEvent(prepareSlideshow);