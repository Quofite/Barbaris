<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="settingsContent" hidden>
	<form class="mt-5 container" method="post" action="saveSettings">
		<label>Настройки базы данных</label>
		<input type="text" placeholder="хост" name="host" class="form-control"><br>
		<input type="text" placeholder="логин" name="login" class="form-control"><br>
		<input type="text" placeholder="пароль" name="pass" class="form-control"><br>
		<input type="text" placeholder="база данных" name="db" class="form-control"><br>
		<input type="text" placeholder="рабочая папка" hidden name="workingDir" class="form-control"><br>
		<input type="submit" value="Сохранить" class="btn btn-success" id="saveBtn">
	</form>
</div>