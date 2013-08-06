// JavaScript Document
function confirmed(event){
	var garageName = event.data.garageName;
	var text = '<div class="row">'
			+'You are currently parking at '
			+garageName
			+'</div>'
			+'<div class="row">'
			+'<input id="check-out-btn" class="btn btn-danger" type="button" value="Check Out"/>'
			+'</div>'
			+'<br/>';
	$('#confirming').modal('hide')
	$('#content-window').html(text);
}