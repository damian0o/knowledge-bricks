// remark-okf-links.mjs — rewrite OKF bundle-relative markdown links.
// Any link whose URL matches ^/.+\.md$ becomes <base><url-without-.md>/ so it
// resolves under the GitHub Pages base path.
import { visit } from "unist-util-visit";

export default function remarkOkfLinks(options = {}) {
  let base = options.base || "/";
  if (!base.endsWith("/")) base += "/";
  const re = /^\/(.+)\.md$/;

  return (tree) => {
    visit(tree, "link", (node) => {
      if (typeof node.url !== "string") return;
      const m = re.exec(node.url);
      if (!m) return;
      // m[1] = path without leading slash and without .md
      node.url = `${base}${m[1]}/`;
    });
  };
}
