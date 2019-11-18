$(function () {
  var buildMessageHTML = function (message) {
    if (message.content && message.image.url) {
      //data-message_idが反映されるようにしている
      var html = `<div class="right__main--post" data-message-id=` + message.id + `>` +
        `<div class="right__main--post--upper">` +
        `<div class="right__main--post--upper--name">` +
        message.user_name +
        `</div>` +
        `<div class="right__main--post--upper--time">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="right__main--post--comment">` +
        `<p class="lower-message__content">` +
        message.content +
        `</p>` +
        `<img src="` + message.image.url + `" class="lower-message__image" " width="200px" height="auto"/>` +
        `</div>` +
        `</div>`
    } else if (message.content) {
      //同様に、data-message_idが反映されるようにしている
      var html = `<div class="right__main--post" data-message-id=` + message.id + `>` +
        `<div class="right__main--post--upper">` +
        `<div class="right__main--post--upper--name">` +
        message.user_name +
        `</div>` +
        `<div class="right__main--post--upper--time">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="right__main--post--comment">` +
        `<p class="lower-message__content">` +
        message.content +
        `</p>` +
        `</div>` +
        `</div>`
    } else if (message.image.url) {
      //同様に、data-message_idが反映されるようにしている
      var html = `<div class="right__main--post" data-message-id=` + message.id + `>` +
        `<div class="right__main--post--upper">` +
        `<div class="right__main--post--upper--name">` +
        message.user_name +
        `</div>` +
        `<div class="right__main--post--upper--time">` +
        message.created_at +
        `</div>` +
        `</div>` +
        `<div class="right__main--post--comment">` +
        `<img src="` + message.image.url + `" class="lower-message__image" " width="200px" height="auto" />` +
        `</div>` +
        `</div>`
    };
    return html;
  };
  var reloadMessages = function () {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    const last_message_id = $('.right__main--post').last().data("message-id");
    console.log(last_message_id);
    url = location.href.split("/");
    url.splice(5, 0, "api");
    url = url.join("/");
    $.ajax({
      url: url,
      type: 'get',
      dataType: 'json',
      data: { id: last_message_id }
    })
      .done(function (messages) {
        console.log("メッセージ配列" + messages);
        //追加するHTMLの入れ物を作る
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(message => {
          var htmlbox = buildMessageHTML(message);
          insertHTML += htmlbox;
        });
        //メッセージが入ったHTMLを取得
        var html = insertHTML;
        //メッセージを追加
        $('.right__main').append(html);
        $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight });
      })
      .fail(function () {
        console.log('error');
      })
  };
  function buildmessage(message, image) {
    var html = `<div class="right__main--post" data-message-id="${message.id}">
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
                      ${image}
                  </div>
                </div>
            `
    return html
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
        if (message.content == null && message.image == null) {
          alert("メッセージを入力してください");
        } else {
          var image = message.image.url ? `<img src="` + message.image.url + `" width="200px" height="auto"/>` : ""
          var html = buildmessage(message, image);
        }
        $('.right__main').append(html);
        $('#new_message')[0].reset();
        $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight });
        $(".right__footer--submit").removeAttr("disabled");
      })
      .fail(function () {
        $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight });
        alert("メッセージの送信に失敗しました");
        $(".right__footer--submit").removeAttr("disabled");
      })
  });
  $('.right__main').animate({ scrollTop: $('.right__main')[0].scrollHeight });
  if (location.href.indexOf("http://localhost:3000/groups/")===0) {
    setInterval(reloadMessages, 7000);
  }
});