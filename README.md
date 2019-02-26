# nGraphQL

GraphQL Query, Mutate, SubScription Sample on Apollo Server + Express + Angular

サーバーサイドを Apollo Server + Express、クライアントサイドを Angular + Apollo Client で実装した GraphQL のサンプルです。

詳しい構築手順は → のページをご覧ください。

技術検証が目的のため、テストコードなどはゼロです。すいません。。。

# ざっくり構築手順

1. Angular プロジェクトを生成

```
$ ng new nGraphQL
$ cd nGraphQL
```

2. 以下のコマンドでパッケージをインストール。実際の依存パッケージ、スクリプトなどは package.json をご確認ください。

```
$ npm install -S graphql apollo-server-express apollo-client apollo-angular apollo-angular-link-http apollo-cache-inmemory apollo-link-ws
```

3. サーバー用プログラム置き場とファイルなどを生成し実装

```
$ mkdir server && cd server
```

4. tsconfig.json を修正
5. `ng server` で Apollo + Express のサーバーが起動
6. クライアント以下の実装を src/app/以下で行う
7. Angular クライアント用に src/tsconfig.app.json を修正
8. `ng start` で Angular のサーバが起動
9. ブラウザから http://localhost:4200 を開き、動作確認を行う
