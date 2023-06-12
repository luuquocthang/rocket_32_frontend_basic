var addStudentForm = $("#addStudentForm");
var sumRow = $("#tbStudent tr:last-child");

function onDelete(event) {
    // alert("deleted")
    console.log(event);
    var currentBtn = event.target;
    var td = currentBtn.parentNode;
    var tr = td.parentNode;

    console.log(tr.innerHTML);
    tbStudent.innerHTML = tbStudent.innerHTML.replace(tr.innerHTML, "");
    console.log(tbStudent.innerHTML);
}

var id = 4;
function addStudentFormSubmitHandle(event) {
    id++;
    // alert("submit");
    event.preventDefault();
    callApi();


}


function callApi() {
    $.ajax({
        method: "get",
        dataType: "json",
        data: addStudentForm.serialize(),
        url: "http://localhost:3006/students",
        beforeSend: function (xhr) {
            alert("beforeSend")
        }
    }).done(function () {
        alert("success");
        let value = addStudentForm.serialize(); //'name=Luu%20Thang&date=2023-06-12&des=ffff'
        let valueArr = value.split("&"); //[name=Luu%20Thang, date=2023-06-12, des=ffff]
        var tds = '';
        for (const ele of valueArr) {
            tds += `<td>${decodeURI(ele.split("=")[1])}</td>`; //[name, Luu%20Thang]
        }
        var row = `
        <tr>
            <td>${id}</td>
            ${tds}
            <td><button onclick="onDelete(event)">Del</button></td>
        </tr>
        `
        var sumEle = sumRow.children().last();
        var sumValue = Number(sumEle.html());
        sumEle.html(sumValue + 1)
        sumRow.before(row);
    }).fail(function () {
        alert("error");
    })
}
addStudentForm.on("submit", addStudentFormSubmitHandle);