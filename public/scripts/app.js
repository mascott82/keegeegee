// Client facing scripts here

$(function() {
  $('#searchForm').on('submit', function(event) {
    event.preventDefault();
    $('#feedsList').empty();
    $.post('/api/search', $('#searchForm').serialize())
      .done(function(data) {
        data.forEach(element => {
          const cardBody = `
            <div class="card mb-3">
              <div class="card-body">
                <img src="${element.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.description}</p>
                  <div id="btn-group" class="btn-group" role="group" aria-label="Basic example">
                    <a href="#" class="btn btn-success" id="isFavourite">Mark as my favourite</a>
                    <a href="#" class="btn btn-primary" id="msgBtn">Leave a message</a>
                    <a href="#" class="btn btn-warning" id="isSold">Mark as sold</a>
                    <a href="#" class="btn btn-danger" id="delBtn">Delete</a>
                  </div>
                </div>
              </div>
            </div>
          `;

          $('#feedsList').append(cardBody);
        });
      });
  });



});
