<template>
  <div>
    <h2>第n回 GAME<sup>3</sup>展示作品登録</h2>
    <div>
      申し込み対象
      <p>
        第n回 GAME<sup>3</sup>
        2023年X月Y日(Z曜日) 東京工業大学 大岡山キャンパス
      </p>
    </div>
    <form>
      <label>
        ブース展示者名
        <input type="text" required>
      </label>
      <label>
        所属団体名
        <input type="text">
      </label>
      <label>
        参加予定人数
        <input type="number" required>
      </label>
      <label>
        作品タイトル
        <input type="text" required>
      </label>
      <label>
        作品ジャンル
        <input type="text">
      </label>
      <label>
        開発環境
        <input type="text">
      </label>
      <label>
        作品の説明
        <input type="text">
      </label>
      <label>
        紹介画像
        <input type="file" accept="image/*">
      </label>
      <label>
        X アカウント
        <input type="text">
      </label>
      <label>
        WebサイトURL
        <input type="text">
      </label>
    </form>
  </div>
</template>
