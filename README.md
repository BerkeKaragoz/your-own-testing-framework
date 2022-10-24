# How to make your own testing framework

Maybe you want to better understand how these testing tools work, or you actually want to make your own. I am going to talk about what makes a testing framework for web-based applications.

In summary:
- The environment (Node, Bun, Deno, your kitchen?...)
- Getting the text contents (readFile, fetch, XMLHttpRequest...)
- Generate the DOM (jsdom, htmlparser...)
- Select HTMLElements from DOM (querySelector, JQuery...)
- Assertion (node:assert, chai...)
- Adding features such as reporting/presentation (mocha, chai, latte, sugar?)

See how simple it can get in this example repository: https://github.com/BerkeKaragoz/your-own-testing-framework

## The environment
As long as you can do all the items listed above, you can go on with that environment.

Lets say that we choose C and my kitchen (not yours):
- The environment: C
- Getting text contents: curl
- Generate the DOM: `libxml2`
- Getting HTMLElements (in this case XML element): `xmlGetProp` function
- Assertion: `assert(isActive == true)`
- Additions: Log any errors to txt

So don't think you have to use a JavaScript environment for testing. But since we are on web development context, JavaScript environments are usually better.

## Getting text contents
This part depends on how do you want to use your testing suites. You can just read out the contents directly from the file in development environment, or make a get request.

But you generally don't want to deal with this section on the each suite. So prepare a system.

A simple one would be:
```js
import fs from 'fs'
import path from 'path'
const DIR = './src'
// Read all files in ./src and get the text contents
export default fs.readdirSync(DIR).map(name => { 
const path = path.resolve(DIR, pathname)
const contents = fs.readFileSync(path, {encoding:'utf8', flag:'r'})
    return { path, contents }
})
```

This reads all the files inside the `DIR`. Of course we want to filter the files with regular expressions or else. If they are JS files, you might be better off utilizing your code bundler. That way you can generate the output better.

Or if you are doing black-box testing, you can setup a `json` file and setup the base URL there. Then you could use `axios` to make the requests from the configurations of each suite (or directly from the suites).

## Generate the DOM
Since we don't want to deal with string search, we are going to parse the text contents to an object that represents DOM. `jsdom` does a good job generating a `window` object. In the perfect world, we would like to test exactly what the program outputs. So having a `window` object helps.

But lets say we are using `libxml2`, just cuz (or some valid purpose). There would be an XML tree that you can get the data stored in the HTML. But you wouldn't have interactivity. That might be okay for you, in the end it is your own testing framework. But this is why this step is important. You can parse with anything, however that isn't enough for complete testing. If you want to add interactivity, you can pass it to a JavaScript engine.

Or render with WebView2 then inject some scripts? Do what you want!

## Getting the elements
There are certain ways of accessing data from DOM. The simplest way of selecting elements are JS selector functions (like `getElementById` or `querySelector`). Like zis: `document.getElementById("534809809354").textContents`.

Okay, but there are more to selecting elements. This can be the most painful part of writing tests, especially on end to end testing. Therefore you can develop some systems to make it easier to select elements on your framework.

Let's get back to the `libxml2` example. You can select the nodes with XPath and get the data from there. There are browsers support copying the elements selector as XPath. So when the developer is writing tests, it wouldn't be much of a hassle.

## Assertion
You can pretty much say `if equals to this, do this, else do this` but you won't have much control over the checks being made in the tests. By using assertions, you can generate test outputs better. If you make your own assert function, you can bind it to callbacks and make a flow so that your framework can track what is happening.

Not just that, but you can provide good functionality with preparing those functions. There are libaries for assertions such as `Chai.js`.

## Additions
If there isn't any additional features that your framework can do beside what we have talked about, then it wouldn't be that interesting isn't it? You decide what it does. Maybe mail all test reports to `test-reports@berkekaragoz.com`?

## End
These make a testing framework (or a system)... So it wasn't all magic?
