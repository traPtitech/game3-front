# 開発に関わるメモ

## 構成

基本的には[Nuxt 3の標準ディレクトリ構成](https://nuxt.com/docs/guide/directory-structure)に従っています。

### ページの作成

サイト内のページは

- `/pages`以下にvueファイルとして配置
- `/content`以下にMarkdownファイルとして配置

されています。いずれの場合でも、フォルダ/ファイル名がURLになります。
(例: `/pages/entry/register.vue` → `/entry/register`, `/content/event/17th/index.md` → `/event/17th`)

#### `/pages`

see: <https://nuxt.com/docs/guide/directory-structure/pages>

`/pages`以下にvueファイルを配置することで、そのファイルがページとして認識されます。複雑なロジックを持つページを作成したい場合に向いています。

#### `/content`

see:

- <https://nuxt.com/docs/guide/directory-structure/content>
- <https://content.nuxt.com>

`/content`以下にMarkdownファイルを配置することで、そのファイルがページとして認識されます。テキスト/画像のみシンプルなページを作成したい場合に向いています。

お問い合わせページ(`/content/contact.md`)やプライバシーポリシーページ(`/content/about-google-analytics.md`)などが該当します。

> [!IMPORTANT]
> Markdownファイル内で画像を使用する場合、画像ファイルは`/public`以下に配置してください。
> 例えば画像ファイルを`/public/img/content/17th/map.png`に配置した場合、Markdown内では`![地図](/img/content/17th/map.png)`のパスで参照できます(`/public`部分は不要)。

> [!TIP]
> `/components/content`以下に作成されたVueコンポーネントであれば、Markdownファイル内でも使用できます。例えばイベント開催概要ページでのゲーム一覧表示には`/components/content/ContentEntryList.vue`を使用しています。
> `<ContentEntryList slug="18th"></ContentEntryList>`のように記述することで使用できます。
> see: <https://content.nuxt.com/usage/markdown#vue-components>>

> [!TIP]
> Markdownファイルの表示に使用される`<h1>`や`<p>`をカスタマイズしたい場合、`/components/content/XXX.vue`を作成してください。どのようなコンポーネントが使えるかは<https://github.com/nuxt-modules/mdc/tree/main/src/runtime/components/prose>を参照してください。
> see: <https://content.nuxt.com/usage/markdown#prose-components>, <https://content.nuxt.com/components/prose>

<details>
<summary><code>/content</code>以下のMarkdownファイルの表示の仕組み</summary>

例えば`/event/10th/report`へのページアクセスが発生すると、`/pages/event/10th/report.vue`の存在が確かめられます。このファイルが存在しなかった場合、次に[Catch-all Route](https://nuxt.com/docs/guide/directory-structure/pages#catch-all-route)となっている`/pages/[...slug].vue`が読み込まれます。このファイル内で`nuxt/content`によるMarkdownファイルの読み込みを行い、その内容を表示しています。

</details>
