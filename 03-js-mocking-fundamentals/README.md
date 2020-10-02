<h1 align="center">
  <a href="https://testingjavascript.com/courses/javascript-mocking-fundamentals">JavaScript Mocking Fundamentals</a>
</h1>

<hr />

Order of material:

1.  `monkey-patching.js` (no jest version)
2.  `mock-fn.js`
3.  `spy.js`
4.  `inline-module-mock.js`
5.  `external-mock-module.js`

The files are intended to test the `thumb-war.js` module and mock the `utils`
module.

To run the tests, run `npx jest`. To start watch mode run `npx jest --watch`

## Custom jest runner.

You can definitely run the `no-framework` files just using `node` (like this:
`node src/no-framework/monkey-patching.js`), but in an effort to make running
these easier, I created a custom jest runner that uses jest to run the files,
but allow them to be run without the jest testing framework. It's really cool.
It uses [`create-jest-runner`](https://www.npmjs.com/package/create-jest-runner)
and should probably be published eventually.
