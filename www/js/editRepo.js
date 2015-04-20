var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";

// $.ajaxSetup({
// headers : {
// 'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
// }
// });



$("#button_editar_repo").click(function(e) {
	e.preventDefault();

    var newRepo = new Object();
	newRepo.name = $("#Nombre").val();
	newRepo.description = $("#Mensaje").val();
	updateRepo(newRepo);
    console.log(newRepo.description);
});

function updateRepo(newRepo) {
   // REPO_NAME = $("#Nombre").val();
    
	var url = API_BASE_URL + '/repos/' + USERNAME + '/' + newRepo.name;
	var data = JSON.stringify(newRepo);
   
	$("#update_result").text('');

	$.ajax({
        headers : {
							'Authorization' : "Basic "
									+ btoa(USERNAME + ':' + PASSWORD)
						},
		url : url,
		type : 'PATCH',
		crossDomain : true,
		dataType : 'json',
		data : data,
	}).done(function(data, status, jqxhr) {
		$('<div class="alert alert-success"> <strong>Ok!</strong> Repository Updated</div>').appendTo($("#update_result"));				
  	}).fail(function() {
		$('<div class="alert alert-danger"> <strong>Oh!</strong> Error </div>').appendTo($("#update_result"));
	});

}