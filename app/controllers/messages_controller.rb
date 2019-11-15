class MessagesController < ApplicationController
  before_action :set_group
  def index
    # Time.zone="Tokyo"
    @message=Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    # Time.zone="Tokyo"
    @message = @group.messages.new(message_params)
    @message.save
    respond_to do |format|
      format.html { redirect_to group_messages_path, notice: "メッセージを送信しました" }
      format.json
    end
  end

  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
