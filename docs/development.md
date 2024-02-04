# 開発資料

## 開発環境の準備

開発環境を構築するために必要な手順です。一度実行すればOKです。

### 1. Node.jsのインストール

Node.jsをインストールします。すでにインストールされている場合はスキップしてください。

<https://nodejs.org/en>からダウンロードしてインストールします。
LTS版で問題ありません。

インストール後、バージョンを確認します。

```bash
node -v
```

`v21.X.X`のようにバージョンが表示されればOKです。

### 2. pnpmのインストール

本プロジェクトではパッケージマネージャーとしてpnpmを使用しています。
pnpmをインストールします。すでにインストールされている場合はスキップしてください。

corepackを使用してpnpmインストールします。(corepack自体はNode.jsのインストール時に勝手にインストールされています。)

```bash
corepack enable
```

### 3. 依存パッケージのインストール

```bash
pnpm install
```

## 開発サーバーの起動

```bash
pnpm run dev
```

`http://localhost:3000`で開発サーバーが起動します。

## APIクライアントの生成

バックエンドの[OpenAPI](https://github.com/traPtitech/game3-back/blob/main/docs/openapi.yaml)に変更があった場合は、APIクライアントを再生成する必要があります。
[openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli)を使用しています。
次のコマンドを実行すると、`src/lib/api`以下にAPIクライアントが生成されます。**実行にはDockerが必要です**。

```bash
pnpm run gen:api-client
```

## APIモックの作成

本アプリの開発環境では[Mock Service Worker](https://mswjs.io/)を使用してAPIモックを作成しています。

OpenAPI定義からモックを自動生成する場合は、次のコマンドを実行します。`src/mocks/handlers.ts`が上書きされます。この自動生成には[zoubingwu/msw-auto-mock](https://github.com/zoubingwu/msw-auto-mock)を使用しています。

```bash
pnpm run gen:api-mock
```

手動でモックを作成する場合は、`src/mocks/handlers.ts`を編集してください。
