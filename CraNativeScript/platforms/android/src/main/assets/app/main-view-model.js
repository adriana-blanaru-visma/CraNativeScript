var Observable = require("data/observable").Observable;
 var http = require("http");
 

function createViewModel() {
    var viewModel = new Observable();
    viewModel.message = "";
    
	viewModel.insertCR = function() {
	
var dataObj = {
				userName : viewModel.UserName,
				managerName :viewModel.ManagerName,
				productName :viewModel.ProductName,
				productPrice: viewModel.ProductPrice,
				id:1
		};	
		var arr = [];
		arr.push(dataObj);
		
	http.request({
    url: "http://10.11.1.68:3579/cra/api/cr",
    method: "POST",
    headers: { "Content-Type": "application/json","Accept":"application/json","Authorization" :"TenantId 96444A56-C549-4911-A437-97A1C6E0300A" },
    content: JSON.stringify(arr)
}).then(function (response) {
   viewModel.set("message", "Success!");
}, function (e) {
    viewModel.set("message", "Error!");
});

	}
	
	viewModel.getAllCrs = function() {
		http.request({ url: "http://10.11.1.68:3579/cra/api/cr", method: "GET", headers: { "Accept":"application/json"} }).then(function (response) {
    var objArr = response.content.toJSON();
	var aa=[];
  for(var i=0;i<objArr.length;i++){
	  aa.push(objArr[i].userName + " "+objArr[i].managerName+" "+objArr[i].productName+" "+objArr[i].productPrice);
  }
   viewModel.set("crs",aa);
   console.dir(aa);
}, function (e) {
     viewModel.set("message", "Error!");
});
	}
    return viewModel;
}

exports.createViewModel = createViewModel;