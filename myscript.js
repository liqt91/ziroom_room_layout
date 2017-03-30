(function(){
	var $ = function(id){return document.getElementById(id);}

	var XMLHttp = {
		_objPool:[],
		_getInstance:function(){
			for (var i = 0;i<this._objPool.length;i++){
				if(this._objPool[i].readyState == 0 || this._objPool.readyState == 4){
					return this._objPool[i];
				}
			}
			this._objPool.push(new XMLHttpRequest());
			return this._objPool[this._objPool.length-1];
		},
		sendReq:function(method, url, data, callback, div){
			var objXMLHttp = this._getInstance();
			with(objXMLHttp){
				try{
					if(url.indexOf("?")>0){
						url += "&randnum=" + Math.random();
					}else{
						url += "?randnum=" + Math.random();
					}
					open(method,url,true);
					objXMLHttp.responseType = "document";
					objXMLHttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
					send(data);
					objXMLHttp.onreadystatechange = function(){
						if (objXMLHttp.readyState == 4 ){
							if(objXMLHttp.status == 200){
								callback(objXMLHttp, div);
							}else {
								objXMLHttp.open(method,url,true);
								objXMLHttp.send(data);
							}
						}
					}
				}catch(e){
					console.log(e);
				}
			}
		}
	}

	//判断字符末尾
	String.prototype.endWith=function(endStr){
      var d=this.length-endStr.length;
      return (d>=0&&this.lastIndexOf(endStr)==d)
    }

	var Tasks = {
		// grabImageUrl:function(url){
		// 		var xhr = new XMLHttpRequest();
		// 		xhr.onreadystatechange = function(){
		// 			if (xhr.readyState == 4){
		// 				//修改当前页面图片显示
		// 				console.log('修改当前页面显示');
		// 			}
		// 		}
		// 		xhr.open('get',detailURL);
		// 		xhr.send(null);
		// },
		init:function(){
			var houseList = document.getElementById('houseList');
			// console.log(houseList);
			houseList.setAttribute('class', "houseList");
			houseList.id = "houseList";
			//去除自如寓广告
			// var zryAD = houseList.getElementsByClassName("clearfix zry");
			// for (var i = 0;i<zryAD.length;i++){
			// 	console.log(zryAD[i]);
			// 	console.log(zryAD[i].parentNode);
			// 	zryAD[i].parentNode.removeChild(zryAD[i]);
			// }
			// console.log(houseList);

			houses = houseList.childNodes;
			var detailURLs = [];
			for (i in houses){
				if (houses[i] != null && houses[i].className != 'clearfix'){
					continue;
				}
				var detailURL = houses[i].getElementsByClassName('img pr')[0].getElementsByTagName('a')[0].href;
				// console.log(detailURL);
				detailURLs[i] = detailURL;
			}
			// var xhrs = new Array();
			// for ( i in detailURLs){
			// 	console.log(detailURLs[i]);
			// 	xhrs[i] = new XMLHttpRequest();
			// 	xhrs[i].onreadystatechange = function(){
			// 		if(xhrs[i].readyState == 4){
			// 			console.log(xhrs[i]);
			// 		}
			// 	}
			// 	xhrs[i].open('GET',detailURLs[i]);
			// 	xhrs[i].send(null);
			// }
			for (i in detailURLs){
				console.log(detailURLs[i]);
				XMLHttp.sendReq("GET",detailURLs[i],'',this.setImage, houses[i]);
			}
		},
		setImage:function(XMLHttp,obj){
			// console.log(XMLHttp);]
			var houseImageList = XMLHttp.response.getElementsByClassName('lidiv');
			var layoutImageUrl = houseImageList[houseImageList.length-1].getElementsByTagName('img')[0].src;
			// console.log(houseImageList);
			// console.log(houseImageList[houseImageList.length-1].getElementsByTagName('img')[0]);
			// console.log(layoutImageUrl);
			var layoutImageDiv = document.createElement('div');
			layoutImageDiv.style.position = "fixed";
			layoutImageDiv.style.display = "none";
			layoutImageDiv.style.left = "50%";
			layoutImageDiv.style.top = "50%";
			layoutImageDiv.style.margin = "-400px 0 0 -300px";
			var houseImageDiv = obj.getElementsByClassName("img pr")[0];
			houseImageDiv.onmouseover = function(){
				// console.log("onmouseover");
				layoutImageDiv.style.display = "block";
			}
			houseImageDiv.onmouseout = function(){
				// console.log('onmouseout');
				layoutImageDiv.style.display = "none";
			}
			var layoutImage = document.createElement('img');
			layoutImage.style.border = "1px black solid";
			if(!layoutImageUrl.endWith('jpg')){
				layoutImage.src = "http://www.ziroom.com/static/images/slist_1207/mumian-up.jpg";
				layoutImage.style.width = "800px";
				layoutImage.style.height = "600px";
			}else{
				layoutImage.src = layoutImageUrl;
				layoutImage.style.width = "800px";
				layoutImage.style.height = "600px";
			}
			document.body.appendChild(layoutImageDiv);
			layoutImageDiv.appendChild(layoutImage);
			layoutImage.style.zIndex = 100;
			layoutImageDiv.style.zIndex = 100;
		}
	}
	//与background.js通信
	chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
		// console.log(response.pluginEnable);
		if(response.pluginEnable == "false"){
			return;
		}
		Tasks.init();
	});
})();