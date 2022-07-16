const toneanalyzerapikey = "_faoS8mAvH-l3VhkgBFElVvtxJRTbsuRUfrSbWGec549";
// document.querySelectorAll(`div[data-testid^="solid-message-bubble"]`)
// https://developer.ibm.com/tutorials/how-to-create-a-browser-extension-that-leverages-ibm-watson-cognitive-api/
// this is from the official IBM tutorial, but HEAVILY modified, since that code was hot garbage
async function getAPIKeyV2(apikey) {
  const res = await fetch("https://iam.bluemix.net/identity/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    },
    body: encodeURI("grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=" + apikey)
  })
  return (await res.json()).access_token;
}

async function callToneAnalyzer(word) {
  var token = await getAPIKeyV2(toneanalyzerapikey);
  console.error(token);
  var inputContent = String(word.selectionText).replace(/%20/g, "");
  let res = await fetch("https://api.us-south.tone-analyzer.watson.cloud.ibm.com/api/v3/tone?sentences=true&version=2016-05-19&text=" + inputContent, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json"
    }
  })

  var obj = await res.json();
  console.error(JSON.stringify(obj));
  alert(obj.document_tone.tone_categories[0].tones.reduce((rest, {tone_name, score}) => `${rest}${tone_name} = ${score * 100}%\n`, ""));
};

console.log(chrome);

chrome.contextMenus.create({
  title: "Tone analysis",
  id: 'parent',
  contexts: ["selection"],
  onclick: (word) => callToneAnalyzer(word)
});

chrome.contextMenus.create({
  title: "Send email",
  parentId: "parent",
  id: 'child7',
  contexts: ["selection"],
  onclick: sendEmail
});

function sendEmail() {
  var xmlRequest = new XMLHttpRequest();
  var target_email = "raghav.lall@hotmail.com";
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