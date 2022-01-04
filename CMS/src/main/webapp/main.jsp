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
        			<li class="nav-item"><a href="#" class="nav-link" id="dbBtn">База данных</a></li>
        			<li class="nav-item"><a href="#" class="nav-link" id="settingsBtn">Настройки</a></li>
        			<li class="nav-item"><a href="#" class="nav-link" id="docsBtn">Документация</a></li>
      			</ul>
    		</header>
		</div>
		
		<p>Path = ${path}</p>
	</body>
</html>