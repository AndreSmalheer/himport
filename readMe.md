# Himport

This is a JS library that allows you to easily import HTML files into other HTML files. It also loads scripts and styles automatically.

---

## Usage

### Basic HTML Import

```html
<script type="module" src="./htmlImporter.js"></script>

<div class="html-import" data-src="YourHtmlFile.html"></div>
```

---

### Import Varibles

If you want to use variables in your imported HTML file, just use:

```html
<div class="html-import" data-vars='{"yourVarible": "Custom text"}></div>
```

Then, in the imported HTML file, use $yourVariable and it will be replaced with your text:

```html
<h1>Hello $yourVarible</h1>
```
