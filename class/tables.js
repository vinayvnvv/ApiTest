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
    "matches": ["works", "working", "work"],
    "call_module": "123"
  }]
},

  greeting_table : {
  "greetings": [{
    "matches": ["hi","hello", "Hey", "whatsupp", "whatsapp", "namaskara"],
    "replace": ["Hi!", "Hello ! Glad to see You!", "Hello , How can i Help You?"],
    "call_module": "123"
  },{
    "matches": ["how are you","how a you", "what about you", "How are you feeling"],
    "replace": ["I am Good!", "Fine! How can i help You"],
    "call_module": "123"
  }]
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
    "matches": ["is","at","are","the","does","were","work","office","working","work", "?"],
    "call_module": "123"
  }
  ]
}

}