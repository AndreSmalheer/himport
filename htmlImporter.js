export async function fetchHTML(file) {
  // Fetches an HTML file and returns its content as a string
  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error("Network response was not ok");
    let htmlContent = await response.text();
    return htmlContent;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function loadStylesFromHTML(html, basePath = "") {
  // Extracts and appends all styles from the HTML string to document head
  const temp = document.createElement("div");
  temp.innerHTML = html;

  temp.querySelectorAll("link[rel='stylesheet'], style").forEach((styleEl) => {
    if (styleEl.tagName.toLowerCase() === "link") {
      const href = new URL(styleEl.getAttribute("href"), basePath).href;
      if (!document.querySelector(`link[href="${href}"]`)) {
        styleEl.href = href;
        document.head.appendChild(styleEl);
      }
    } else if (styleEl.tagName.toLowerCase() === "style") {
      document.head.appendChild(styleEl);
    }
  });

  temp
    .querySelectorAll("link[rel='stylesheet'], style")
    .forEach((el) => el.remove());
  return temp.innerHTML;
}

export async function loadScriptsFromHTML(html, basePath = "") {
  // Extracts and appends all scripts from the HTML string to the document body
  const temp = document.createElement("div");
  temp.innerHTML = html;

  let relPath = basePath.substring(0, basePath.lastIndexOf("/") + 1);

  const scripts = Array.from(temp.querySelectorAll("script"));

  for (const scriptEl of scripts) {
    const newScript = document.createElement("script");

    for (const attr of scriptEl.attributes) {
      newScript.setAttribute(attr.name, attr.value);
    }

    if (scriptEl.src) {
      const src = new URL(scriptEl.getAttribute("src"), relPath).href;

      if (!document.querySelector(`script[src="${src}"]`)) {
        await new Promise((resolve) => {
          newScript.src = src;
          newScript.onload = resolve;
          newScript.onerror = () => {
            console.error(`Failed to load script: ${src}`);
            resolve();
            s;
          };
          document.body.appendChild(newScript);
        });
      }
    } else {
      newScript.textContent = scriptEl.textContent;
      document.body.appendChild(newScript);
    }

    console.log(newScript);
    scriptEl.remove();
  }

  return temp.innerHTML;
}

export async function loadHTMLIntoElement(file, selector) {
  // Loads an HTML file into a specific element, including its styles and scripts
  const el = document.querySelector(selector);
  if (!el) return console.error(`Element ${selector} not found`);

  const html = await fetchHTML(file);
  if (!html) return null;

  const basePath = new URL(file, window.location.href).href;

  let content = loadStylesFromHTML(html, basePath);

  el.insertAdjacentHTML("beforeend", content);

  loadScriptsFromHTML(content, basePath);

  return html;
}

export async function loadMultipleHTMLFiles(files, selector) {
  // Loads multiple HTML files sequentially into a specific element
  for (const file of files) {
    await loadHTMLIntoElement(file, selector);
  }
}

export async function loadAllByClass(className = "html-import") {
  const elements = document.querySelectorAll(`.${className}`);

  for (const el of elements) {
    const src = el.getAttribute("data-src");
    if (!src) continue;

    const html = await fetchHTML(src);
    if (!html) continue;

    const basePath = new URL(src, window.location.href).href;
    const content = loadStylesFromHTML(html, basePath);
    el.insertAdjacentHTML("beforeend", content);
    await loadScriptsFromHTML(html, basePath);
  }
}

loadAllByClass();
