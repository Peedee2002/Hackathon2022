chrome.contextMenus.create({
  title: 'Text analysis',
  id: 'parent',
  contexts: ['selection'],
  onclick: callTextAnalyzer,
});

chrome.contextMenus.create({
  title: 'Send email',
  id: 'email',
  contexts: ['selection'],
  onclick: sendEmail,
});

async function callTextAnalyzer() {
  let res = await fetch('http://localhost:8000/callAnalyser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      "analyse": text,
    }),
  });

  var obj = await res.json();
  console.log(JSON.stringify(obj));
  alert(JSON.stringify(obj));
}

let list = [];
document.querySelectorAll(`div[data-testid^="solid-message-bubble"]`).forEach(
    (i) => list.push(i)
);

const text = list.map((val) => val.children[0].children[0]);


function sendEmail() {
  var xmlRequest = new XMLHttpRequest();
  var target_email = 'raghav.lall@hotmail.com';
  if (window.XMLHttpRequest) {
    xmlRequest.open(
      'POST',
      `https://maker.ifttt.com/trigger/trigger_email/with/key/bf6zxKZovTXRIycFmggtoQO-me1zGm6vswN-SBBwJYr?value1=${target_email}`
    );
    xmlRequest.send();
    xmlRequest.onreadystatechange = function () {
      if (xmlRequest.readyState == 4 && xmlRequest.status == 200) {
        alert('Notification sent');
      }
    };
  }
}