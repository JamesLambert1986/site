module.exports = function (env) {
  // if you need accss to the internal nunjucks filter you can just env
  // see the example below for 'safe' which is used in 'filters.log'
  var nunjucksSafe = env.getFilter('safe')
  var nunjucks = require('nunjucks')
  const prettier = require("prettier")

  /**
   * object used store the methods registered as a 'filter' (of the same name) within nunjucks
   * filters.foo("input") here, becomes {{ "input" | foo }} within nunjucks templates
   * @type {Object}
   */
  var filters = {}

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  filters.encode = function(str) {

    // List of HTML entities for escaping.
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
    };



    // Regex containing the keys listed immediately above.
    var htmlEscaper = /[&<>"']/g;
    

    str = str.replace(htmlEscaper, function(match) {
      return htmlEscapes[match];
    });

    str = str.replace(/\n\s*\n\s*\n/g, '\n\n');

    return nunjucksSafe(str);
  }

  filters.assign = function(array,index,row) {

    if(typeof array === "undefined")
      array = {};
    
    if(!array[index])
      array[index] = [];

    array[index].push(row);

    return array;
  }


  filters.stage_encode = function(str) {

    str = str.replace(/^\s+|\s+$/g, '');
    str = prettier.format(str, {parser: "html", jsxBracketSameLine: false, htmlWhitespaceSensitivity: "ignore"})
    str = str.trim().replace(/<span class="system-stage__label">(.*?)<\/span>/gm, "<!-- $1 -->");
    
    str = filters.encode(str);

    return nunjucksSafe(str);
 
   
  }
  filters.nunjucks = function(str) {
    
    str = nunjucks.renderString(str);
    
    return nunjucksSafe(str);
  }
  filters.nunjucks_encode = function(str) {

    str = filters.nunjucks(str);
    str = filters.encode(str);

    return nunjucksSafe(str);
  }

  filters.round1000 = function(str) {

    str = Math.round(parseInt(str) / 1000);
    
    return str;
  }
  
  filters.tofixed = function(str,decimals) {

    str = parseFloat(str).toFixed(decimals);

    return str;
  }

  filters.currency = function(str) {

    str = parseFloat(str).toFixed(2);
    prepend = "";

    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    if(str < 0){
      str = Math.abs(str);
      prepend = "-";
    }
    
    str = numberWithCommas(str);

    str = str.replace(/(\.00)$/,"");

    str = prepend+"£"+str;

    return str;
  }

  filters.percent = function(val,max) {

    val = Math.round((parseInt(val) / parseInt(max)) * 100);
    
    return val;
  }

  filters.object = function(str) {

   str = JSON.stringify(str);
   
   str = filters.encode(str);
   str = str.replace(/\\n/g, '\n');
   //str = str.replace(/\\&quot;/g, '"');
   str = str.replace(/,&quot;/g, ',\n\t"'); 
   str = str.replace(/{&quot;/g, '{\n\t"'); 
   str = str.replace(/&quot;}/g, '"\n}'); 

    return nunjucksSafe(str);
  }

  filters.unique = function(str, id) {
    return str.replace(/\[id\]/gi, id);
  }

  /* format numbers into a nice format: £1,000.91 */
  filters.currency = function(str) {

    str = parseFloat(str).toFixed(2);
    prepend = "";

    function numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }

    if(str < 0){
      str = Math.abs(str);
      prepend = "-";
    }
    
    str = numberWithCommas(str);
    str = str.replace(/(\.00)$/,"");
    str = prepend+"£"+str;

    return str;
  }

  /* mimics javascripts toFixed functionality */
  filters.tofixed = function(str,decimals) {

    str = parseFloat(str).toFixed(decimals);

    return str;
  }

  /* Works like javascript push to array function */
  filters.push = function(array,row) {

    if (typeof array == 'object'){
      array = {...array, ...row};
    }
    else {
      array.push(row);
    }
    
    return array;
  }
  
  
  filters.chartcsv = function(str,valueDisplay) {


    str = str.trim();

    let array = [];
    let temparray = str.split('\n');
    let group = [];

    temparray.forEach(function(row,i) {


      let arrRow = row.split(',');

      if(i == 0){

        arrRow.forEach(function(tempgroup,t) {
          if(t != 0){
            group.push(tempgroup);
          }
        });

      }
      else {

        let temprow = {
          "group": arrRow[0],
          "label": arrRow[1],
          "data": []
        };

        arrRow.forEach(function(tempdataitem,t) {
          if(t > 1){

            let value = parseInt(tempdataitem);
            let display = tempdataitem;

            if(valueDisplay == "currency"){

              display = "£"+display;
            }

            let tempdata = {
              "label": group[t-1],
              "value": value,
              "display": display
            }

            temprow.data.push(tempdata);
          }
        });

        array.push(temprow);
      }

    });

    return array;
  }
  /* Works like javascript push to array function */
  filters.remove_duplicates = function(array) {

    array = [...new Set(array)];
    //array.push(item);
    return array;
  }

  
  filters.chart_create_points = function(array) {

    for (const index in array) {
      
      const line = array[index];
      const total = Object.keys(line).length;
        
      for (const sub_index in line) {

        const point = line[sub_index];

        let y = (100-point);

        let new_point = (((200/total) * (sub_index)) + ((200/total)/2))+","+y;

        line[sub_index] = new_point;
      }
      
      array[index] = line;
    }

    return array;
  }

  filters.filter_ranges = function(lines,chart_ranges) {

    const new_lines = {};

    for (const index in lines) {

      if(chart_ranges[index]){
        new_lines[index] = lines[index];
      }
    }
    return new_lines;
  }


  filters.create_ranges = function(lines,chart_ranges) {

    const ranges = {};

    for (const index in lines) {

      if(chart_ranges[index]){
        
        const startline = chart_ranges[index][0];
        const endline = chart_ranges[index][1];

        const arrStartline = lines[startline];
        const arrEndline = lines[endline].reverse();
        
        ranges[index] = arrStartline.concat(arrEndline);
      }
    }

    return ranges;
  }

  filters.ranges_display = function(data,chart_ranges) {

    const groups = data['x-axis'];

    for (const index in groups) {
      const group = groups[index];
     
      for (const sub in group['data']) {
        
        const range = parseInt(sub)+1;

        if(typeof chart_ranges[range] != "undefined"){

          const lowValueIndex = chart_ranges[range][0];
          const highValueIndex = chart_ranges[range][1];


          const display = group['data'][lowValueIndex-1]['display'] + " - " + group['data'][highValueIndex-1]['display'];

          group['data'][sub]['display'] = display;
        }
      }

      groups[index] = group;
    }

    data['x-axis'] = groups;

    return data;
  }

  filters.is_string = function(possible_string) {

    return typeof possible_string == 'string';
  }
  filters.typeof = function(obj) {

    return typeof obj;
  }
  


  filters.splitProps = function(string) {

    string = string.split(" properties:")[0];


    var stringParts = string.split(" selector ");

    string = '<strong>'+stringParts[0]+'</strong> '+stringParts[1];

    // Fix psuedo classes
    string = string.replace('.hover',':hover');
    string = string.replace('.focus',':focus');
    string = string.replace('.active',':active');

    return string;
  }

  filters.displayProps = function(string) {

    string = string.split(" properties:")[1];

    var object = JSON.parse(string);

    return object;
  }

  filters.consolelog = function(string) {

    console.log(string);
  }

  filters.indexed = function(data) {
    var alpha = {
      "a": 'false',
      "b": 'false',
      "c": 'false',
      "d": 'false',
      "e": 'false',
      "f": 'false',
      "g": 'false',
      "h": 'false',
      "i": 'false',
      "j": 'false',
      "k": 'false',
      "l": 'false',
      "m": 'false',
      "n": 'false',
      "o": 'false',
      "p": 'false',
      "q": 'false',
      "r": 'false',
      "s": 'false',
      "t": 'false',
      "u": 'false',
      "v": 'false',
      "w": 'false',
      "x": 'false',
      "y": 'false',
      "z": 'false'
     };

     for (const index in data) {
      const group = data[index];
      alpha[group['group_id']] = 'true';
     }

    return alpha;
  }


  


  /**
   * logs an object in the template to the console on the client.
   * @param  {Any} a any type
   * @return {String}   a script tag with a console.log call.
   * @example {{ "hello world" | log }}
   * @example {{ "hello world" | log | safe }}  [for environments with autoescaping turned on]
   */
  filters.log = function log (a) {
    return nunjucksSafe('<script>console.log(' + JSON.stringify(a, null, '\t') + ');</script>')
  }

  return filters
}
