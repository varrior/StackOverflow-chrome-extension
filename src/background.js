/*global chrome*/
chrome.runtime.onMessage.addListener(function(message, sender, senderResponse){
    fetch(`http://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${message.data}&site=stackoverflow`).then(response => response.text())
        .then(data => {
            let sendObj = JSON.parse(data)
            senderResponse({res: sendObj})
        }
    )

    return true
})