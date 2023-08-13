"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const server = require("react-dom/server");
const react = require("react");
const Layout = () => {
  const [count, setCount] = react.useState(0);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime.jsx("h2", { children: "default layout component" }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      count,
      /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: () => setCount(count + 1), children: "Add count by 1" }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { children: "FUck you" })
    ] })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(Layout, {});
};
function render() {
  return server.renderToString(/* @__PURE__ */ jsxRuntime.jsx(App, {}));
}
exports.render = render;
