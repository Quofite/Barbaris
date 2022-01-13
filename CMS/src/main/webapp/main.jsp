<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ru">
	<head>
		<meta charset="UTF-8">
		<title>Главная</title>
		<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
	</head>
	<body>
		<div class="container">
			<header class="d-flex justify-content-center py-3">
      			<ul class="nav nav-pills">
        			<li class="nav-item"><a href="#" class="nav-link active" id="mainBtn">Главная</a></li>
        			<li class="nav-item"><a href="#" class="nav-link" id="dbInfoBtn">База данных</a></li>
        			<li class="nav-item"><a href="#" class="nav-link" id="settingsBtn">Настройки</a></li>
        			<li class="nav-item"><a href="wellcome" class="nav-link" id="toWellcomeBtn">Выйти</a></li>
        			<li class="nav-item"><a href="https://github.com/Quofite/Barbaris#readme" target="_blank" class="nav-link" id="docsBtn">Документация</a></li>
      			</ul>
    		</header>
    		<hr>
		</div>
		<div id="content">
			<b id="workDir">Рабочая директоия = ${cookie['path'].getValue().toString()}</b>
			<jsp:include page="mainInfo.jsp"></jsp:include>
			<jsp:include page="dbInfo.jsp"></jsp:include>
			<jsp:include page="settings.jsp"></jsp:include>
		</div>
	</body>
	
	<script>
		// переключение стилей кнопок
		document.querySelector("#mainBtn").addEventListener("click", () => {
			document.querySelector("#dbInfoContent").setAttribute("hidden", "true");
			document.querySelector("#settingsContent").setAttribute("hidden", "true");
			document.querySelector("#mainInfoContent").removeAttribute("hidden");
			
			document.querySelector("#mainBtn").removeAttribute("class");
			document.querySelector("#mainBtn").setAttribute("class", "nav-link active");
			document.querySelector("#dbInfoBtn").removeAttribute("class");
			document.querySelector("#dbInfoBtn").setAttribute("class", "nav-link");
			document.querySelector("#settingsBtn").removeAttribute("class");
			document.querySelector("#settingsBtn").setAttribute("class", "nav-link");
		});
		
		document.querySelector("#dbInfoBtn").addEventListener("click", () => {
			document.querySelector("#mainInfoContent").setAttribute("hidden", "true");
			document.querySelector("#settingsContent").setAttribute("hidden", "true");
			document.querySelector("#dbInfoContent").removeAttribute("hidden");
			
			document.querySelector("#mainBtn").removeAttribute("class");
			document.querySelector("#mainBtn").setAttribute("class", "nav-link");
			document.querySelector("#dbInfoBtn").removeAttribute("class");
			document.querySelector("#dbInfoBtn").setAttribute("class", "nav-link active");
			document.querySelector("#settingsBtn").removeAttribute("class");
			document.querySelector("#settingsBtn").setAttribute("class", "nav-link");
		});
		
		document.querySelector("#settingsBtn").addEventListener("click", () => {
			document.querySelector("#mainInfoContent").setAttribute("hidden", "true");
			document.querySelector("#dbInfoContent").setAttribute("hidden", "true");
			document.querySelector("#settingsContent").removeAttribute("hidden");
			
			document.querySelector("#mainBtn").removeAttribute("class");
			document.querySelector("#mainBtn").setAttribute("class", "nav-link");
			document.querySelector("#dbInfoBtn").removeAttribute("class");
			document.querySelector("#dbInfoBtn").setAttribute("class", "nav-link");
			document.querySelector("#settingsBtn").removeAttribute("class");
			document.querySelector("#settingsBtn").setAttribute("class", "nav-link active");
		});
		
		// установка рабочей директории
		let workingDirFullText = document.getElementById("workDir").textContent;
		let splitted = workingDirFullText.split(" ");
		let workingDir = splitted[splitted.length - 1];
		document.getElementsByName("workingDir")[0].setAttribute("value", workingDir);
	</script>
</html>