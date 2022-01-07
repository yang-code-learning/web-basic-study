/*
修改样式 
 */
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

function addClass(element, value) {
  if(!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " " + value;
    element.className = newClassName;
  }
}

//DOM只提供查找firstchild, lastchild之类的一般节点查找，不支持元素节点查找
function getNextElement(node) {
  if(node.nodeType == 1) {
    return node;
  } else {
    return getNextElement(node.nextSibling)
  }
}

function styleHeaderSiblings() {
  if(!document.getElementsByTagName) return false;
  var headers = document.getElementsByTagName("h1");
  var elem;
  for(var i=0;i<headers.length;i++) {
    elem = getNextElement(headers[i].nextSibling);
    //elem.setAttribute("class", "intro"); //1. 方法1，DOM
    elem.className = "intro"; //2. 方法2，属性
    //addClass(elem, "class"); //3. 方法3，构造函数
  }
}

//抽象函数，使更加通用
function styleElementSiblings(tag, theclass) {
  if(!document.getElementsByTagName) return false;
  var elems = document.getElementsByTagName(tag);
  var elem;
  for(var i=0;i<elems.length;i++) {
    elem = getNextElement(elems[i].nextSibling);
    addClass(elem, theclass);
  }
}


//表格斑马路样式
function stripeTables() {
  if(!document.getElementsByTagName) return false;
  var tables = document.getElementsByTagName("table");
  var odd, row;
  for(var i=0;i<tables.length;i++) {
    odd = false;
    rows = tables[i].getElementsByTagName("tr")
    for(var j=0;j<rows.length;j++) {
      if(odd) {
        //rows[j].style.backgroundColor = "#ffc"; //通过DOM设置
        addClass(rows[j], "odd"); //通过修改class设置
        odd = false;
      } else {
        odd= true;
      }
    }
  }
}

//代替css中hover伪类，即用js实现a:hover {}
function highlightRow() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for(var i=0;i<rows.length;i++) {
    rows[i].onmouseover = function() {
      this.style.fontWeight = "bold";
    }
    rows[i].onmouseout = function() {
      this.style.fontWeight = "normal";
    }
  }
}

//下函数同样适用
function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) return false;
  var abbrrviation = document.getElementsByTagName("abbr");
  if (abbrrviation.length < 1) return false;
  var defs = new Array();
  for (var i = 0; i < abbrrviation.length; i++) {
    var current_abbr = abbrrviation[i];
    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
  }
  var dlist = document.createElement("dl");
  for (key in defs) {
    var dtitle = document.createElement("dt");
    var dt_text = document.createTextNode(key);
    dtitle.appendChild(dt_text);
    var ddesc = document.createElement("dd");
    var dd_text = document.createTextNode(defs[key]);
    ddesc.appendChild(dd_text);
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  document.body.appendChild(header);
  document.body.appendChild(dlist);
}

addLoadEvent(stripeTables);
addLoadEvent(displayAbbreviations);
addLoadEvent(highlightRow);
//addLoadEvent(styleHeaderSiblings);
addLoadEvent(function() {
  styleElementSiblings("h1", "intro")
});