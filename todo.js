/* 行前代辦清單資料。item.id 上線後不可更改，會作為 localStorage key 的一部分。 */
var todoGroups = [
  {
    id: 'docs', title: '證件與文件', due: '出發前兩週',
    items: [
      { id: 'jp-license', text: '駕照日文譯本', note: '監理站免費辦，租車必備（正本＋譯本＋護照才能租車）', ref: 'tips' },
      { id: 'passport', text: '護照效期滿 6 個月' },
      { id: 'vjw', text: '填好 Visit Japan Web、存 QR Code', note: '通關更快' },
      { id: 'confirm-letters', text: '收集各項預約確認信', note: '取車、住宿、水族館票等' },
    ],
  },
  {
    id: 'booking', title: '預約確認', due: '出發前一週',
    items: [
      { id: 'ocean-boo', text: 'Ocean BOO! 阿古豬涮涮鍋', note: 'Day 1 晚餐，那霸居酒屋，先訂位' },
      { id: 'churaumi-ticket', text: '美麗海水族館門票', note: 'Day 3 早上用，但要在 Day 2 傍晚路過「道の駅 許田」（9:00–19:00）時買，比現場票便宜約 ¥400／人；買不到就先在 Klook/KKday 買電子票' },
      { id: 'blue-cave', text: '青之洞窟浮潛 / SUP（中文教練）', note: 'Day 4 上午，玩水組 2 人，先線上預約。務必挑「含飯店接送」＋可免費改期的方案（海況不穩，可能改船潛或停辦）' },
      { id: 'ryukyu-mura', text: '琉球村門票', note: 'Day 4 下午，現場可買；Klook/KKday 通常比 ¥2,000 原價便宜。最終受付 16:00。累了就不去，別提前買不能退的' },
      { id: 'manmi', text: '島豚七輪燒 満味', note: 'Day 2 預約 17:30；營業狀況請先確認，地址名護市伊差川251，電話 0980-53-5383' },
      { id: 'flavor-design', text: 'The Flavor Design 調香', note: 'Day 5，可線上預約較安心' },
      { id: 'ryukyu-beef', text: '琉球的牛（A5 石垣牛）', note: 'Day 5 晚餐，官網提前訂位' },
      { id: 'gangala', text: 'Gangala 之谷導覽', note: 'Day 5，gangala.com 預約 10:00 場，09:40 前報到' },
      { id: 'pancake', text: '幸福鬆餅（選配）', note: 'Day 6 瀨長島現場視食量與排隊狀況決定，不設固定預約' },
      { id: 'orion-park', text: '（選）Orion Happy Park 工廠見學', note: 'Day 5 上午的替代方案，需事先預約；開車的人不能試飲' },
      { id: 'stay-confirm', text: '住宿（全部已預訂 ✔）', note: 'Day 1 里士滿酒店那霸久茂地／Day 2 Churaumi On The Beach Motobu／Day 3–4 Yomitan Kukuru Resort 連住／Day 5 La’gent Hotel 那霸國際通' },
      { id: 'car-confirm', text: '租車：OTS 臨空豐崎營業所（已預約 ✔）', note: 'Day 2 15:00 取車、Day 6 15:00 同店還車，共 96 小時。豊見城市豊崎3-37／098-856-8877／08:00–19:00。機場↔營業所免費接駁，國內線航廈「10-A」上下車' },
    ],
  },
  {
    id: 'money', title: '錢與網路',
    items: [
      { id: 'cash', text: '換好日幣現金' },
      { id: 'credit-card', text: '確認信用卡可海外刷卡、額度足夠' },
      { id: 'esim', text: 'eSIM 或網卡先買', note: '那霸市區靠單軌、可買一日券', ref: 'tips' },
    ],
  },
  {
    id: 'car', title: '租車',
    items: [
      { id: 'car-5docs', text: '取車 5 證件', note: '駕照正本、日文譯本、護照、預約確認信、主駕駛人信用卡', ref: 'tips' },
      { id: 'car-insurance', text: '租車保險 CDW＋NOC 務必加保', note: '右駕靠左行駛、路較窄，導航用 MapCode 最準', ref: 'tips' },
      { id: 'car-mapcode', text: '整理好各景點 MapCode 清單' },
    ],
  },
  {
    id: 'pack', title: '行李',
    items: [
      { id: 'swimwear', text: '泳具（泳衣、快乾衣物、防水袋）', note: '青之洞窟浮潛 / SUP 用' },
      { id: 'sunscreen', text: '防曬乳、曬後修護' },
      { id: 'rain-gear', text: '雨具（秋季留意颱風與海況）' },
      { id: 'power-bank', text: '行動電源', note: '搭機請依航空公司規範，隨身攜帶、勿托運', ref: 'tips' },
    ],
  },
  {
    id: 'phone', title: '手機準備',
    items: [
      { id: 'offline-map', text: '下載沖繩離線地圖' },
      { id: 'booking-screenshots', text: '各項訂位確認信截圖存手機' },
      { id: 'add-to-home', text: '把行程網站加到主畫面', note: '方便出發後手機直接開' },
    ],
  },
  {
    id: 'home', title: '出門前一晚',
    items: [
      { id: 'charge-devices', text: '手機、行動電源、相機都充飽電' },
      { id: 'sync-watch', text: '與同行者對好集合時間' },
      { id: 'online-checkin', text: '航班線上 check-in' },
    ],
  },
];
