/* Keep the full itinerary available, and reveal supporting information on demand. */
(() => {
  const clean = text => text.replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu, '');
  document.querySelectorAll('.sidebar, .stop .n, .sec > h2').forEach(root => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) walker.currentNode.textContent = clean(walker.currentNode.textContent);
  });
  document.querySelectorAll('.day .stop').forEach(stop => {
    const description = stop.querySelector(':scope > .d');
    if (!description) return;
    const details = document.createElement('details');
    details.className = 'stop-details';
    const summary = document.createElement('summary');
    summary.textContent = '停留資訊';
    details.append(summary);
    stop.querySelectorAll('.n .mc, .n .hr').forEach(meta => details.append(meta));
    details.append(description);
    stop.append(details);
  });
  document.querySelectorAll('.day .theme').forEach((el, i) => {
    el.textContent = ['單軌進城・晚餐・夜晚散步','那霸散步・取車北上','水族館・海島・海邊煙火','海上體驗・海岸夕陽','中部購物・那霸住宿','南城海景・瀨長島・回家'][i];
  });
  document.querySelectorAll('.day .pcards-h').forEach(el => el.textContent = '今日亮點');
  const firstHero = document.querySelector('.day-hero img');
  firstHero.loading = 'eager';
  firstHero.fetchPriority = 'high';
  const shortcuts = document.createElement('nav');
  shortcuts.className = 'quick-nav';
  shortcuts.setAttribute('aria-label', '常用功能');
  const icons = ['M8 2h8v18H8z M5 6H2v14h20V6h-3', 'm3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3z M9 3v15 M15 6v15', 'M3 21V7h18v14 M7 7V3h10v4 M7 11h2 M15 11h2 M7 15h2 M15 15h2 M10 21v-3h4v3'];
  [['d1','行程'],['map','地圖'],['stay','住宿']].forEach(([id,label],i) => {
    const b = document.createElement('button');
    b.type='button';b.dataset.nav=id;
    b.innerHTML=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="${icons[i]}"/></svg><span>${label}</span>`;
    shortcuts.append(b);
  });
  const more = document.createElement('button');more.type='button';
  more.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg><span>更多</span>';
  more.addEventListener('click',()=>document.getElementById('menuBtn').click());
  shortcuts.append(more);document.body.append(shortcuts);
  const update = () => {
    const id=document.querySelector('.panel.active')?.id;
    shortcuts.querySelectorAll('[data-nav]').forEach(b=>{
      const active=b.dataset.nav===id || (b.textContent==='行程' && /^d[1-6]$/.test(id));
      if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
      if(b.textContent==='行程' && /^d[1-6]$/.test(id)) b.dataset.nav=id;
    });
  };
  new MutationObserver(update).observe(document.querySelector('.wrap'),{subtree:true,attributes:true,attributeFilter:['class']});
  update();
})();
