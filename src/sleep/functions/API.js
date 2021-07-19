//非同步API請求，傳入網址、回傳函式

export function getAPI(url, callFun) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState === 4 && this.status === 200) {
      callFun(this);
    }
    //請求限制觸發
    else if(this.readyState === 4 && this.status === 429) {
      alert('重複太多次了');
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

export function postAPI(url, strArg, callFun) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState === 4 && this.status === 200) {
      callFun(this);
    }
    //請求限制觸發
    else if(this.readyState === 4 && this.status === 429) {
      alert('重複太多次了');
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(strArg);
}

export function postJsonAPI(url, data, callFun) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState === 4 && this.status === 200) {
      callFun(this);
    }
    //請求限制觸發
    else if(this.readyState === 4 && this.status === 429) {
      alert('重複太多次了');
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify(data));
}

export function getWordAPI(url) {
  let xhttp = new XMLHttpRequest();
  xhttp.responseType = 'blob';
  xhttp.onload = () => {
    let blob = xhttp.response; //Blob資料
    if (xhttp.status === 200) {
        if (blob && blob.size > 0) {
            let element = document.createElement('a');
            element.setAttribute('href', URL.createObjectURL(blob));
            element.setAttribute('download', 'test.docx');
            document.body.appendChild(element);
            element.click();
        } 
    } 
  }

  xhttp.open("GET", url, true);
  xhttp.send();
}

export function postMdbAPI(url, data, callFun) {
  let xhttp = new XMLHttpRequest();
  xhttp.onprogress = function(e) {
      console.log(e.loaded +'/'+ e.total);
  }
  xhttp.onreadystatechange = function() {

      if (this.readyState === 4 && this.status === 200) {
        callFun(this);
      }
      //請求限制觸發
      else if(this.readyState === 4 && this.status === 429) {
        alert('重複太多次了');
      }
  };
  xhttp.open("POST", url, true);
  xhttp.send(data);
}