This is a simple chrome extension using react js. I only show how write chrome extension both content and background script. This short content script (App.js) I was coding very fast and of course it could be better :) If you want push this script to chrome, you have to build production app (npm run build) and next upload build folder to chrome.
One important thing: paths to files (to content and background scripts) in manifest.json are set to build folder.

In this extension you can search questions on StackOverflow and get only answered questions. Google for this purpose is definitely better :)
