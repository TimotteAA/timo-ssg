import { createRoot } from "react-dom/client";
import App from "../theme-default/App";

/**
 * 浏览器入口
 */
function renderInBrowser() {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("#root element not found");
  }
  createRoot(root).render(<App />);
}

renderInBrowser();
