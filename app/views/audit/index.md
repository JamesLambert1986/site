---
title: Audit
---

===

# {{page.title}}


 <p class="small pb-3">Data created on: <strong>{{summary.date}}</strong></p>
  <p class="small">Version: <strong>{{summary.version}}</strong></p>


  <table class="table table-stacked">
    <thead>
      <tr>
          <th></th>
          <th>Size</th>
          <th><span class="sr-only">Size in </span>Develop</th>
          <th><span class="sr-only">Size in </span>V{{release_summary.version}}</th>
          <th>Information</th>
      </tr>
    </thead>
    <tbody>
        <!--<tr>
            <td><span class="h3 pb-0">HTML</span></td>
            <td data-col="Size" class="d-none d-sm-table-cell">-</td>
            <td data-col="Develop" class="d-none d-sm-table-cell">-</td>
            <td data-col="V{{release_summary.version}}" class="d-none d-sm-table-cell">-</td>
            <td>
              <a href="/audit/html">{{summary.html.validation_errors}} validation errors</a><br/>
              <a href="/audit/html_accessibility">{{summary.html.accessibility_issues}} accessibility issues</a><br/>
              TODO: Breaking changes
            </td>
        </tr>-->
        <tr>
            <td><span class="h3 pb-0">CSS</span></td>
            <td data-col="Size">{{summary.css.size}}</td>
            <td data-col="Develop">{{develop_summary.css.size}}</td>
            <td data-col="V{{release_summary.version}}">{{release_summary.css.size}}</td>
            <td>
              <a href="/audit/css_stats">Stats</a><br/>
              <a href="/audit/css_errors">{{summary.css.validation_errors}} validation errors</a><br/>
              {{summary.sass.unit_tests_total}} sass unit tests<br/>{{summary.sass.unit_tests_errors}} sass tests failed<br/>
              <a href="/audit/css_tests">{{summary.css.unit_tests_total}} css unit tests<br/>{{summary.css.unit_tests_errors}} css tests failed</a>
            </td>
        </tr>
        <tr>
            <td><span class="h3 pb-0">JS</span></td>
            <td data-col="Size">{{summary.js.size}}</td>
            <td data-col="Develop">{{develop_summary.js.size}}</td>
            <td data-col="V{{release_summary.version}}">{{release_summary.js.size}}</td>
            <td>
              <a href="/audit/unit_tests">{{summary.js.unit_tests_total}} unit tests<br/>{{summary.js.unit_tests_errors}} tests failed</a>
            </td>
        </tr>
        <tr>
            <td><span class="h3 pb-0">Media Assets</span></td>
            <td data-col="Size">{{summary.assets.size}}</td>
            <td data-col="Develop">{{develop_summary.assets.size}}</td>
            <td data-col="V{{release_summary.version}}">{{release_summary.assets.size}}</td>
            <td><a href="/audit/assets">{{summary.assets.total}} files</a></td>
        </tr>
        <tr>
            <td><span class="h3 pb-0">Visual regression</span></td>
            <td data-col="Size" class="d-none d-sm-table-cell">-</td>
            <td data-col="Develop" class="d-none d-sm-table-cell">-</td>
            <td data-col="V{{release_summary.version}}" class="d-none d-sm-table-cell">-</td>
            <td>
              <a href="/backstop_data/html_report/index.html" target="_blank">
                {{summary.visual_regression.tests}} tests<br/>
                {{summary.visual_regression.affected}} tests affected<br/>
                {{summary.visual_regression.unaffected}} tests unaffected
              </a>
            </td>
        </tr>
    </body>
  </table>

  <p class="small">* File size is measured on the main compiled and minified file.</p>


===