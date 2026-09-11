const form = document.querySelector('#add-form');
const nameInput = document.querySelector('#name-input');
const idInput = document.querySelector('#id-input');
const gradeInput = document.querySelector('#grade-input');
const tip = document.querySelector('#tip');
const list = document.querySelector('#member-list');

let members = [];

// 渲染：生成表格行
const render = () => {
  list.innerHTML = '';
  const shown = members;
  if (shown.length === 0) {
    const tr = document.createElement('tr');
    tr.className = 'empty';
    tr.innerHTML = '<td colspan="4">没有符合条件的成员</td>';
    list.appendChild(tr);
    return;
  }
  shown.forEach(m => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${m.name}</td>
      <td>${m.studentId}</td>
      <td>${m.grade}</td>
      <td class="ops"></td>
    `;
    const ops = tr.querySelector('.ops');

    // 修改：弹窗读取新值，改数组后保存再渲染
    const editBtn = document.createElement('button');
    editBtn.textContent = '修改';
    editBtn.addEventListener('click', () => {
      const newName = prompt('姓名', m.name);
      if (newName === null) return;
      const newId = prompt('学号', m.studentId);
      if (newId === null) return;
      const newGrade = prompt('年级', m.grade);
      if (newGrade === null) return;
      m.name = newName.trim();
      m.studentId = newId.trim();
      m.grade = newGrade.trim();
      render();
    });
    ops.appendChild(editBtn);

    // 删除：从数组移除该成员
    const delBtn = document.createElement('button');
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => {
      members = members.filter(x => x.id !== m.id);
      render();
    });
    ops.appendChild(delBtn);

    list.appendChild(tr);
  });
};

// 添加：校验 → 改数组 → 保存 → 渲染
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const studentId = idInput.value.trim();
  const grade = gradeInput.value.trim();
  if (name === '' || studentId === '' || grade === '') {
    tip.textContent = '姓名、学号、年级都不能为空';
    return;
  }
  members.push({ id: Date.now(), name, studentId, grade });
  tip.textContent = '';
  nameInput.value = '';
  idInput.value = '';
  gradeInput.value = '';
  render();
});

render();
