// Client facing scripts here

$(function() {
  const buttonEventHandler = () => {
    $('#feedsList .btn-group :button').on('click', function(event) {
      const feedId = $(event.currentTarget).val();
      const btnId = $(event.currentTarget).prop("id");
      const btnName = $(event.currentTarget).prop("name");
      const cardBoxId = $(event.currentTarget).parent().parent().parent().parent().prop("id");

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
      // if (btnId.startsWith('email_')) {
      //   const emailAddr = $(event.currentTarget).val();

      //   const msgHeader = btnName.split(",");
      //   const userName = msgHeader[0];

      //   const encodedRecipeName = encodeURIComponent(userName);
      //   window.location.href = `mailto:${emailAddr}?subject=Subject%20of%20the%20email&body=Recipe%20Name:%20${encodedRecipeName}%0A%0ABody%20of%20the%20email`;
      // }

      // if (btnId.startsWith('sms_')) {
      //   const msgHeader = btnName.split(",");
      //   const userName = msgHeader[0];
      //   const toUserId = msgHeader[1];
      //   const feedId = msgHeader[2];
      //   const pid = msgHeader[3] ? msgHeader[3] : 0;
      //   const phoneNumber = msgHeader[4];

      //   $("#recipient-name").val('@' + userName);
      //   $('#msgModalLabel').text('New Text Message');
      //   $("#msgModal").modal('show');

      //   $('#msgModalSubmit').on('click', function(event) {
      //     $.post('/api/msg/sms', {
      //       toUserPhoneNumber:  phoneNumber,
      //       content: $("#message-text").val()
      //     })
      //       .done(function(res) {
      //         console.log(res.message);
      //       });

      //     $("#msgModal").modal('hide');
      //   });

      //   // Event handler for hiding the modal and clearing content
      //   $('#msgModal').on('hide.bs.modal', () => {
      //     $("#recipient-name").val('');
      //     $("#message-text").val('');
      //   });
      // }
    });
  };

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
