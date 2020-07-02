#!/bin/sh
ng build product-search-element --prod --output-hashing=none && cat dist/product-search-element/runtime-es2015.js dist/product-search-element/polyfills-es2015.js dist/product-search-element/main-es2015.js > preview/angularapp.js
