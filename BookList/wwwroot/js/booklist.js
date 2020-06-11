var dataTable;

$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $('#DT_load').DataTable({
        "ajax": {
            "url": "/api/book",
            "type": "GET",
            "datatype": "json"
        },
        "columns": [
            { "data": "name", "width": "20%" },
            { "data": "author", "width": "20%" },
            { "data": "isbn", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                            <a href="/BList/Upsert?id=${data}" class='btn btn-success text-white style='cursor:pointer; width:100px;'>
                                Edit
                            </a>
                            &nbsp;
                            <a class='btn btn-danger text-white' style='cursor:pointer; width:100px;'
                              onclick=Delete('/api/book?id='+${data})>
                                Delete
                            </a>
                            </div>`;
                }, "width": "30%"
            }
        ],
        "language": {
            "emtyTable": "no data found"
        },
        "width": "100%"
    });
}


function Delete(url) {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,   //เป็นปุ่ม cancel เป็นการเรียกใช้ของ sweet
        dangerMode: true
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message); //data.เหมือนไปเรียกจาก controller ใส่ data มันก็ refresh หน้าใหม่
                        dataTable.ajax.reload(); 
                    }
                    else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    });
}

