export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(date));
}

/**
 * Get a tuple of completed and total tasks
 * @param {Array<Number>} tuple of compelted and total tasks
 * @returns
 */
export function countTasks(html) {
  let tmp = document.createElement('DIV');
  tmp.innerHTML = html;

  let { completed, total } = { completed: 0, total: 0 };
  tmp.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    if (checkbox.getAttribute('checked')) {
      completed++;
    }

    total++;
  });

  if (total > 0) {
    return [completed, total];
  }

  return null;
}
