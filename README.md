# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation
## userテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar|null: false|

### Association
- has_many :groups_users

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|name|varchar|null: false|

### Association
- has_many :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|user_id|integer|null: false,foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
- has_many :post

## postテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false|
|comment|varchar|null: false|
|image|mediumblob||
|time|midiumtext|null: false|
|groups_users_id|integer|null: false|

### Association
- belongs_to :post

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

