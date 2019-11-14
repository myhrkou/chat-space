$(function () {
  function buildmessage(message) {
    var html = `<div class="right__main--post">
                  <div class="right__main--post--upper">
                    <b class="right__main--post--upper--name">
                      ${message.user}
                    </b>
                    <div class="right__main--post--upper--time">
                      ${message.time}
                    </div>
                  </div>
                  <div class="right__main--post--comment">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>
                    <img src="${message.image}" width="200px" height="auto"/>
                  </div>
                </div>
            `
    var html1 = `<div class="right__main--post">
            <div class="right__main--post--upper">
              <b class="right__main--post--upper--name">
                ${message.user}
              </b>
              <div class="right__main--post--upper--time">
                ${message.time}
              </div>
            </div>
            <div class="right__main--post--comment">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>
      `
      
    return message.image?html:html1
  }
  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(function (message) {
        var html = buildmessage(message);
        if(message.content==null){
          alert("メッセージを入力してください");
        }else{
        $('.right__main').append(html);
        }
        $('#new_message')[0].reset();
        $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight });
        $(".right__footer--submit").removeAttr("disabled");
      })
      .fail(function (){
        $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight });
        alert("メッセージの送信に失敗しました");
        $(".right__footer--submit").removeAttr("disabled");
      })
  });
});