var xhr = new XMLHttpRequest();
xhr.addEventListener('readystatechange', sendGet);
// get the request ready to go / configure it with method and resource request
xhr.open('GET', './DataSet.json?t='+(new Date()).valueOf(),true);
// send the request off to the server
xhr.send();

function sendGet() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        // check status here and proceed
        if (xhr.status === 200) {
            // 200 means done and dusted, ready to go with the dataset!
            loadData(xhr.responseText);

        } else {
            // probably got some kind of error code, so handle that
            // a 404, 500 etc... can render appropriate error messages here
            console.error(`${xhr.status} : something done broke, son`);
        }
    } else {
        // request isn't ready yet, keep waiting...
        console.log(`Request state: ${xhr.readyState}. Still processing...`);
    }
}


// this receives the data payload from our AJAX request, parses it (turns the returned JSON object back into a plain JavaScript object) and renders the data to our view (the markup in index.html)
function loadData(data) {
    let myData = JSON.parse(data),
        userSection = document.querySelector('.user-section'),
        userTemplate = document.querySelector('#user-template').content;

    debugger;

    // loop through the JavaScript object and for each user, make a copy of the user template we find at the bottom of index.html, populate it with the user's data, and put that fresh copy in the users section in index.html

    for (let user in myData) {
        let currentUser = userTemplate.cloneNode(true),
            currentUserText = currentUser.querySelector('.user').children;

        currentUserText[1].textContent = myData[user].name;
        currentUserText[2].textContent = myData[user].role;
        currentUserText[3].textContent = myData[user].nickname;
        currentUserText[4].textContent = myData[user].sex;
        // add this new user to the view
        userSection.appendChild(currentUser);
    }

    console.log(data);
}