module.exports ={
    HTML:function(title){
        return `
        <!doctype html>
        <html>
        <head>
          <title>WEB1</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB + ${title}</a></h1>
          <div>
            
        </body>
        </html>
        `;
    }
}