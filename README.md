# Magma [![Build Status](https://travis-ci.org/alexmngn/ember-magma.png?branch=master)](https://travis-ci.org/alexmngn/ember-magma)

## Designed for Ember.js

Magma is a bootstrap toolkit that brings a set a UI components to help you create your Ember.js applications.

## How does this work?
This toolkit contains reusable components you can assemble to build awesome things.

Better than too many words, please visit <http://alexmngn.github.io/ember-magma/> to see examples.

## Installation

A simple command line can make you use the addon right now. Simply run the following at the root level of your ember project:
```
ember install ember-magma
```

**Note:** This addon requires you to use Ember 2.3 or above. Please update your project's Ember version to be able to use this addon.

## Themes

We understand that you don't always want to use the default styles coming from this addon. It often adds a lot of styles, and you might want to create your own theme for your application without overriding everything. For this reason, the default theme is not loaded by default in the application anymore.

If you decide you want to use the Magma theme, you will need to include it in the main sass file of your project.

```
@import 'node_modules/ember-magma/addon/styles/themes/magma';
```

## Documentation & Demos
The documentation and demos are available here: <http://alexmngn.github.io/ember-magma/>
