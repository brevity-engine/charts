import { $ } from "../utils/dom";
import { CSSTEXT } from "../../css/chartsCss";

export function downloadFile(filename, data) {
  const a = document.createElement("a");
  a.style = "display: none";
  const blob = new Blob(data, { type: "image/svg+xml; charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 300);
}

export function prepareForExport(svg) {
  const clone = svg.cloneNode(true);
  clone.classList.add("chart-container");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  const styleEl = $.create("style", {
    innerHTML: CSSTEXT,
  });
  clone.insertBefore(styleEl, clone.firstChild);

  const container = $.create("div");
  container.appendChild(clone);

  return container.innerHTML;
}
