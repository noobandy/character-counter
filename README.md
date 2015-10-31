# character-counter
A jQuery plugin to display a character counter next to an input or textarea.
# How to use
  **Step 1:** include required js files jquery and character-counter.js in your page.
  ```html
  <script type="text/javascript" src="jquery.js"></script>
  <script type="text/javascript" src="character-counter.js"></script>
  ```
    Jquery js must be included before character-counter.js.
  **Step 2:** Initialize plugin.
  ```javascript
  $(document).ready(function() {
    $("input textarea").mkcl().characterCounter({});
  });
  ```
    and that's it.
# Options
See the example.html file for more advanced options.
