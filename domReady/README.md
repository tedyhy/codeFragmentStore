参考：
https://developer.mozilla.org/zh-CN/docs/Web/API/Window/frameElement

1.
var frameEl = window.frameElement;
返回包含当前window窗口的元素（如：iframe、object），如果当前window对象已经是顶层窗口，则此属性返回null。

var frameEl = window.frameElement;
// 如果当前窗口被包含在一个框架里面,则将该框架的地址跳到'http://mozilla.org/'
if (frameEl)
  frameEl.src = 'http://mozilla.org/';


2.
相关链接

window.frames 返回一个类数组对象,返回当前窗口的所有子框架元素.
window.parent 返回当前窗口的父窗口,也就是说,包含当前窗口所在的frameElement元素的窗口.


3.window.external的用法
参考
http://www.cnblogs.com/MaxIE/archive/2007/11/06/950755.html
http://www.cnblogs.com/jkisjk/archive/2011/09/05/window_external.html


4.原理
jQuery对于IE的解决方案，使用了一种新的方法，该方法源自http://javascript.nwbox.com/IEContentLoaded/。 它的原理是，在IE下，DOM的某些方法只有在DOM解析完成后才可以调用，doScroll就是这样一个方法，反过来当能调用doScroll的时候即 是DOM解析完成之时，与Prototype.js中的document.write相比，该方案可以解决页面有iframe时失效的问题。此外，jQuery 似乎担心当页面处于iframe中时，该方法会失效，因此实现代码中做了判断，如果是在iframe中则通过document的 onreadystatechange来实现（通过document.readyState==='complete'判断），否则通过doScroll来实现。不过经测试，即使是在iframe中，doScroll依然有效。
