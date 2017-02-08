module.exports = {
  action_table : {
  "action": [{
    "matches": ["show", "display", "give"],
    "call_module": "123",
    "res_case": "list"
  }, {
    "matches": ["send", "forword"],
    "call_module": "123",
    "res_case": "action"
  },{
    "matches": ["who","where","which","what"],
    "call_module": "123",
    "res_case": "question"
  },{
    "matches": ["does","anyone", "is"],
    "call_module": "123",
    "res_case": "yesorno"
  }]
},


  action_type_table : {
  "type": [{
    "matches": ["users", "members", "skills", "skill"],
    "call_module": "123"
  }, {
    "matches": ["mail", "message", "sms", "phone", "email"],
    "call_module": "123"
  }, {
    "matches": ["works", "working", "work","sit","sits","sitting"],
    "call_module": "123",
    "type_of_match":"work"
  }]
},

  


  greeting_table : {
  "greetings": [{
    "matches": ["hi","hello", "Hey", "whatsupp", "whatsapp", "namaskara"],
    "resMsg": ["Hi!", "Hello ! Glad to see You!", "Hello , How can i Help You?"],
    "call_module": "123"
  },{
    "matches": ["how are you","how a you", "what about you", "How are you feeling", "hw r u", "how r you","how are u", "hw are you", "how You", "how r u"],
    "resMsg": ["I am Good!", "Fine! How can i help You","I'm having a great day"],
    "call_module": "123"
  },
  {
    "matches": ["Good morning","good afternoon", "good evening", "good night", "good noon", "morning","afternoon", "evening", "night", "nice morning"],
    "resMsg": ["Hello ! Good [[daystate]]", "hi, Good [[daystate]]"],
    "call_module": "123"
  },
   {
    "matches": ["Bye","see you", "see u"],
    "resMsg": ["Good Bye!", "Okay Bye!, have a wonderfull day", "See You!"],
    "call_module": "123",
    "is_quote":true
  },
  {
    "matches": ["okay", "ok"],
    "resMsg": ["Ok"],
    "call_module": "123"
  }
  ]
},
  

  concat_table : {
  "concats": [{
    "matches": ["to"],
    "call_module": "123"
  }, {
    "matches": ["with"],
    "call_module": "123"
  }, {
    "matches": ["having"],
    "call_module": "123"
  },{
    "matches": ["of"],
    "call_module": "123"
  },{
    "matches": ["in"],
    "call_module": "123"
  }, {
    "matches": ["at"],
    "call_module": "123"
  }, {
    "matches": ["knows"],
    "call_module": "123"
  },{
    "matches": ["know"],
    "call_module": "123"
  }

  ] 
},

 extra_ch_table : {
  "extra": [{
    "matches": ["is","at","are","the","does","were","work","office","working","work", "an", "a","in","say", "me","adress","address"],
    "call_module": "123"
  },
  {
    "matches": ["?"],
    "call_module": "123"
  }
  ]
},

 custom_table : {
  "custom": [
 
      {
              "req":{
                "query":"Good {{alpha}} {{alpha}}"
              },
              "res":{
                "msg":"Hello {{$2}}, Good [[daystate]]!!!"
              }
      },
       {
              "req":{
                "query":"I am {{alpha}}"
              },
              "res":{
                "msg":"Hello {{$1}}, How can i help u?"
              }
      },
       {
              "req":{
                "query":"[[send]] mail [[to]] {{alpha}} with {{alpha}}"
              },
              "res":{
                "msg":"Mail Sent to {{$1}} with {{$2}}"
              }
      }

  ]
 }

}