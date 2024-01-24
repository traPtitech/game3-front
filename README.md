<img src="/public/favicon.svg" align="right" width="250" alt="game3 logo"/>

# game3-front

[Nuxt 3](https://nuxt.com/docs/getting-started/introduction)を使用して作成しています。

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

`http://localhost:3000`で開発サーバーが起動します。

```bash
pnpm run dev
```

## 本番環境のビルド

本番環境向けにビルドします。NeoShowcaseのデプロイ時に実行する必要があります。

```bash
pnpm run build
```

ローカルで本番環境のビルドを確認する場合は以下のコマンドを実行します。

```bash
pnpm run preview
```

[deployment documentation](https://nuxt.com/docs/getting-started/deployment)も参照してください。

## APIクライアントの生成

バックエンドの[OpenAPI](https://github.com/traPtitech/game3-back/blob/main/docs/openapi.yaml)に変更があった場合は、APIクライアントを再生成する必要があります。
[openapi-generator-cli](https://github.com/OpenAPITools/openapi-generator-cli)を使用しています。
次のコマンドを実行すると、`src/lib/api`以下にAPIクライアントが生成されます。**実行にはDockerが必要です**。

```bash
pnpm run gen:api-client
```

## 構成

基本的には[Nuxt 3の標準ディレクトリ構成](https://nuxt.com/docs/guide/directory-structure)に従っています。

### ページの作成

サイト内のページは

- `src/pages`以下にvueファイルとして配置
- `src/content`以下にMarkdownファイルとして配置

されています。いずれの場合でも、フォルダ/ファイル名がURLになります。(例: `src/pages/entry/register.vue` → `/entry/register`, `src/content/event/17th/index.md` → `/event/17th`)

Markdownファイル内で画像を使用する場合、画像ファイルは`src/public`以下に配置してください。
例えば画像ファイルを`src/public/img/content/17th/map.png`に配置した場合、Markdown内では`![地図](/img/content/17th/map.png)`のパスで参照できます(`src/public`は不要)。
