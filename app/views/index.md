---
title: What is Regression testing
---

<div class="slide first">
===

# {{page.title}}

- A series of non-functional re-tests
- Ran after a bug fixing or code changes
- Provides certainty that changes made have minimal impact
- Tracking the quality, validity and size

<div><a href="#relate" class="btn btn-primary">How does it relate to CSS</a></div>

===
</div>

<div class="slide" id="relate">
===
<h2>How does it relate to CSS</h2>

- The cascade and specificity can easily cause side effects
- Updates can conflict with pre-existing rules
- Pre-compilers can drastically increase file size
- Small changes may impact previous testing results (accessibility, validation)

<div><a href="#automated" class="btn btn-primary">Automated over manaual</a></div>

===
</div>

<div class="slide" id="automated">
===
<h2>Automated over manaual</h2>

- Time consuming and prone to user error
- Can be run over night if large
- Be included into a build/release process
- Re-used for cross browser testing

<div><a href="#types" class="btn btn-primary">Types of testing</a></div>

===
</div>

<div class="slide" id="types">
===
<h2>Types of testing</h2>

- Pull requests
- CSS regression tests
- Sass regression tests
- Visual regression tests
- Auditing

<div><a href="#pull" class="btn btn-primary">Pull requests</a></div>

===
</div>


<div class="slide" id="pull">
===

## Pull requests

- A second set of eyes
- Background knowledge of the project
- Offer another solution
- Check CSS is readable and maintainable

<div><a href="#css" class="btn btn-primary">CSS regression</a></div>

===
</div>


<div class="slide" id="css">
===

## CSS regression

- Test the computed styles of elements
- Test against requirements not everything
- You may need to sanitise values with helper functions
- Accept not evertyhing can be tested

<div><a href="#sass" class="btn btn-primary">Sass regression</a></div>

===
</div>


<div class="slide" id="sass">
===

## Sass regression

- More like unit tests with inputs and outputs
- Test variables, extensions, functions and mixins
- 
- 

<div><a href="#visual" class="btn btn-primary">Visual regression</a></div>

===
</div>



<div class="slide" id="visual">
===

## Visual regression

- More like unit tests with inputs and outputs
- Test variables, extends, functions and mixins
- Make sure th
- 

<div><a href="#auditing" class="btn btn-primary">Auditing</a></div>

===
</div>

