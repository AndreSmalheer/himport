# HTML Importer

`htmlImporter.js` is a lightweight JavaScript module for dynamically importing HTML files into your web pages. It automatically handles loading **styles** and **scripts** embedded in the HTML, making it easy to include reusable components or partial pages without a build system.

---

## Features

- Fetch and inject HTML files into any DOM element
- Automatically load and attach `<style>` and `<link>` CSS files
- Automatically load and execute `<script>` files, including inline and external scripts
- Supports loading multiple HTML files sequentially
- Avoids duplicate script or stylesheet loading
- Easy to integrate into any vanilla JS project

---

## Installation

Include the `htmlImporter.js` module in your project, then add an element with the class `html-import` and specify the HTML file you want to import using the `data-src` attribute.

### Example:

```html
<script type="module" src="./htmlImporter.js"></script>
<div class="html-import" data-src="YourHtmlFile.html"></div>
```
