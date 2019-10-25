# ChatspaceDB設計
## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|midiumtext|null: false,　unique: true|
### Association
- has_many :groups_users
- has_many :group, through: :groups_users
- has_many :post

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :groups_users
- has_many :user, through: :groups_users
- has_many :post

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
- has_many :post

## postテーブル
|Column|Type|Options|
|------|----|-------|
|comment|string|null: false|
|image|text||
### Association
- belongs_to :user
- belongs_to :group