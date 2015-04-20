var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";

$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});

/*
Details about repository of GitHub API 
https://developer.github.com/v3/repos/
*/


$("#button_con_repo").click(function(e) {
	e.preventDefault();
	conRepo($("#Nombre").val());
});


function conRepo(repository_name) {
    Nombre = $("#Nombre").val();
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + Nombre;
	$("#con_repo_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {

				var repo = data;
        
        
                $('<h3>' + repo.name + '</h3>').appendTo($('#con_repo_result'));
				$('<p>').appendTo($('#con_repo_result'));
				$('<strong> ID: </strong> ' + repo.id + '<br>').appendTo(
						$('#con_repo_result'));
				$('<strong> Git URL: </strong> ' + repo.git_url + '<br>')
						.appendTo($('#con_repo_result'));

			}).fail(function() {
				$('<div class="alert alert-danger"> <strong>Oh!</strong> Repository not found </div>').appendTo($("#con_repo_result"));
	});

}





