export const parsButton = document.querySelector(".pars__button");
export const entryPointInput = document.querySelector(".entrypoint");
export const endPointInput = document.querySelector(".endpoint");

entryPointInput.addEventListener("keypress", (e) => {
  if (e.key.match(/[a-z]/i)) e.preventDefault();
});

endPointInput.addEventListener("keypress", (e) => {
  if (e.key.match(/[a-z]/i)) e.preventDefault();
});

export default async function main(
  url,
  body,
  entrypage,
  endpage,
  serch = "",
) {
  let counter = entrypage;
  let array = [];

  async function postData(url, body) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Origin: "https://reestr.nopriz.ru",
        "Content-Type": "application/json",
        Connection: "keep-alive",
        "Accept-Encoding": "gzip, deflate, br",
      },
      body: JSON.stringify(body),
    });
    const a = await response.json();
    return a.data.data;
  }

  if (counter < endpage) {
    for (let i = counter; i <= endpage; i++) {
      body = {
        filters: {},
        page: `${counter}`,
        pageCount: "100",
        sortBy: {},
        searchString: `${serch}`,
      };

      const result = await postData(url, body);
      array.push(...result);
      counter++;
    }
  }
  return array;
}

export function editingJson(data) {
  const cleanedData = data.map(
    ({
      id,
      member_type,
      member_status,
      inventory_number,
      full_description,
      registration_number,
      registry_registration_date,
      suspension_date,
      other_information,
      sro,
      members_total_liability,
      ...rest
    }) => ({
      ...rest,
      member_status: member_status ? member_status.title : "",
    }),
  );
  return cleanedData;
}

export function downloadExcel(data) {
  if (
    !Array.isArray(data) ||
    data.length === 0 ||
    typeof data[0] !== "object"
  ) {
    console.error("Неверный формат данных для экспорта в эксель");
    return;
  }
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
  XLSX.writeFile(workbook, "output.xlsx");
}
