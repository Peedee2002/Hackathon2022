import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
// document.querySelectorAll(`div[data-testid^="solid-message-bubble"]`)
// https://developer.ibm.com/tutorials/how-to-create-a-browser-extension-that-leverages-ibm-watson-cognitive-api/
// this is from the official IBM tutorial, but HEAVILY modified, since that code was hot garbage


async function callToneAnalyzer(word) {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
      apikey: '_faoS8mAvH-l3VhkgBFElVvtxJRTbsuRUfrSbWGec549',
    }),
    serviceUrl: 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/6f0caca6-4a6b-4260-8119-d2ea0633b9cb',
  });

  const analyzeParams = {
    'text': String(word.selectionText).replace(/%20/g, ""),
    'features': {
      'emotion': {
      }
    }
  };

  const analysisResults = await naturalLanguageUnderstanding.analyze(analyzeParams);

  alert(Object.entries(analysisResults.result.emotion.document).reduce((rest, [tone_name, score]) => `${rest}${tone_name} = ${score * 100}%\n`, ""));
};


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