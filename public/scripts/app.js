// Client facing scripts here

$(function() {
  const buttonEventHandler = () => {
    $('#feedsList .btn-group :button').on('click', function(event) {
      const feedId = $(event.currentTarget).val();
      const btnId = $(event.currentTarget).prop("id");
      const btnName = $(event.currentTarget).prop("name");
      const cardBoxId = $(event.currentTarget).parent().parent().parent().parent().prop("id");

      if (btnId.startsWith('fav_')) {
        $.post('/api/fav/:id', { feedId: feedId })
          .done(function(res) {
            if (res.message === 1) {
              $('#fav_' + feedId).prop('disabled', true);
            }
          })
          .fail(function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
          });
      }

      if (btnId.startsWith('msg_')) {
        const msgHeader = btnName.split(",");
        const userName = msgHeader[0];
        const toUserId = msgHeader[1];
        const feedId = msgHeader[2];
        const pid = msgHeader[3] ? msgHeader[3] : 0;

        $("#recipient-name").val('@' + userName);
        $('#msgModalLabel').text('New In-App Message');
        $("#msgModal").modal('show');

        $('#msgModalSubmit').on('click', function(event) {
          $.post('/api/msg/new', {
            toUserId: toUserId,
            itemId: feedId,
            content: $("#message-text").val(),
            pid: pid
          })
            .done(function(res) {
              console.log(res.message);
            });

          $("#msgModal").modal('hide');
        });

        // Event handler for hiding the modal and clearing content
        $('#msgModal').on('hide.bs.modal', () => {
          $("#recipient-name").val('');
          $("#message-text").val('');
        });
      }

      if (btnId.startsWith('email_')) {
        const emailAddr = $(event.currentTarget).val();

        const msgHeader = btnName.split(",");
        const userName = msgHeader[0];

        const encodedRecipeName = encodeURIComponent(userName);
        window.location.href = `mailto:${emailAddr}?subject=Subject%20of%20the%20email&body=Recipe%20Name:%20${encodedRecipeName}%0A%0ABody%20of%20the%20email`;
      }

      if (btnId.startsWith('sms_')) {
        const msgHeader = btnName.split(",");
        const userName = msgHeader[0];
        const toUserId = msgHeader[1];
        const feedId = msgHeader[2];
        const pid = msgHeader[3] ? msgHeader[3] : 0;
        const phoneNumber = msgHeader[4];

        $("#recipient-name").val('@' + userName);
        $('#msgModalLabel').text('New Text Message');
        $("#msgModal").modal('show');

        $('#msgModalSubmit').on('click', function(event) {
          $.post('/api/msg/sms', {
            toUserPhoneNumber:  phoneNumber,
            content: $("#message-text").val()
          })
            .done(function(res) {
              console.log(res.message);
            });

          $("#msgModal").modal('hide');
        });

        // Event handler for hiding the modal and clearing content
        $('#msgModal').on('hide.bs.modal', () => {
          $("#recipient-name").val('');
          $("#message-text").val('');
        });
      }

      if (btnId.startsWith('sold_')) {
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

  };

  $('#searchForm').on('submit', function(event) {
    event.preventDefault();
    $('#feedsList').empty();
    $.post('/api/search', $('#searchForm').serialize())
      .done(function(data) {
        data.forEach(element => {
          let cardBody = `
            <div class="card mb-3">
              <div class="card-body">
                <img src="${element.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${element.title}</h5>
                  <p class="card-text">${element.description}</p>
                  <p class="card-text">${element.username}</p>
                  <p class="card-text">${element.email}</p>
                  <p class="card-text">${element.created_at}</p>
                  <div id="btn-group" class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-success" value="${element.id}">Mark as my favourite</button>
                  <button type="button" class="btn btn-primary" value="${element.id}" name="${element.username},${element.user_id},${element.id},${element.pid}" >Leave a message</button>
                  <button type="button" class="btn btn-primary" value="${element.id}" id="email_${element.id}" value="${element.email}" name="${element.username},${element.user_id},${element.id},${element.pid}" >Email me</button>
                  <button type="button" class="btn btn-primary" value="${element.id}" id="sms_${element.id}" name="${element.username},${element.user_id},${element.id},${element.pid},${element.phone_number}">Text me</button>
           `;
          if (!element.isSoldBtnActive) {
            //cardBody += `<button type="button" class="btn btn-warning active" value="${element.id}">Mark as sold</button>`;
          } else {
            cardBody += `<button type="button" class="btn btn-warning" value="${element.id}">Mark as sold</button>`;
          }
          if (!element.isDelBtnActive) {
            //cardBody += `<button type="button" class="btn btn-danger active" value="${element.id}">Delete</button>`;
          } else {
            cardBody += `<button type="button" class="btn btn-danger" value="${element.id}">Delete</button>`;
          }

          cardBody += `
                  </div>
                </div>
              </div>
            </div>
          `;

          console.log(cardBody);

          $('#feedsList').append(cardBody);
          buttonEventHandler();
        });
      });
  });
  buttonEventHandler();

  $('#msgCardBody :button').on('click', (event) => {
    const btnValue = $(event.currentTarget).val();
    const params = btnValue.split(",");
    const toUserId = params[0];
    const pid = params[1];
    const itemId = params[2];
    const toUserName = params[3];

    $("#recipient-name").val('@' + toUserName);
    $("#msgModal").modal('show');

    $('#msgModalSubmit').on('click', function(event) {

      $.post('/api/msg/reply', {
        toUserId: toUserId,
        itemId: itemId,
        pid: pid,
      })
        .done(function(res) {
          if (res.message === 1) {
            console.log("Message sent");
          }
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          console.error('Error:', errorThrown);
        });

      $("#msgModal").modal('hide');
    });

    // Event handler for hiding the modal and clearing content
    $('#msgModal').on('hide.bs.modal', () => {
      $("#recipient-name").val('');
      $("#message-text").val('');
    });
  });
});
