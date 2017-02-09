$(function () {
	/**
	 * aqiData，存储用户输入的空气指数数据
	 * 示例格式：
	 * aqiData = {
	 *    "北京": 90,
	 *    "上海": 40
	 * };
	 */
	var aqiData = {};

	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		var city = $("#aqi-city-input").val().trim();
		var aqi = $("#aqi-value-input").val().trim();
		var re = /^[A-Za-z\u4E00-\u9FA5\s]+$/;
		 if (re.test(city)){
		 	aqiData[city] = aqi;
		 }
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		var n;
		$("#aqi-table>tr").remove();
		for(var key in aqiData){
			n = document.createElement("tr");
			n.innerHTML = "<td>" + key + "</td><td>" + aqiData[key] + "</td><td><button>删除</button></td>";
			$("#aqi-table").append(n);
		}
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
		addAqiData();
		renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle() {
		// do sth.
	//	console.log($(this).parent().parent().find('td').html());
		delete aqiData[$(this).parent().parent().find('td').html()]
		renderAqiList();
	}

	function init() {

		// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
		$("#add-btn").click(addBtnHandle);
		// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
		$("#aqi-table").on("click","button",delBtnHandle);
	}

	init();
});