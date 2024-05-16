
export function getInputFromLabel(form: HTMLFormElement, labelText: string): string {
  const labels = form.querySelectorAll('label');

  for (let i = 0; i < labels.length; i++) {
    const el = labels.item(i);

    console.log(labelText, el.innerText);

    if (!el.innerText.includes(labelText))
      continue;

    const element = document.getElementById(el.htmlFor);

    if (!element)
      continue;

    if (element.tagName.toLowerCase() === 'select')
      return (element as HTMLSelectElement).selectedOptions[0].innerText;

    if (element.tagName.toLowerCase() === 'input') {
      const input = element as HTMLInputElement;

      if (input.type === 'checkbox')
        return input.checked ? 'true' : '';

      return input.value;
    }
  }

  return '';
}

export function getInputFromQuery(form: HTMLElement, query: string): string {
  const element = form.querySelector(query);

  if (!element)
    return '';

  if (element.tagName.toLowerCase() === 'select')
    return (element as HTMLSelectElement).selectedOptions[0].innerText;

  if (element.tagName.toLowerCase() === 'input') {
    const input = element as HTMLInputElement;

    if (input.type === 'checkbox')
      return input.checked ? 'true' : '';

    return input.value;
  }

  return '';
}
