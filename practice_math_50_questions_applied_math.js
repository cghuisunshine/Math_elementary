(function (global) {
  function formatExponentHTML(html) {
    return html.replace(
      /(^|[^\w>])([A-Za-z0-9)]+)\^([A-Za-z0-9]+)/g,
      function (_, prefix, base, exponent) {
        return (
          prefix +
          '<span class="math-inline">' +
          base +
          '<sup class="math-exponent">' +
          exponent +
          "</sup></span>"
        );
      }
    );
  }

  function formatDivisionHTML(html) {
    const operand = '(?:<span class="math-inline">[^<]+<sup class="math-exponent">[^<]+<\\/sup><\\/span>|[A-Za-z0-9]+)';
    const divisionPattern = new RegExp('(' + operand + ')\\s*\\/\\s*(' + operand + ')', "g");

    return html.replace(divisionPattern, '$1 <span class="math-operator">÷</span> $2');
  }

  function formatMathHTML(html) {
    return formatDivisionHTML(formatExponentHTML(html));
  }

  function applyMathFormatting(root) {
    const scope = root || document;
    const targets = scope.querySelectorAll(".qtext, .answer");

    targets.forEach(function (element) {
      element.innerHTML = formatMathHTML(element.innerHTML);
    });
  }

  const api = {
    formatMathHTML,
    applyMathFormatting
  };

  global.practiceMathAppliedMath = api;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : window);
