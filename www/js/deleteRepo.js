var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";


// $.ajaxSetup({
// headers : {
// 'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
// }
// });

$("#button_delete_repo").click(function(e) {
	e.preventDefault();
	deleteRepo();
});


function deleteRepo() {
	REPO_NAME = $("#repo_name").val();

	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + REPO_NAME;
	$("#repos_result").text('');

	$
			.ajax(
					{
						headers : {
							'Authorization' : "Basic "
									+ btoa(USERNAME + ':' + PASSWORD)
						},
						url : url,
						type : 'DELETE',
						crossDomain : true,
						dataType : 'json',
					})
			.done(
					function(data, status, jqxhr) {
						$(
								'<div class="alert alert-success"> <strong>Ok!</strong> Repositorio Borrado</div>')
								.appendTo($("#repos_result"));
					})
			.fail(
					function() {
						$(
								'<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>')
								.appendTo($("#repos_result"));
					});
}