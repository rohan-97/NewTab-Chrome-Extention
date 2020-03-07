chrome.storage.sync.get(['todo_list'], result => {
	if(result.todo_list instanceof Array){
		result.todo_list.forEach(element => addToList(element))
	}
});

$("ul").on("click","li",function (argument) {
	$(this).toggleClass("check");
});

$("ul").on("click" , "span" ,function(argument) {
	$(this).parent().fadeOut(500,function() {
		$(this).remove();
	});
	argument.stopPropogation();
});

$("input").on("keypress",function (argument) {
	if(argument.which===13){
		element_obj = {
			value : $(this).val(),
			isdone : false
		};
		addToList(element_obj, true, true);
		$(this).val("");
	}
});

/**
 * @function addToList
 * @param  {object} stuff_to_add    {adds a specific stting to to-do list}
 * @param  {boolean} in_the_beninging {By default it is false, if it is set to true, adds to the starting of the list otherwise adds to the end of list}
 * @return {none} {Unfortunately this function returns nothing :)}
 */
function addToList(stuff_to_add, in_the_beninging = false, add_to_localstorage = false) {
	if (add_to_localstorage){
		add_to_local_storage(stuff_to_add);
	}
	if(stuff_to_add.isdone){
		tag_to_add = "<li class='checked'><span> <i class='fa fa-trash'></i> </span>" + stuff_to_add.value + "</li>";
	} else {
		tag_to_add = "<li><span> <i class='fa fa-trash'></i> </span>" + stuff_to_add.value + "</li>";
	}
	if (in_the_beninging){
		$('ul').prepend(tag_to_add);
	} else {
		$('ul').append(tag_to_add);
	}
}

function add_to_local_storage(stuff_to_add) {
		chrome.storage.sync.get(['todo_list'], result => {
			todo_arr = (result.todo_list instanceof Array)? result.todo_list : [];
			todo_arr.unshift(stuff_to_add);
			chrome.storage.sync.set({todo_list: todo_arr});
		});
}