---
title: CSS Errors
---

=== mt-5

# CSS Validation

Validate CSS via [W3C's service](http://jigsaw.w3.org/css-validator/)

**Error Count: {{css_validation.errors.length}}**

The w3c standards and its validation service does a great job at preventing incorrect css but currently invalidates newer properties that aren't fully specified but are widely available to use in browsers on our supported list. 

<p class="pb-0">As we've opted to use as progressive enhancement that utilise these newer properties, we have chosen to hide certain property errors from the reports to better highlight errors that are relevant:</p>
<div>
  <a href="#allowed_properties" class="btn btn-link" data-toggle="collapse">Ignored properties</a>
  <div id="allowed_properties" class="collapse">
    <ul>
    <li>CSS Variables</li>
    {% for property in css_validation.allowed_properties %}
    <li>{{property}}</li>
    {% endfor %}
    </ul>
  </div>
</div>

The above properties are all stripped at report generation time apart from CSS variable declarations. These are removed before the css is validated due to parse errors being thrown on the lines after the variable declarations that are actually valid. We've opted to use regular expressions to remove the variable declarations to suppress the errors without masking valid errors by ignoring the classes the variables are declared within.

===

<div class="container">

{% for error in css_validation.errors %}
  
  <h2>Line: {{error.line}}</h2>
  <p>{{error.message}}</p>
  <p>{{error.context}}</p>
  <pre class="mb-5"><code class="css" id="html__wrapper">{{error.skippedstring}}</code></pre>

{% endfor %}

</div>