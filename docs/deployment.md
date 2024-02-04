# デプロイ資料

本番環境向けにビルドします。NeoShowcaseでのデプロイ時に実行する必要があります。

## ビルド

```bash
corepack enable
pnpm install
pnpm build
```

上記コマンドを実行すると、`.output`ディレクトリにビルドされたファイルが出力されます。

ローカルで本番環境のビルドを確認する場合は以下のコマンドを実行します。

```bash
pnpm run preview
```

## サーバーの起動

```bash
pnpm run start
```

上記コマンドを実行すると、`.output`ディレクトリのファイルを使って本番環境のサーバーが3000番ポートで起動します。

[deployment documentation](https://nuxt.com/docs/getting-started/deployment)も参照してください。
