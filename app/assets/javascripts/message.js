$(function(){
  function buildHTML(message){
    if (message.image){
      var html = 
     `
        <div class = "message-list__group">
          <div class = "message-list__user-name">
            ${message.user_name}
          </div>
          <div class = "message-list__date">
            ${message.created_at}
          </div>
        </div>
        <div class = "message-list__user-message">
          <p class = "message-list_user-message__content">
            ${message.content}
          </p>
        </div>
        <img src = ${message.image} >
      </div>`
    return html;
  }else{
    var html =
    `<div class = "message-list">
        <div class = "message-list__group">
          <div class = "message-list__user-name">
            ${message.user_name}
          </div>
          <div class = "message-list__date">
            ${message.created_at}
          </div>
        </div>
        <div class = "message-list__user-message">
          <p class = "message-list_user-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
    return html;
   }
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
      $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
      $('form')[0].reset();
      $('.form-input__submit-btn').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
  })
})