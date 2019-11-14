json.user @message.user.name
json.time Time.now.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.image @message.image.url