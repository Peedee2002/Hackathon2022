const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// https://cloud.ibm.com/apidocs/natural-language-understanding?code=node#features-examples
// this is from the official IBM tutorial

function bigFunction (text) { 
  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2022-04-07',
    authenticator: new IamAuthenticator({
      apikey: '_faoS8mAvH-l3VhkgBFElVvtxJRTbsuRUfrSbWGec549',
    }),
    serviceUrl: 'https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/6f0caca6-4a6b-4260-8119-d2ea0633b9cb',
  });
  
  const analyzeParams = {
      'text': text,
      'features': {
        'emotion': {
        }
      }
    };
  
    naturalLanguageUnderstanding.analyze(analyzeParams)
    .then(analysisResults => {
      console.log(JSON.stringify(analysisResults.result.emotion.document.emotion, null, 2));
    })
    .catch(err => {
      console.log('error:', err);
    });
}

texts = ['Hey, you are disgusting', 'You are amazing!!']

texts.forEach(text => {
  bigFunction (text)
});