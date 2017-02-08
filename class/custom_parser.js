var table = require('./tables');

var custom_table = table.custom_table.custom;

var CustomParser = function () {  

    //returns null if no match found .. returns object of the msg module if match found
    this.parseCustomQuery = function(q) {

        console.log("entering custom parse class:" + q);
        console.log(custom_table)

        for(var i=0;i<custom_table.length;i++) {


            var match = custom_table[i].req.query;
            var regex_str = match.replace(/{{[a-z]*}}/g, "(.*)*");
            var regex_str = regex_str.replace(/(\[\[([a-z]*)\]\](\s)*)/g, "[$2]*[$3]*");
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