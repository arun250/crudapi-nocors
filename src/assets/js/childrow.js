//child row table

document.querySelectorAll('.toggle-child').forEach(function (btn) {
  btn.addEventListener('click', function () {
    const row = btn.closest('tr');
    const nextRow = row.nextElementSibling;
    const icon = btn.querySelector('i');
    if (nextRow && nextRow.classList.contains('child-row')) {
      nextRow.style.display = nextRow.style.display === 'none' ? 'table-row' : 'none';
      icon.classList.toggle('mdi-chevron-down');
      icon.classList.toggle('mdi-chevron-up');
    }
  });
});