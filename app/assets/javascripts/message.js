$(function(){
  function buildHTML(message){
    if (message.image){
      var html = 
    `<div class="message-list" data-message-id= ${message.id}>
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
        <img class = "message-list_image" src = ${message.image} >
      </div>
     </div>
    </div>`
      }else{
        var html =
      `<div class = "message-list" data-message-id= ${message.id}>
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
        </div>
      </div>`
      } ;
      return html;
    };
    
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
  });
      var reloadMessages = function() {
        if (document.location.href.match(/\/groups\/\d+\/messages/)) {
         var last_message_id = $('.message-list:last').data("message-id");
        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
      })
      .done(function(messages) {
          if (messages.length !== 0){
            var insertHTML = '';
            
            $.each(messages, function(i, message) {
              insertHTML += buildHTML(message)
            });
            $('.message').append(insertHTML);
            $('.message').animate({ scrollTop: $('.message')[0].scrollHeight});
          }
          
        })
        .fail(function() {
          alert('error');
        });
      }
    };
  setInterval(reloadMessages, 7000);
});