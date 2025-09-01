
    $(function () {
     
	// 假设头像的 URL 存储在 sessionStorage，键为 "avatarUrl"
	const avatarUrl = sessionStorage.getItem("avatarUrl");

	// 如果 avatarUrl 存在，动态更新 img 的 src 属性
	if (avatarUrl) {
		const userAvatar = document.getElementById("headphone");
		
		userAvatar.src = "http://localhost:8080/" + avatarUrl;

		//const teacherPhoto = document.getElementById("teacher-avatar-img");
		// teacherPhoto.src="http://localhost:8080/" + avatarUrl;
	}

    })
    