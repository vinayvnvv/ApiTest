var fs = require('fs');
var custom_table = '';
var file_location = 'json/custom_table.json';

       fs.readFile(file_location, (err, data) => {
        if (err) throw err;
        data = String(data);
        data = data.slice(data.indexOf("{"), data.lastIndexOf("}") + 1);
        data = `[` + data + `]`;
        custom_table = JSON.parse(data);
      });

var CustomParser = function () {  


     


    //returns null if no match found .. returns object of the msg module if match found
    this.parseCustomQuery = function(q) {

        console.log("entering custom parse class:" + q);
        console.log(custom_table)

        for(var i=0;i<custom_table.length;i++) {


            var match = custom_table[i].req.query;
            var regex_str = match.replace(/{{[a-zA-Z\|]*}}/g, function($1) {
   
                       console.log($1);
                       var array = $1.replace(/{{([a-zA-Z|]*)}}/g,"$1").split("|");
                       console.log(array);
                       var rtrn = "";
                       for(var i=0;i<array.length;i++) {
                           if(array[i] == 'all')  return "([.*]+)*";
                           if(array[i] == 'alpha')  rtrn += "a-zA-Z";
                           if(array[i] == 'num')    rtrn += "0-9";
                           if(array[i] == 'space')  rtrn += "\\s";
                           if(array[i] == 'email')  return "([a-zA-Z0-9\_\-]+\@[a-zA-Z0-9\_]+\.[a-zA-Z0-9]+)";
                       }
                       console.log("rtrn=" + rtrn);
                       rtrn = "([" + rtrn + "]*)";
                       return rtrn;
              
            });
            regex_str = regex_str.replace(/\[([a-zA-Z\s]*)\]/g, "[$1]*");
            console.log(regex_str)
            var regex = new RegExp(regex_str, "i");

            var str = q;
            var matched = str.match(regex);

            if(matched!=null) {
                var res_str = custom_table[i].res.msg;
                var response  = {module:{
                                    id:1,
                                    msg: this.parse_response(res_str, matched)
                                    }
                    };

                if(custom_table[i].res.before_msg != undefined) response.module.beforeMsg = [{msg:this.parse_response(custom_table[i].res.before_msg, matched)}];
                if(custom_table[i].res.after_msg != undefined) response.module.afterMsg = [{msg:this.parse_response(custom_table[i].res.after_msg, matched)}];
  
                if(custom_table[i].res.sub_info != undefined) {
                   response.module.type = custom_table[i].res.sub_info.type;
                   var f = "" + response.module.type + "";
                   response.module.sub_info = {items:[]};
                   console.log(response.module.sub_info)
                   for(var j=0;j<custom_table[i].res.sub_info.text.length;j++) {
                        var itm = {name:this.parse_response(custom_table[i].res.sub_info.text[j], matched)};
                        response.module.sub_info.items.push(itm);
                   }
                }
                //console.log(response) 
                return response;
            } 

        }

         return null;

    }

    this.parse_response = function(q, array) {
                console.log(array)
                var re_regex = q.replace(/{{\$([0-9]*)}}/gi, function($1) {
                        return array[$1.replace(/[\}\{\$]*/g,'')];
                });

                return re_regex;
  }


}

module.exports = CustomParser;