---
title: CSS Stats
---
=== mt-5

# {{ page.title }}

This page should be our chance to justify some of the results aswell as to explain what they mean

===

<div class="container container--outer bg-gradient-primary text-center" id="numbers">
  <h2>Key numbers</h2>
  <div class="container__inner">
    <div class="row">
      <div class="col-sm-6">
        <p class="h6 pb-2">Size</p>
        <p class="display-1">{{css_stats.humanizedSize | lower }}</p>
      </div>
      <div class="col-sm-6">
        <p class="h6 pb-2">Gzipped size</p>
        <p class="display-1">{{css_stats.humanizedGzipSize | lower }}</p>
      </div>
    </div>
    <div class="row pb-3">
      <div class="col-sm-4">
        <p class="h6 pb-2">Rules</p>
        <p class="display-2">{{css_stats.rules.total}}</p>
      </div>
      <div class="col-sm-4">
        <p class="h6 pb-2">Selectors</p>
        <p class="display-2">{{css_stats.selectors.total}}</p>
      </div>
      <div class="col-sm-4">
        <p class="h6 pb-2">Declarations</p>
        <p class="display-2">{{css_stats.declarations.total}}</p>
      </div>
    </div>

    <p class="h3">Total Declarations</p>
    <div class="row pb-3">
        <div class="col-sm-2">
          <p class="h6 pb-2">Font Size</p>
          <p class="display-2 pb-2">{{css_stats.declarations.fontsize_count}}</p>
        </div>
        <div class="col-sm-2">
          <p class="h6 pb-2">Float</p>
          <p class="display-2 pb-2">{{css_stats.declarations.float_count}}</p>
        </div>
        <div class="col-sm-2">
          <p class="h6 pb-2">Width</p>
          <p class="display-2 pb-2">{{css_stats.declarations.width_count}}</p>
        </div>
        <div class="col-sm-2">
          <p class="h6 pb-2">Height</p>
          <p class="display-2 pb-2">{{css_stats.declarations.height_count}}</p>
        </div>
        <div class="col-sm-2">
          <p class="h6 pb-2">Color</p>
          <p class="display-2 pb-2">{{css_stats.declarations.color_count}}</p>
        </div>
        <div class="col-sm-2">
          <p class="h6 pb-2">Background Color</p>
          <p class="display-2 pb-2">{{css_stats.declarations.bgcolor_count}}</p>
        </div>
    </div>
  </div>
</div>

<div class="container no-animate">
    <h2 id="colours">{{css_stats.color_count}} Colours</h2>
  <p>Colours also include backgrounds and background-colors.</p>
  <div class="row text-center">
  {% for color in css_stats.colors %}
    <div class="col-6 col-sm-3 col-md-2">
        <div style="background:{{ color | lower }}; width: 100%; padding-top: 100%;"></div>
        <p class="strong" style="display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; overflow: hidden; padding: 0; margin-bottom: 2rem; max-height: 7rem;">{{ color | upper }}</p>
    </div>
  {% endfor %}
</div>
</div>

<div class="container no-animate bg-light">

  <h2 id="fontsizes">{{css_stats.fontsizes_count}} Font Sizes</h2>

  {% for fontsize in css_stats.fontsizes %}
  <p style="font-size: {{fontsize}}; line-height: 1.2;">Font size {{fontsize}}</p>
  {% endfor %}

</div>

<div class="container no-animate">
  <h2 id="fontfamilies">{{css_stats.fontfamilies_count}} Font Families</h2>
  {% for family in css_stats.fontfamilies %}
  <p style="font-family:{{ family }};">{{ family }}</p>

  {% endfor %}
</div>

<div class="container no-animate">
  <h2 id="fontfamilies">{{css_stats.zindexs_count}} Z Indices</h2>
  {% for zindex in css_stats.zindexs %}
  <p>{{ zindex }}</p>
  {% endfor %}
</div>


<div class="container no-animate">
  <h2 id="fontfamilies">Specificity Graph</h2>
  <div class="graph mb-3">
    {% for spec in css_stats.specificitygraph %}
    <span style="height: {{ spec | percent(css_stats.specificitygraphmax) }}%;"></span>
    {% endfor %}
  </div>

  <p>
    Base 10 specificity score for each selector by source order.
    Generally, lower scores and flatter curves are better for maintainability.
    <a href="http://csswizardry.com/2014/10/the-specificity-graph/" target="_blank">Learn More</a>
  </p>
</div>


<div class="container no-animate">
  <h2 id="fontfamilies">Ruleset Graph</h2>
  <div class="graph mb-3">
    {% for rule in css_stats.rulegraph %}
    <span style="height: {{ rule | percent(css_stats.rulegraphmax) }}%;"></span>
    {% endfor %}
  </div>

</div>


<style>
.graph {
  display: flex;
  flex-wrap: nowrap;
  -ms-flex-align: end!important;
  align-items: flex-end!important;
  height: 20rem;
}

.graph span {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  background: black;
}
</style>