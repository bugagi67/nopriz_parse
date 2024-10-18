import "../src/css/style.css";
import {
  editingJson,
  downloadExcel,
  endPointInput,
  entryPointInput,
  parsButton,
} from "./js/app";
import main from "./js/app";

const URL = "https://reestr.nopriz.ru/api/sro/all/member/list";
const BODY = {
  filters: {},
  page: 8,
  pageCount: "100",
  sortBy: {},
  searchString: "Проект ",
};

parsButton.addEventListener("click", () => {
  if (endPointInput.value !== "" && entryPointInput.value !== "") {
    main(URL, BODY, entryPointInput.value, endPointInput.value)
      .then((data) => editingJson(data))
      .then((data) => downloadExcel(data))
      .catch((err) => console.error("Ошибка", err));
  } else {
    alert("Введите значения полей!");
  }
});

//  const URL = "https://reestr.nopriz.ru/api/sro/all/member/list";
// const BODY = {
//   filters: {},
//   page: 8,
//   pageCount: "100",
//   sortBy: {},
//   searchString: "Проект ",
// };

// const parsButton = document.querySelector('.pars__button');
// const entryPointInput = document.querySelector('.entrypoint');
// const endPointInput = document.querySelector('.endpoint');

// entryPointInput.addEventListener('keypress', (e) => {
//   if (e.key.match(/[a-z]/i))
//   e.preventDefault();
// })

// endPointInput.addEventListener('keypress', (e) => {
//   if (e.key.match(/[a-z]/i))
//   e.preventDefault();
// })

// async function main(url, body, entrypage, endpage, serch = "Проект ") {
//   let counter = entrypage;
//   let array = [];

//   async function postData(url, body) {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Connection: "keep-alive",
//         "Accept-Encoding": "gzip, deflate, br",
//       },
//       body: JSON.stringify(body),
//     });
//     const a = await response.json();
//     return a.data.data;
//   }

//   if (counter < endpage) {
//     for (let i = counter; i <= endpage; i++) {
//       body = {
//         filters: {},
//         page: `${counter}`,
//         pageCount: "100",
//         sortBy: {},
//         searchString: `${serch}`,
//       };

//       const result = await postData(url, body);
//       array.push(...result);
//       counter++;
//     }
//   }
//   return array;
// }

// function editingJson(data) {
//   const cleanedData = data.map(
//     ({
//       id,
//       member_type,
//       member_status,
//       inventory_number,
//       full_description,
//       registration_number,
//       registry_registration_date,
//       suspension_date,
//       other_information,
//       sro,
//       members_total_liability,
//       ...rest
//     }) => rest
//   );
//   return cleanedData
// }

// function downloadExcel(data) {
//   if (
//     !Array.isArray(data) ||
//     data.length === 0 ||
//     typeof data[0] !== "object"
//   ) {
//     console.error("Invalid data format for Excel export");
//     return;
//   }
//   const worksheet = XLSX.utils.json_to_sheet(data);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
//   XLSX.writeFile(workbook, "output.xlsx");
// }

// parsButton.addEventListener('click', (e) => {
//   if (endPointInput.value !== '' && entryPointInput.value !== '' ) {
//     main(URL, BODY, entryPointInput.value, endPointInput.value)
//     .then((data) => editingJson(data))
//     .then((data) => downloadExcel(data))
//     .catch((err) => console.error("Ошибка", err));
//   } else {
//     alert("Введите значения полей!")
//   }
// })
