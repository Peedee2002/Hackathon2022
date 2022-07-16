chrome.contextMenus.create({
  title: 'Text analysis',
  id: 'parent',
  contexts: ['selection'],
  onclick: callTextAnalyzer,
});

async function callTextAnalyzer() {
  let res = await fetch('http://localhost:8000/callAnalyser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      "analyse": "hi how are you i am good thank you indeed good thanks",
    }),
  });

  var obj = await res.json();
  console.log(JSON.stringify(obj));
  alert(JSON.stringify(obj));
}
