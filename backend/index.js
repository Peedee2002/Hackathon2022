import NaturalLanguageUnderstandingV1 from 'ibm-watson/natural-language-understanding/v1';
import { IamAuthenticator } from 'ibm-watson/auth';
import express from 'express';
import 'dotenv/config';
// document.querySelectorAll(`div[data-testid^="solid-message-bubble"]`)
// https://developer.ibm.com/tutorials/how-to-create-a-browser-extension-that-leverages-ibm-watson-cognitive-api/
// this is from the official IBM tutorial, but HEAVILY modified, since that code was hot garbage

const app = express();

app.use(express.json());

async function callToneAnalyzer(word) {
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
      apikey: process.env.API_KEY,
    }),
    serviceUrl:
      'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/6f0caca6-4a6b-4260-8119-d2ea0633b9cb',
  });

  const analyzeParams = {
    text: String(word).replace(/%20/g, ''),
    features: {
      emotion: {},
    },
  };

  const analysisResults = await naturalLanguageUnderstanding.analyze(
    analyzeParams
  );
  console.log(analysisResults.result.emotion.document.emotion);
  return analysisResults.result.emotion.document.emotion;
}

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

app.post('/callAnalyser', async (req, res) => {
  try {
    res.send(await callToneAnalyzer(req.body.analyse));
  } catch {
    console.log('error');
  }
});

app.post('/howManyEvil', async (req, res) => {
  const values = await Promise.allSettled(req.body.analyse.map(callToneAnalyzer));
  const fullfilled = values.filter((val) => val.status == "fulfilled");
  res.send({"evil": fullfilled.filter((val) => val.value.anger > 0.75).length})
})

app.listen(8000, () => {
  console.log('yeet on 8000');
});
