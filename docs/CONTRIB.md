# Contributing Guide

**Last Updated:** 2026-01-25

マリオカートワールド ショートカット動画集サイトへのコントリビューションガイドです。

## 目次

1. [開発環境のセットアップ](#開発環境のセットアップ)
2. [利用可能なスクリプト](#利用可能なスクリプト)
3. [開発ワークフロー](#開発ワークフロー)
4. [テスト手順](#テスト手順)
5. [コードスタイル](#コードスタイル)
6. [プルリクエストの作成](#プルリクエストの作成)

---

## 開発環境のセットアップ

### 必要条件

- Node.js 18.x 以上
- npm 9.x 以上

### インストール手順

```bash
# リポジトリをクローン
git clone <repository-url>
cd mkw-shortcuts

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

### 環境変数

本プロジェクトで使用する環境変数:

| 変数名 | 必須 | 説明 | 例 |
|--------|------|------|-----|
| `DATABASE_URL` | Yes | データベース接続URL | `postgresql://...` |
| `API_KEY` | Yes | APIアクセスキー | `sk-...` |
| `DEBUG` | No | デバッグモード (デフォルト: false) | `true` |

`.env.local` ファイルを作成して設定:

```bash
DATABASE_URL=your_database_url
API_KEY=your_api_key
DEBUG=false
```

---

## 利用可能なスクリプト

| スクリプト | コマンド | 説明 |
|-----------|----------|------|
| `dev` | `npm run dev` | 開発サーバーを起動 (ホットリロード対応) |
| `build` | `npm run build` | 本番用ビルドを生成 |
| `start` | `npm run start` | 本番サーバーを起動 |
| `lint` | `npm run lint` | ESLintでコード品質をチェック |
| `test` | `npm run test` | Vitestでテストを監視モードで実行 |
| `test:run` | `npm run test:run` | テストを1回実行 |
| `test:coverage` | `npm run test:coverage` | カバレッジレポート付きでテスト実行 |

### スクリプト使用例

```bash
# 開発中
npm run dev          # 開発サーバー起動
npm run test         # テストを監視モードで実行

# コミット前
npm run lint         # リントチェック
npm run test:run     # テスト実行

# デプロイ前
npm run build        # ビルド確認
npm run test:coverage # カバレッジ確認 (80%以上必須)
```

---

## 開発ワークフロー

### 1. ブランチ作成

```bash
# 最新のmainから分岐
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
```

### 2. TDD (テスト駆動開発) フロー

本プロジェクトはTDDを採用しています:

1. **RED** - 失敗するテストを書く
2. **GREEN** - テストが通る最小限の実装を書く
3. **REFACTOR** - コードを改善する

```bash
# テストファイルを作成
# src/lib/yourFeature.test.ts

# テストを監視モードで実行
npm run test

# テストが失敗することを確認 (RED)
# 実装を追加 (GREEN)
# リファクタリング (REFACTOR)
```

### 3. Claude Code コマンド

開発支援に以下のコマンドを活用:

| コマンド | 説明 |
|----------|------|
| `/tdd` | TDD開発ワークフローを開始 |
| `/plan` | 実装計画を作成 |
| `/code-review` | コードレビューを実行 |
| `/build-fix` | ビルドエラーを修正 |

---

## テスト手順

### テストの実行

```bash
# 監視モード (開発中に推奨)
npm run test

# 単発実行 (CI/CD向け)
npm run test:run

# カバレッジ付き実行
npm run test:coverage
```

### テストファイルの配置

テストファイルは対象ファイルと同じディレクトリに配置:

```
src/
  lib/
    data.ts
    data.test.ts      # data.ts のテスト
    schemas.ts
    schemas.test.ts   # schemas.ts のテスト
```

### テストの書き方

```typescript
import { describe, it, expect } from 'vitest';
import { yourFunction } from './yourModule';

describe('yourFunction', () => {
  it('should return expected result', () => {
    const result = yourFunction('input');
    expect(result).toBe('expected');
  });

  it('should handle edge cases', () => {
    expect(() => yourFunction(null)).toThrow();
  });
});
```

### カバレッジ要件

- 最低カバレッジ: **80%**
- ユーティリティ関数: ユニットテスト必須
- APIエンドポイント: 統合テスト推奨
- クリティカルフロー: E2Eテスト推奨

---

## コードスタイル

### 基本原則

1. **イミュータビリティ** - オブジェクトや配列を変更しない
2. **小さなファイル** - 1ファイル200-400行、最大800行
3. **高凝集・低結合** - 機能ごとにモジュール分割
4. **TypeScript strict** - 厳格な型チェック

### 良い例・悪い例

```typescript
// BAD: ミューテーション
function updateUser(user, name) {
  user.name = name;  // NG: 直接変更
  return user;
}

// GOOD: イミュータビリティ
function updateUser(user, name) {
  return {
    ...user,
    name
  };
}
```

### 禁止事項

- `console.log` を本番コードに残さない
- ハードコードされた秘密情報
- `any` 型の乱用
- 絵文字の使用 (コード・コメント・ドキュメント)

---

## プルリクエストの作成

### コミットメッセージ

Conventional Commits形式を使用:

```
<type>: <description>

[optional body]
```

**Types:**
- `feat:` - 新機能
- `fix:` - バグ修正
- `refactor:` - リファクタリング
- `docs:` - ドキュメント更新
- `test:` - テスト追加・修正
- `chore:` - その他の変更
- `perf:` - パフォーマンス改善
- `ci:` - CI/CD関連

### プルリクエストのチェックリスト

- [ ] テストが全て通る (`npm run test:run`)
- [ ] リントエラーがない (`npm run lint`)
- [ ] カバレッジ80%以上 (`npm run test:coverage`)
- [ ] ビルドが成功する (`npm run build`)
- [ ] コードレビュー済み
- [ ] ドキュメント更新済み (必要な場合)

### PRテンプレート

```markdown
## Summary
変更内容の要約

## Changes
- 変更点1
- 変更点2

## Test Plan
- [ ] テスト項目1
- [ ] テスト項目2

## Related Issues
#123
```

---

## 質問・サポート

不明点がある場合は、Issueを作成してください。
