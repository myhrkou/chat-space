# ChatspaceDB設計
## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar|null: false|
|email|midiumtext|null: false,　unique: true|
### Association
- has_many :groups_users
- has_many :group, through: :groups_users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|varchar|null: false|
### Association
- has_many :groups_users
- has_many :user, through: :groups_users

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
|comment|varchar|null: false|
|image|mediumblob||
|time|midiumtext|null: false|
|groups_users_id|integer|null: false|
### Association
- belongs_to :post


