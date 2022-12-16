import { createVNode, render } from "vue";
import Dialog from "@/components/Dialog/index.vue";

const divDom = document.createElement("div");

divDom.setAttribute("id", "dialog");
document.body.appendChild(divDom);

const dialogPlugin = (options) => {
  return new Promise((resolve, reject) => {
    const success = () => {
      render(null, divDom);
      resolve("确定");
    };
    const cancel = () => {
      render(null, divDom);
      reject("取消");
    };
    const vNode = createVNode(Dialog, { ...options, success, cancel });
    render(vNode, divDom)
  });
};

export default {
    install(app) {
        app.config.globalProperties.$dialog = dialogPlugin
    }
}
