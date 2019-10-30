import $ from 'jquery';

$(document).ready(function(){
    $('#my-table').DataTable( {
        scrollY:        500,
        scrollX:        true,
        scrollCollapse: true,
        paging:         false,
        autoWidth:      false,
        fixedColumns:   {
          leftColumns: 1
        },
        columnDefs: [
          { "width": "300px", "targets": [ 0 ] },
          { "width": "150px", "class": "commitment", "targets": [ '_all' ] }
        ],
      
    } );
});