// Client facing scripts here

$(function() {

  const buttonEventHandler = () => {
    $('#feedsList .btn-group :button').on('click', function(event) {

      const feedId = $(event.currentTarget).val();
      const btnName = $(event.currentTarget).text();
      const btnId = $(event.currentTarget).prop("id");
      const cardBoxId = $(event.currentTarget).parent().parent().parent().parent().prop("id");

      if (btnId.startsWith('fav_')) {
        console.log("fav");
      }

      if (btnId.startsWith('msg_')) {
        console.log("msg");
      }

      if (btnId.startsWith('sold_')) {
        console.log("sold");
        $.post('/api/feeds/:id', { feedId: feedId })
          .done(function(res) {
            if (res.message === 1) {
              $('#sold_' + feedId).prop('disabled', true);
            }
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
          });
      }

      if (btnId.startsWith('del_')) {
        $.post('/api/feeds/:id/delete', { feedId: feedId })
          .done(function(res) {
            if (res.message === 1) {
              $('#' + cardBoxId).slideUp();
            }
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
          });
      }

    });

  }

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
                  <button type="button" class="btn btn-success" value="${element.id}">Mark as my favourite</button>
                  <button type="button" class="btn btn-primary" value="${element.id}">Leave a message</button>
                  <button type="button" class="btn btn-warning" value="${element.id}">Mark as sold</button>
                  <button type="button" class="btn btn-danger" value="${element.id}">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          `;

          $('#feedsList').append(cardBody);
          buttonEventHandler();
        });
      });
  });

  buttonEventHandler();
});
