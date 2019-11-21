$(function () {
  function builduser(user) {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
    $("#user-search-result").append(html)
  }
  function builduser2() {
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>
               `
    $("#user-search-result").append(html)
  }
  function adduser(id, name) {
    var html = `
                <div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>
                `
    $("#chat-group-users.js-add-user").append(html)
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
 
  $("#user-search-field").on("keyup", function () {
    let input = $("#user-search-field").val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input },
      dataType: 'json',
    })
      .done(function (users) {
        $("#user-search-result").empty();
        if (users.length != 0) {
          users.forEach(user => {
            builduser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          builduser2();
        }
      })
      .fail(function () {
        alert("通信エラーです。ユーザーが表示できません。");
      });
    $(document).on('click', ".chat-group-user__btn--add", function () {
      var id = $(this).data('user-id');
      var name = $(this).data('user-name');
      $(this).parent().remove();
      adduser(id, name);
      addMember(id);
    })
    $(document).on('click', ".js-remove-btn", function () {
      $(this).parent().remove();
    })
  });
});