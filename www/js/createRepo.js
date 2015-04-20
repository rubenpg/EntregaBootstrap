var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";

// $.ajaxSetup({
// headers : {
// 'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
// }
// });



$("#button_crear_repo").click(function(e) {
	e.preventDefault();

    var newRepo = new Object();
	newRepo.name = $("#Nombre").val();
	newRepo.description = $("#Mensaje").val();
 	newRepo.homepage = "https://github.com";
 	newRepo.private = false;
	newRepo.has_issues = true;
	newRepo.has_wiki = true;
	newRepo.has_downloads = true;

	createRepo(newRepo);
});

function createRepo(repository) {
	var url = API_BASE_URL + '/user/repos';
	var data = JSON.stringify(repository);

	$("#create_result").text('');

	$.ajax({
         headers : {
							'Authorization' : "Basic "
									+ btoa(USERNAME + ':' + PASSWORD)
						},
		url : url,
		type : 'POST',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Created</div>').appendTo($("#create_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#create_result"));
	});

}