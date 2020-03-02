---
title: What is Regression testing
---

<div class="slide first">
===

<h1 class="display-1">{{page.title}}</h1>

- A series of non-functional re-tests
- Run after bug fixing or code changes
- Provides certainty that changes made have minimal impact
- Tracking the quality, validity and size

<div><a href="#relate" class="btn btn-primary">How does it relate to CSS</a></div>

===
</div>

<div class="slide" id="relate">
===
<h2 class="display-1">How does it relate to CSS</h2>

- The cascade and specificity can easily cause side effects
- Updates can conflict with pre-existing rules
- Pre-compilers can drastically increase file size
- Small changes may impact previous testing results (accessibility, validation)

<div><a href="#automated" class="btn btn-primary">Automated over manaual</a></div>

===
</div>

<div class="slide" id="automated">
===
<h2 class="display-1">Automated over manaual</h2>

- Time consuming and prone to user error
- Can be run over night if large
- Be included into a build/release process
- Re-used for cross browser testing

<div><a href="#types" class="btn btn-primary">Types of testing</a></div>

===
</div>

<div class="slide" id="types">
===
<h2 class="display-1">Types of testing</h2>

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

<h2 class="display-1">Pull requests</h2>

- A second set of eyes
- Background knowledge of the project
- Offer another solution
- Check CSS is readable and maintainable

<div><a href="#css" class="btn btn-primary">CSS regression</a></div>

===
</div>


<div class="slide" id="css">
===

<h2 class="display-1">CSS regression</h2>

- Test the computed styles of elements
- Test against requirements not everything
- You may need to sanitise values with helper functions
- Accept not everything can be tested

<div><a href="#sass" class="btn btn-primary">Sass regression</a></div>

===
</div>

<!-- Jump to code - Show an example of a test and run the test. Update some CSS and see it fail. -->

<div class="slide" id="sass">
===

<h2 class="display-1">Sass regression</h2>

- More like unit tests with inputs and outputs
- Test variables, extends, functions and mixins
- Test re-usable code

<div><a href="#visual" class="btn btn-primary">Visual regression</a></div>

===
</div>

<!-- Jump to code - Show an example of a test and run the test. Update some CSS and see it fail. -->

<div class="slide" id="visual">
===

<h2 class="display-1">Visual regression</h2>

- Compare a series of components with reference images
- Setup a kitchen sink of components to test
- Test different variants of the components
- Automate the creation of the config file

<div><a href="#auditing" class="btn btn-primary">Auditing</a></div>

===
</div>

<!-- Jump to code - Show the kitchen sink, run visual test and look at the diff -->

<div class="slide" id="auditing">
===

<h2 class="display-1">Auditing</h2>

- Generate stats
- Monitor the file size
- Validation
- Create a readable summary 

<div><a href="#why" class="btn btn-primary">Why bother</a></div>

===
</div>

<!-- Jump to code - audit page -->

<div class="slide" id="why">
===

<h2 class="display-1">Why bother</h2>

- Is it overkill
- Prevent bugs before getting into test
- Scale the level of test to the project type
- Release changes with greater confidence

<div><a href="#questions" class="btn btn-primary">Questions</a></div>

===
</div>

<div class="slide" id="questions">
===

<h2 class="display-1">Any questions?</h2>

===
</div>

