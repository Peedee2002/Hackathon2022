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
