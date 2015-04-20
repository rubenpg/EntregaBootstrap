var API_BASE_URL = "https://api.github.com";
var USERNAME = "";
var PASSWORD = "";
$.ajaxSetup({
    headers: { 'Authorization': "Basic "+ btoa(USERNAME+':'+PASSWORD) }
});



// $.ajaxSetup({
// headers : {
// 'Authorization' : "Basic " + btoa(USERNAME + ':' + PASSWORD)
// }
// });

$("#button_get_repos").click(function(e) {
	var url = API_BASE_URL + '/users/' + USERNAME + '/repos?per_page=2';
	getRepos(url);
});



function RepoCollection(repoCollection){
	this.repos = repoCollection;

	var instance = this;

	this.buildLinks = function(header){
		if (header != null ) {
			this.links = weblinking.parseHeader(header);
		} else {
			this.links = weblinking.parseHeader('');
		}
	}

	this.getLink = function(rel){
                return this.links.getLinkValuesByRel(rel);
	}

	this.toHTML = function(){
		var html = '';
		$.each(this.repos, function(i, v) {
			var repo = v;
			html = html.concat('<br><strong> Name: ' + repo.name + '</strong><br>');
			html = html.concat('<br><strong> ID: ' + repo.id + '</strong><br>');
			html = html.concat('<br><strong> Git URL: ' + repo.git_url + '</strong><br>');
		});
		
		html = html.concat(' <br> ');

                var prev = this.getLink('prev');
		if (prev.length == 1) {
			html = html.concat(' <a onClick="getRepos(\'' + prev[0].href + '\');" style="cursor: pointer; cursor: hand;">[Anterior]</a> ');
		}
                var next = this.getLink('next');
		if (next.length == 1) {
			html = html.concat(' <a onClick="getRepos(\'' + next[0].href + '\');" style="cursor: pointer; cursor: hand;">[Siguiente]</a> ');
		}

 		return html;	
	}

}


function getRepos(url) {
	$("#repos_result").text('');

	$.ajax({
		url : url,
		type : 'GET',
		crossDomain : true,
		dataType : 'json',
	}).done(function(data, status, jqxhr) {
        	var response = data;
		var repoCollection = new RepoCollection(response);
                var linkHeader = jqxhr.getResponseHeader('Link');
                repoCollection.buildLinks(linkHeader);

		var html = repoCollection.toHTML();
		$("#repos_result").html(html);

	}).fail(function(jqXHR, textStatus) {
		console.log(textStatus);
	});

}









