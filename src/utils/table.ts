
export interface TableLine {
  text: string;
  [key: string]: string;
}

export function parseTable(table: HTMLTableElement): Record<string, TableLine>[] {
  const trs = table.querySelectorAll('tr');
  const headers: string[] = [];
  const lines: Record<string, TableLine>[] = [];

  function parseTableValue(element: HTMLElement): TableLine {
    const result: TableLine = {
      text: element.innerText,
    };

    const links = element.querySelectorAll<HTMLElement>('a[href]');

    links.forEach(link => {
      const key = link.innerText || link.getAttribute('data-original-title') || link.title;

      result[key] = link.getAttribute('href')!;
    });

    return result;
  }

  trs.forEach(tr => {
    const tds = tr.querySelectorAll('td');

    if (tds.length === 0 && headers.length === 0) {
      const ths = tr.querySelectorAll('th');

      ths.forEach(th => headers.push(th.innerText));
    } else {
      const column: Record<string, TableLine> = {};
      tds.forEach((td, index) => {
        column[headers[index]] = parseTableValue(td);
      });
      lines.push(column);
    }
  });

  return lines;
}



