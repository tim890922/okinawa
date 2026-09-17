/* 渲染 todo.js 的資料並處理 localStorage 勾選狀態 */
(function(){
  var STORAGE_KEY = 'okinawa.todo.v1';
  var list = document.getElementById('todoList');
  if(!list || typeof todoGroups === 'undefined') return;

  function loadState(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch(e) {
      return {};
    }
  }

  function saveState(state){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch(e) {
      /* 無痕模式或容量已滿時忽略，僅本次瀏覽不記憶 */
    }
  }

  var state = loadState();

  function keyFor(groupId, itemId){
    return groupId + '.' + itemId;
  }

  function render(){
    list.innerHTML = '';
    var totalCount = 0, checkedCount = 0;

    todoGroups.forEach(function(group){
      var groupChecked = 0;
      group.items.forEach(function(item){
        totalCount++;
        if(state[keyFor(group.id, item.id)]) { checkedCount++; groupChecked++; }
      });

      var section = document.createElement('section');
      section.className = 'todo-group';

      var h = document.createElement('h4');
      h.className = 'todo-group-h';
      var dueText = group.due ? '　' + group.due : '';
      h.innerHTML = '<span>' + group.title + dueText + '</span><span class="todo-group-count">' + groupChecked + '/' + group.items.length + '</span>';
      section.append(h);

      var ul = document.createElement('ul');
      ul.className = 'check';

      group.items.forEach(function(item){
        var key = keyFor(group.id, item.id);
        var li = document.createElement('li');
        li.className = 'todo-item';

        var label = document.createElement('label');
        label.className = 'todo-label';

        var input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'todo-check';
        input.dataset.todo = key;
        input.checked = !!state[key];

        var div = document.createElement('div');
        var b = document.createElement('b');
        b.textContent = item.text;
        div.append(b);

        if(item.note){
          var span = document.createElement('span');
          span.textContent = ' — ' + item.note;
          div.append(span);
        }

        if(item.ref){
          var refBtn = document.createElement('button');
          refBtn.type = 'button';
          refBtn.className = 'todo-ref';
          refBtn.dataset.nav = item.ref;
          refBtn.textContent = '查看說明 →';
          div.append(' ', refBtn);
        }

        label.append(input, div);
        li.append(label);
        ul.append(li);
      });

      section.append(ul);
      list.append(section);
    });

    var bar = document.getElementById('todoBar');
    var count = document.getElementById('todoCount');
    var pct = totalCount ? Math.round(checkedCount / totalCount * 100) : 0;
    if(bar) bar.style.width = pct + '%';
    if(count) count.textContent = checkedCount + ' / ' + totalCount + ' 已完成';
  }

  list.addEventListener('change', function(e){
    var input = e.target.closest('.todo-check');
    if(!input) return;
    if(input.checked) state[input.dataset.todo] = 1;
    else delete state[input.dataset.todo];
    saveState(state);
    render();
  });

  var resetBtn = document.getElementById('todoReset');
  if(resetBtn){
    resetBtn.addEventListener('click', function(){
      if(!confirm('確定要清除所有勾選狀態嗎？此動作無法復原。')) return;
      state = {};
      saveState(state);
      render();
    });
  }

  render();
})();
