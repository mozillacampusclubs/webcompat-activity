fs = require('fs')
template_file = "template.html";
var file_data;
fs.readFile(template_file, 'utf8', function(err, template_data) {
    if (err) {
        return console.log(err);
    }
    console.log(template_data);
    fs.readFile(process.argv[2], 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        lessons = data.split("\n")
        var lessons_html="";
        for (var i = 0; i < lessons.length; i++) {
          if(lessons[i])
            lessons_html = lessons_html + '<li><a href=\"'+lessons[i].replace(" ", "-")+'.html\">'+lessons[i]+'</a></li>'+"\n";
        }
        template_data = template_data.replace("TEMPLATE_MENU", lessons_html);
        for (var i = 0; i < lessons.length; i++) {
            generate_template(template_data, lessons, i);
        }
        console.log(data.length);
    });
    //write_to_file(file_data)
        //console.log(file_data);
});


function generate_template(template_data, lessons, position) {
    template_data = template_data.replace(/TITLE/g, lessons[0]);
    template_data = template_data.replace(/LESSON/g, lessons[position]);
    write_to_file(template_data, lessons[position]);
}

function write_to_file(file_data, filename) {
    console.log(file_data)

    fs.writeFile(filename.replace(" ", "-")+".html", file_data, function(err, data) {
        if (err) {
            return console.log(err);
        }

    });
}
