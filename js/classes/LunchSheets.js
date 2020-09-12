
function Sheet(url){
	this.url = url;
	this.rawData = false;

	var me = this;

	this.getRawData = function(){
	  var me = this;
	  this._makeQuery();
	  return new Promise((resolve) => {
		this._whenRawData(() => {
		  resolve(this.rawData);
		});
	  });
	}

	this._makeQuery = function(){
	  var query = new google.visualization.Query(this.url);
	  query.send(this._handleQueryResponse);
	}

	this._handleQueryResponse = function(response){
	  me.rawData = response.getDataTable();
	  var scripts = document.getElementsByTagName("script");
	  for(var s = 0; s < scripts.length; s++){
		if(scripts[s].getAttribute("src") == me.url){
		  scripts[s].remove();
		}
	  }
	}

	this._whenRawData = function(callback){
	  var interval = setInterval(() => {
		try{
		  if(this.rawData != false){
			clearInterval(interval);
			callback();
		  }
		} catch {

		}
	  }, 100, interval, callback);
	}
  }

  function loadGoogleCharts(){
	google.charts.load('current', {'packages':['corechart']});
	return new Promise((resolve) => {
	  var loaded = setInterval(() => {
		try{
		  if(google.visualization.Query != undefined){
			clearInterval(loaded);
			resolve();
		  }
		} catch {

		}
	  }, 100, loaded);
	});
  }





















// var GoogleAuth;

// function toggleAuth(){
//     if (GoogleAuth.isSignedIn.get()) {
// 		GoogleAuth.signOut();
// 	}
// 	else {
// 		GoogleAuth.signIn();
// 	}
// }

// function loadAuth() {
// 	gapi.load("client:auth2", initClient);
// }

// function initClient() {
// 	// do not place docs directly in the array, must be evaluated beforehand
// 	var docs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest","https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest"];
// 	gapi.client.init({ // Initialize a client with these properties
// 		"apiKey":"AIzaSyAgh_eB-Zb3Fg2zw45ujC5dwM8yWGpHC1k",
// 		"discoveryDocs":docs,
// 		"clientId":"293650503056-im5efjet3pppcmpdmdns08u6no9lah4q.apps.googleusercontent.com",
// 		"scope":"https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/spreadsheets"
// 	}).then(function() {
// 		GoogleAuth = gapi.auth2.getAuthInstance();
// 		GoogleAuth.isSignedIn.listen(onAuthUpdate);
// 		onAuthUpdate();
// 	});
// }

// var knownDatabases = {};
// var databaseId;
// var pageId = 0;

// function getData(page){
// 	var a1range = page + "!A1:E10"
// 	gapi.client.sheets.spreadsheets.values.get({
// 		spreadsheetId: id,
// 		range: a1range,
// 	}).then()
// }
