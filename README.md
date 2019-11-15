# sample-kintone-webpack

複数のアプリの Build ができます。

## 利用方法

### 事前準備

1. https://nodejs.org/ でインストーラーをダウンロードして node.js をインストールします。インストールすると npm コマンドなどが使えるようになります。
1. コマンドラインで `npm install` と入力し実行します。package.json で定義されている依存ライブラリがインストールされます。

### Build 方法

1. Build する前に、事前に `npm run lint` で構文チェックを行いましょう。エラーがでた場合はエラーログに従いファイルを直していくか、自動で直せるものは、 `npm run fix` で修正することができます。
1. `npm run build` と入力すると、JavaScript が Build され、dist ディレクトリに出力されます。
