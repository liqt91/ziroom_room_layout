(function(){
	var $=function(id){return document.getElementById(id);}
	var Tasks={
		show:function(id){
			$(id).className="";
			return this;
		},

		hide:function(id){
			$(id).className="hide";
			return this;
		},

		//常用DOM
		$plugin_enable_checkbox:$('plugin_enable_checkbox'),

		init:function(){
			if (!window.localStorage){
				return;
			}
			console.log(document);
			console.log('支持localstorage');
			// window.localStorage.pluginEnable = false
			console.log(window.localStorage.length);
			checkbox = Tasks.$plugin_enable_checkbox;
			console.log(window.localStorage.pluginEnable)
			if(window.localStorage.pluginEnable == "true"){
				checkbox.checked = true;
			}else{
				checkbox.checked = false;
			}
			console.log(checkbox.checked);
			Tasks.$plugin_enable_checkbox.addEventListener('click',function(){
				console.log(checkbox.checked);
			//if(Tasks.$plugin_enable_checkbox.is(":checked")) //jquery
				if(Tasks.$plugin_enable_checkbox.checked)	//js
				{
					//todo 启用插件
					console.log('启用插件');
					window.localStorage.pluginEnable = true;

				}else{
					//todo 关闭插件
					console.log('关闭插件');
					window.localStorage.pluginEnable = false;
				}
			})
		},

		pluginIsEnable:function(){
			return window.localStorage.pluginEnable == "true";
		}
	}
	Tasks.init();
})();

