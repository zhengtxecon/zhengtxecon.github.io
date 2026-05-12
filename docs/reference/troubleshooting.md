# Troubleshooting Guide

> **Purpose**: Common issues, error messages, and solutions.

## Navigation Issues

### Issue: Navigation not highlighting active page

**Symptom**: Navigation links don't show the active state when visiting a page.

**Cause**: `data-page` attribute doesn't match the navigation link href pattern.

**Solution**:
1. Check the `<body>` element has correct `data-page` attribute:
   ```html
   <body data-page="research">
   ```
2. Ensure navigation link href matches the pattern:
   ```html
   <a class="nav-link" href="research.html">Research</a>
   ```

**See**: [patterns/html-structure.md](../patterns/html-structure.md)

---

### Issue: Mobile menu not working

**Symptom**: Hamburger menu appears but doesn't open on mobile.

**Cause**: JavaScript `initNavigation()` function not properly initialized.

**Solution**:
1. Ensure `assets/js/main.js` is loaded:
   ```html
   <script src="assets/js/main.js" defer></script>
   ```
2. Check browser console for JavaScript errors
3. Verify mobile breakpoint (`max-width: 920px`) is reached

---

### Issue: Navigation links broken on new page

**Symptom**: Clicking navigation links on new page returns 404 or incorrect URL.

**Cause**: Navigation link path is wrong or page file is in wrong location.

**Solution**:
1. Check link href in `includes/header.html`:
   ```html
   <a class="nav-link" href="new-page.html">New Page</a>
   ```
2. Verify page file exists in root directory (not in subfolder)

---

## Component Issues

### Issue: Header or footer not loading

**Symptom**: Header or footer appears blank or missing from page.

**Cause**: Missing component placeholder divs or JavaScript not running.

**Solution**:
1. Ensure placeholders are present in HTML:
   ```html
   <div id="header-placeholder"></div>
   <main>...</main>
   <div id="footer-placeholder"></div>
   ```
2. Verify placeholders are before closing `</body>` tag
3. Check browser console for fetch errors
4. Verify `includes/header.html` and `includes/footer.html` files exist

**See**: [patterns/javascript-modules.md](../patterns/javascript-modules.md)

---

### Issue: Theme toggle not working

**Symptom**: Dark/light mode button doesn't switch themes on new page.

**Cause**: Theme toggle button not present or `initThemeToggle()` not running.

**Solution**:
1. Verify theme toggle button exists in header:
   ```html
   <button class="theme-toggle" type="button" data-theme-state="light">
   ```
2. Ensure `main.js` is loaded with `defer`
3. Check localStorage has `tz-theme` value:
   ```javascript
   localStorage.getItem('tz-theme')  // Should be 'light' or 'dark'
   ```

---

## CSS Issues

### Issue: Hardcoded colors appearing

**Symptom**: Colors don't change in dark mode.

**Cause**: CSS using hardcoded colors instead of CSS variables.

**Solution**:
1. Find hardcoded color values:
   ```css
   /* DON'T DO THIS */
   color: #ffffff;
   background: #000000;
   ```
2. Replace with CSS variables:
   ```css
   /* DO THIS */
   color: var(--color-brand-contrast);
   background: var(--color-background);
   ```

**See**: [reference/css-variables.md](css-variables.md)

---

### Issue: CSS variables not working

**Symptom**: `var(--variable-name)` not resolving to actual values.

**Cause**: `style.css` not loaded before page-specific CSS, or variable name is misspelled.

**Solution**:
1. Verify `style.css` is loaded first in `<head>`:
   ```html
   <link rel="stylesheet" href="assets/css/style.css">
   <link rel="stylesheet" href="assets/css/page-name.css">
   ```
2. Check variable name spelling in style.css

---

### Issue: Dark mode not applying on page

**Symptom`: Dark mode toggle switches but page remains light.

**Cause**: Missing `[data-theme="dark"]` selectors in CSS or HTML attribute not set.

**Solution**:
1. Verify HTML has data-theme attribute on `<html>`:
   ```javascript
   // Should be set by main.js
   document.documentElement.setAttribute('data-theme', 'dark');
   ```
2. Check CSS has dark mode overrides:
   ```css
   [data-theme="dark"] .element {
       color: #e2e8f0;
   }
   ```

---

## HTML Issues

### Issue: Chinese characters displaying as replacement boxes

**Symptom**: Chinese text shows as garbled characters or question marks.

**Cause**: File saved with wrong encoding (not UTF-8).

**Solution**:
1. Save file as UTF-8:
   - VSCode: File > Save with Encoding > UTF-8 with BOM
   - Other editors: Choose "UTF-8" when saving
2. Add charset meta tag (should already be present):
   ```html
   <meta charset="UTF-8">
   ```

---

### Issue: Page not validating

**Symptom**: W3C validator shows errors for HTML structure.

**Cause**: Invalid HTML syntax, missing closing tags, or deprecated elements.

**Solution**:
1. Run W3C Validator: [https://validator.w3.org/](https://validator.w3.org/)
2. Fix reported errors one by one
3. Common fixes:
   - Add missing closing tags
   - Use lowercase for tag names
   - Quote attribute values
   - Use semantic HTML (`<section>` instead of `<div>`)

**See**: [patterns/html-structure.md](../patterns/html-structure.md)

---

### Issue: Accessibility errors detected

**Symptom**: WAVE validator shows accessibility errors.

**Cause**: Missing ARIA labels, alt text, or keyboard navigation issues.

**Solution**:
1. Run WAVE Validator: [https://wave.webaim.org/](https://wave.webaim.org/)
2. Fix reported errors:
   - Add `aria-label` to buttons without visible text
   - Add descriptive `alt` text to images
   - Ensure keyboard navigation works
   - Check color contrast (minimum 4.5:1 for normal text)

**See**: [patterns/accessibility-patterns.md](../patterns/accessibility-patterns.md)

---

## JavaScript Issues

### Issue: JavaScript not running

**Symptom**: Interactive features don't work (theme toggle, scroll animations, etc.).

**Cause**: `main.js` not loaded, or script has syntax errors.

**Solution**:
1. Verify script tag is present:
   ```html
   <script src="assets/js/main.js" defer></script>
   ```
2. Check browser console for syntax errors
3. Verify file path is correct (`assets/js/main.js`)

---

### Issue: Scroll animations not working

**Symptom**: Sections don't fade in when scrolling.

**Cause**: Missing `[data-animate]` attributes or IntersectionObserver not initialized.

**Solution**:
1. Add data-animate attribute to sections:
   ```html
   <section data-animate="fade-up">
   ```
2. Verify `initScrollAnimations()` function runs in main.js
3. Check browser supports IntersectionObserver

**See**: [patterns/javascript-modules.md](../patterns/javascript-modules.md)

---

## Images Issues

### Issue: Images not loading

**Symptom**: Image placeholders appear or broken image icons.

**Cause**: Incorrect image path or file doesn't exist.

**Solution**:
1. Verify image is in correct location: `assets/images/`
2. Check image path in HTML:
   ```html
   <!-- Correct -->
   <img src="assets/images/profile.jpg" alt="...">

   <!-- Incorrect -->
   <img src="profile.jpg" alt="...">
   <img src="/assets/images/profile.jpg" alt="...">
   ```
3. Verify image file name matches exactly (case-sensitive)

---

### Issue: Images too large

**Symptom**: Slow page load, large file size warnings.

**Cause**: Images not optimized.

**Solution**:
1. Compress images using tools:
   - TinyPNG: [https://tinypng.com/](https://tinypng.com/)
   - Squoosh: [https://squoosh.app/](https://squoosh.app/)
2. Target file size: ≤200KB
3. Consider WebP or AVIF formats for modern browsers

---

## Form Issues

### Issue: Form not submitting

**Symptom**: Submit button doesn't send form data.

**Cause**: Form action URL incorrect or FormSubmit service not configured.

**Solution**:
1. Verify form action URL:
   ```html
   <form action="https://formsubmit.co/your-email@example.com" method="POST">
   ```
2. Ensure form fields have `name` attributes
3. Check required fields are filled

---

### Issue: Validation errors not showing

**Symptom**: Form doesn't show error messages for invalid input.

**Cause**: No error handling in JavaScript.

**Solution**:
1. Add form validation:
   ```javascript
   form.addEventListener('submit', (event) => {
       if (!form.checkValidity()) {
           event.preventDefault();
           showError('Please fill in all required fields');
       }
   });
   ```
2. Add error message display element in HTML

---

## Performance Issues

### Issue: Page loads slowly

**Symptom**: Long load times, poor Lighthouse scores.

**Cause**: Large images, blocking resources, or unoptimized code.

**Solution**:
1. Run Lighthouse audit:
   - Chrome DevTools > Lighthouse
   - Fix reported issues
2. Optimize images (compress, use modern formats)
3. Defer JavaScript loading (already using `defer`)
4. Check for blocking CSS/JS
5. Use CSS variables to reduce CSS size

---

### Issue: Cumulative Layout Shift (CLS)

**Symptom**: Content jumps around as page loads.

**Cause**: Images without dimensions, late-loading fonts.

**Solution**:
1. Add width/height attributes to images:
   ```html
   <img src="image.jpg" alt="..." width="800" height="600">
   ```
2. Use `font-display: swap` for Google Fonts:
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
   ```

---

## Deployment Issues

### Issue: New content not appearing on GitHub Pages

**Symptom**: Changes pushed to main branch but not visible on site.

**Cause**: Deployment delay, build failure, or incorrect file paths.

**Solution**:
1. Wait 1-3 minutes for GitHub Pages deployment
2. Check GitHub Actions for deployment status
3. Verify file paths are correct (case-sensitive on Linux)
4. Check site URL: `https://zhengtxecon.github.io/`

---

### Issue: 404 errors on deployed site

**Symptom**: Links return 404 not found.

**Cause**: Incorrect file paths in links, or files not committed.

**Solution**:
1. Verify file exists in repository
2. Check link href path (relative to root)
3. Ensure filename is lowercase (GitHub Pages is case-sensitive)
4. Check file is committed to `main` branch

---

## Browser-Specific Issues

### Issue: Safari not displaying correctly

**Symptom**: Site looks broken in Safari but works in Chrome/Firefox.

**Cause**: Safari-specific CSS or JavaScript compatibility issues.

**Solution**:
1. Test in latest Safari version
2. Check for Safari-specific bugs in CSS
3. Verify JavaScript doesn't use unsupported features
4. Clear Safari cache and reload

---

### Issue: Internet Explorer broken

**Symptom**: Site not working in older IE versions.

**Cause**: Using modern CSS/JavaScript features not supported in IE.

**Solution**:
1. Check browser support for features used
2. Add polyfills if necessary
3. Consider browser support policy (IE11 support optional)

---

## Debugging Checklist

When issues occur, check:

1. **Browser Console**
   - Open DevTools (F12)
   - Check for JavaScript errors
   - Look for failed network requests

2. **HTML Validation**
   - Run W3C Validator
   - Fix all errors and warnings

3. **Accessibility Check**
   - Run WAVE Validator
   - Fix all errors and most warnings

4. **Network Tab**
   - Check file loading status (200 OK, 404 Not Found)
   - Verify all resources load correctly

5. **Element Inspector**
   - Check computed styles
   - Verify CSS variables are resolving
   - Check element structure

---

## Getting Help

### Internal Resources

1. Check relevant documentation:
   - [workflows/](../workflows/) - Task-specific guides
   - [patterns/](../patterns/) - Code conventions
   - [reference/](css-variables.md) - Variable reference

2. Search codebase for similar implementations
3. Check existing files for working examples

### External Resources

- [W3C Validator](https://validator.w3.org/) - HTML validation
- [WAVE Validator](https://wave.webaim.org/) - Accessibility testing
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Color contrast testing
- [MDN Web Docs](https://developer.mozilla.org/) - JavaScript/CSS reference

---

## See Also

- [AGENTS.md](../AGENTS.md) - Main documentation
- [patterns/html-structure.md](../patterns/html-structure.md) - HTML patterns
- [patterns/css-conventions.md](../patterns/css-conventions.md) - CSS conventions
- [patterns/javascript-modules.md](../patterns/javascript-modules.md) - JavaScript patterns
