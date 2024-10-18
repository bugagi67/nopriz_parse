import "./css/style.css";
import { editingJson, downloadExcel, endPointInput, entryPointInput, parsButton } from "./js/app";
import main from "./js/app";
var URL = "https://reestr.nopriz.ru/api/sro/all/member/list";
var BODY = {
  filters: {},
  page: 8,
  pageCount: "100",
  sortBy: {},
  searchString: "Проект "
};
parsButton.addEventListener("click", function () {
  if (endPointInput.value !== "" && entryPointInput.value !== "") {
    main(URL, BODY, entryPointInput.value, endPointInput.value).then(function (data) {
      return editingJson(data);
    }).then(function (data) {
      return downloadExcel(data);
    })["catch"](function (err) {
      return console.error("Ошибка", err);
    });
  } else {
    alert("Введите значения полей!");
  }
});