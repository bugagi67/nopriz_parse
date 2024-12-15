import "./css/style.css";
import {
  editingJson,
  downloadExcel,
  endPointInput,
  entryPointInput,
  parsButton,
} from "./js/app";
import main from "./js/app";

const URL = "https://reestr.nopriz.ru/api/sro/all/member/list";
// const URL_NOSTROY = "https://reestr.nostroy.ru/api/sro/all/member/list";
const BODY = {
  filters: {},
  page: 8,
  pageCount: "100",
  sortBy: {},
  searchString: "",
};
// const BODY_NOSTROY = {
//   filters: {},
//   page: 1,
//   pageCount: "100",
//   sortBy: {},
//   searchString: "Специализированный застройщик",
// };

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
