//非同步API請求，傳入網址、回傳函式

export function getAPI(url, callFun) {
    let xhttp;
    if (window.XMLHttpRequest) {
      // code for modern browsers
      xhttp = new XMLHttpRequest();
    }
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        callFun(this);
      }
      //login api 請求限制觸發
      else if(this.readyState === 4 && this.status === 429) {
        alert('重複太多次了\n刷新網頁或5分鐘後再試試');
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

export function postAPI(url, strArg, callFun) {
    let xhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    }
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
        callFun(this);
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(strArg);
}