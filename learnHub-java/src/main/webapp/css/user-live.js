$(function () {



	//其他页面获取字段
	// 获取 URL 的查询字符串部分
	var queryString = window.location.search.substring(1);
	// 将查询字符串分割成键值对数组
	var urlParams = new URLSearchParams(queryString);

	//参数来源于个人中心，用户点击课程时返回的该课程该老师直播密钥和课程id，课程id用地址传输到课程详情页，直播密钥存于sessionStrong
	var courseId = urlParams.get('courseId');



	//其他页面获取字段
	// 获取 URL 的查询字符串部分
	var queryString = window.location.search.substring(1);
	// 将查询字符串分割成键值对数组
	var urlParams = new URLSearchParams(queryString);

	//参数来源于个人中心，用户点击课程时返回的该课程该老师直播密钥和课程id，课程id用地址传输到课程详情页，直播密钥存于sessionStrong
	var courseId = urlParams.get('courseId');

	var secretKey = sessionStorage.getItem("secretKey");

	var player = $("#hls-live"); // 获取video元素


	var liveUrl = "http://192.168.100.230:8081/live/" + secretKey + ".m3u8";

	/*function setVideoSource(src) {
		$("#live-source").attr("src", src); // 设置source元素的src属性
		// alert("111")
		/!* player[0].load(); // 使用原生JavaScript方法加载视频

		// 自动播放
		if (player[0].paused) {
			player[0].play();
		} *!/

	}*/


	setVideoSource(liveUrl);


	$.ajax({

		url: "http://localhost:8080/user/findLiveByLiveStatus",
		type: "post",
		data: {
			courseId: courseId
		},
		success: function (d) {


			if (d.data === null) {

				alert("当前直播已结束！")
				var url = "course_detail.html?courseId=" + encodeURIComponent(courseId);
				window.location.href = url;

			} else {

				$("#live-title").text(d.data.title)


			}

		}


	})

})