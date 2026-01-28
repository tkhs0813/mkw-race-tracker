# Runbook

**Last Updated:** 2026-01-25

マリオカートワールド ショートカット動画集サイトの運用マニュアルです。

## 目次

1. [デプロイ手順](#デプロイ手順)
2. [監視とアラート](#監視とアラート)
3. [よくある問題と解決策](#よくある問題と解決策)
4. [ロールバック手順](#ロールバック手順)
5. [緊急対応フロー](#緊急対応フロー)

---

## デプロイ手順

### 本番環境: Vercel

本プロジェクトはVercelでホスティングされています。

### 自動デプロイ (推奨)

1. **mainブランチへマージ**
   ```bash
   git checkout main
   git merge feature/your-branch
   git push origin main
   ```

2. **Vercelが自動デプロイを実行**
   - ビルド: `next build`
   - 本番URLにデプロイ

3. **デプロイ完了を確認**
   - Vercel Dashboardでステータス確認
   - 本番サイトで動作確認

### 手動デプロイ

```bash
# Vercel CLIを使用
npm install -g vercel

# プレビューデプロイ
vercel

# 本番デプロイ
vercel --prod
```

### デプロイ前チェックリスト

- [ ] 全テストがパス: `npm run test:run`
- [ ] リントエラーなし: `npm run lint`
- [ ] ビルド成功: `npm run build`
- [ ] 環境変数の確認 (Vercel Dashboard)
- [ ] カバレッジ80%以上

### 環境変数の設定 (Vercel)

Vercel Dashboardで以下を設定:

| 変数名 | 環境 | 説明 |
|--------|------|------|
| `DATABASE_URL` | Production, Preview | データベース接続URL |
| `API_KEY` | Production, Preview | APIアクセスキー |
| `DEBUG` | Preview only | デバッグモード |

---

## 監視とアラート

### ヘルスチェック

**エンドポイント:** (実装時に追加)
```
GET /api/health
```

**期待されるレスポンス:**
```json
{
  "status": "healthy",
  "timestamp": "2026-01-25T00:00:00.000Z"
}
```

### 監視項目

| 項目 | 閾値 | アラート条件 |
|------|------|--------------|
| レスポンスタイム | 3秒 | 超過時にアラート |
| エラーレート | 1% | 超過時にアラート |
| 可用性 | 99.9% | 下回った場合アラート |
| ビルド失敗 | - | 失敗時に通知 |

### Vercel Analytics

Vercel Dashboardで確認可能:
- ページビュー
- Web Vitals (LCP, FID, CLS)
- 地域別アクセス
- エラーログ

### ログの確認

```bash
# Vercel CLIでログを確認
vercel logs

# リアルタイムログ
vercel logs --follow

# 特定デプロイのログ
vercel logs <deployment-url>
```

---

## よくある問題と解決策

### 1. ビルドエラー

**症状:** `npm run build` が失敗

**原因と解決策:**

| 原因 | 解決策 |
|------|--------|
| TypeScriptエラー | `npm run lint` で確認、型エラーを修正 |
| 依存関係の問題 | `rm -rf node_modules && npm install` |
| 環境変数不足 | 必要な環境変数を設定 |

**デバッグ手順:**
```bash
# ビルドログを詳細に確認
npm run build 2>&1 | tee build.log

# build-error-resolver エージェントを使用
# /build-fix コマンドを実行
```

### 2. テスト失敗

**症状:** `npm run test:run` でテストが失敗

**解決策:**
```bash
# 詳細なエラーを確認
npm run test:run -- --reporter=verbose

# 特定のテストファイルを実行
npm run test:run -- src/lib/data.test.ts

# テストキャッシュをクリア
rm -rf node_modules/.vitest
```

### 3. 開発サーバーが起動しない

**症状:** `npm run dev` でエラー

**チェック項目:**
1. ポート3000が使用中でないか
2. node_modulesが正しくインストールされているか
3. .nextキャッシュが破損していないか

**解決策:**
```bash
# ポート確認
lsof -i :3000

# クリーンスタート
rm -rf .next node_modules
npm install
npm run dev
```

### 4. 本番環境で404エラー

**症状:** デプロイ後にページが表示されない

**チェック項目:**
1. 動的ルートのパラメータ
2. generateStaticParamsの設定
3. ビルド出力の確認

**解決策:**
```bash
# ビルド出力を確認
npm run build
ls -la .next/server/app
```

### 5. 環境変数が読み込まれない

**症状:** `process.env.XXX` が undefined

**チェック項目:**
1. Vercel Dashboardで変数が設定されているか
2. 変数名のプレフィックス (NEXT_PUBLIC_ が必要か)
3. 再デプロイが必要

---

## ロールバック手順

### Vercelでのロールバック

1. **Vercel Dashboardにアクセス**
   - プロジェクト選択
   - Deploymentsタブを開く

2. **正常なデプロイを選択**
   - 問題発生前のデプロイを見つける
   - 右端の「...」メニューをクリック

3. **Promote to Production**
   - 「Promote to Production」を選択
   - 確認ダイアログでPromoteをクリック

### CLIでのロールバック

```bash
# デプロイ一覧を確認
vercel list

# 特定のデプロイを本番に昇格
vercel promote <deployment-url>
```

### Gitでのロールバック

```bash
# 直前のコミットに戻す
git revert HEAD
git push origin main

# 特定のコミットに戻す
git revert <commit-hash>
git push origin main
```

**注意:** `git reset --hard` は履歴を書き換えるため、mainブランチでは使用しない。

---

## 緊急対応フロー

### 障害レベル定義

| レベル | 定義 | 対応時間 |
|--------|------|----------|
| Critical | サイト全体がダウン | 即時対応 |
| High | 主要機能が利用不可 | 1時間以内 |
| Medium | 一部機能に影響 | 4時間以内 |
| Low | 軽微な問題 | 次営業日 |

### 緊急対応手順

#### Critical/High レベル

1. **状況確認** (5分以内)
   ```bash
   # ヘルスチェック
   curl https://your-domain.vercel.app/api/health

   # Vercelステータス確認
   # https://www.vercel-status.com/
   ```

2. **原因特定** (10分以内)
   - Vercel Dashboardでエラーログ確認
   - 最新デプロイの変更内容確認

3. **対応実行**
   - 原因が最新デプロイの場合: ロールバック
   - インフラ問題の場合: Vercelサポートに連絡

4. **復旧確認**
   - ヘルスチェック再実行
   - 主要機能の動作確認

5. **事後対応**
   - インシデントレポート作成
   - 再発防止策の検討

### エスカレーション

| 経過時間 | アクション |
|----------|------------|
| 0-15分 | 担当者が対応 |
| 15-30分 | チームリードに報告 |
| 30分以上 | マネージャーに報告 |

---

## 連絡先

| 役割 | 連絡先 |
|------|--------|
| Vercelサポート | https://vercel.com/support |
| Vercelステータス | https://www.vercel-status.com/ |

---

## 付録

### 有用なコマンド一覧

```bash
# ローカル確認
npm run dev          # 開発サーバー
npm run build        # ビルド
npm run start        # 本番サーバー (ローカル)

# テスト
npm run test:run     # テスト実行
npm run test:coverage # カバレッジ確認

# デプロイ
vercel               # プレビュー
vercel --prod        # 本番

# ログ
vercel logs          # ログ確認
vercel logs --follow # リアルタイムログ
```

### チェックリスト: デプロイ後

- [ ] サイトにアクセス可能
- [ ] 主要ページが表示される
- [ ] 動的ルートが動作する
- [ ] エラーが発生していない (ログ確認)
- [ ] パフォーマンスが許容範囲内
