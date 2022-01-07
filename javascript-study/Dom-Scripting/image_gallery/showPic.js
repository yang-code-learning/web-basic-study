function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') { //��û�а󶨺�����״̬
    window.onload = func;
  } else {
    window.onload = function () {
      oldonload();
      func();
    }
  }
}

/* 
�����alert���������棬����������˼��
bodyԪ�ص�</body>��Ŀո���Ҳ����body�ĺ��ӣ�����Ԫ�غ���û��������ԣ�
����ע��Ҳ��һ�ֽڵ�
���������һ����ֻ֧����<ul></body><html>����û���κ��������ŲŻ����
*/
function insertAfter(newElement, targetElement) {
  var parent = targetElement.parentNode;
  //alert(parent.lastChild.nodeName);
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
    //alert("1");
  } else {
    parent.insertBefore(newElement, targetElement.nextSibling);
    //alert("2");
  }
}

function preparePlaceholder() {
  if (!document.createElement) return false;
  if (!document.createTextNode) return false;
  if (!document.getElementById) return false;
  if (!document.getElementById("imagegallery")) return false;
  var placeholder = document.createElement("img");
  placeholder.setAttribute("id", "placeholder");
  placeholder.setAttribute("src", "images/placeholder.gif");
  placeholder.setAttribute("alt", "my image gallery");
  var description = document.createElement("p");
  description.setAttribute("id", "description");
  var desctext = document.createTextNode("Choose an image");
  description.appendChild(desctext);
  var gallery = document.getElementById("imagegallery");
  insertAfter(placeholder, gallery);
  insertAfter(description, placeholder);
}

function prepareGallery() { //׼�����ӵ��ʱ���ܣ������޸�onclick
  //��������
  if (!document.getElementsByTagName) return false;
  if (!document.getElementById) return false;
  //���룬û��gallery��Ԫ��Ҳ�У��о�ִ�к��������õ��������
  if (!document.getElementById("imagegallery")) return false;
  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      return !showPic(this); //ע������Ҫ�����
    }
    links[i].onkeypress = links[i].onclick;
  }
}

/* 
չʾͼƬ��ʵ�ʲ���
����ĺܶ�����жϣ������prepareplaceholder��û�б�Ҫд��
*/
function showPic(whichpic) {
  //���룬û��ͼƬ�ŵĵط������ˣ���ͼƬ�����еĻ��ͻ�ֱ����ת���ӣ�
  if (!document.getElementById("placeholder")) return false;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  //���룬��ͼƬ�ŵĵط������У��������img��text���У����Ӧ�÷�ǰ�棩
  if (placeholder.nodeName != "IMG") return false;
  placeholder.setAttribute("src", source);

  //ͬ�����ȴ��ڣ����򲻴���
  if (document.getElementById("description")) {//������Ǹ�ҵ����ͼ������ҵ����ͼʧ���˲ŷ���false��������ﲻ�÷���false��
    var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : " ";//����û��title���Ե����
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3) { //�����ı����Ͳ��滻�µ��ı�
      description.firstChild.nodeValue = text;
    }
  }
  return true;
}

/* function countBodychildren() { //���nodetype��������û��
    var body_element = document.getElementsByTagName("body")[0];
    alert(body_element.childNodes.length);
    for(var i=0;i<body_element.childNodes.length;i++)
    {
        alert(body_element.childNodes[i].nodeType);
    }
}
window.onload = countBodychildren; */

addLoadEvent(preparePlaceholder)
addLoadEvent(prepareGallery);
