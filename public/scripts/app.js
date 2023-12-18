// Client facing scripts here

$(function() {
  $('#searchForm').on('submit', function(event) {
    event.preventDefault();
    $('#feedsList').empty();
    $.post('/s/search', $('#searchForm').serialize());
  });
});
