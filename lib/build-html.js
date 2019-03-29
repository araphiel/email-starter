// Grabs all .mjml files located in the archive & builds them relative to root
// This allows us to use mj-include regardless of where the .mjml is located.

const { statSync, readFile, outputFile } = require("fs-extra");
const { parse, resolve } = require("path");
const recursive = require("recursive-readdir");
const mjml2html = require("mjml");

recursive("archive", (err, files) => {
  let arr = [];

  files.forEach((file, idx) => {
    const { dir, name } = parse(file);
    const dirName = dir.replace("archive/", "");

    const getDate = date => {
      let options = {
        timeZone: "UTC",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      };
      let event = new Date(date);

      return event.toLocaleDateString("en-US", options);
    };

    const { birthtime, mtime } = statSync(file);

    const creationDate = getDate(birthtime);
    const editedDate = getDate(mtime);

    // create array of links for local browsing
    const url = encodeURI(`/${dirName}/${name}.html`);
    const link = `
        <li class="lh-copy pv3 ba bl-0 bt-0 br-0 b--dotted b--black-30">
            <a class="f4 fw6 db navy link dim" href="${url}">${name}</a>
            <span class="f7 navy mt0">${dirName}</span>
        </li>
        `;
    arr.push(link);

    // read .mjml and create .html
    readFile(file, "utf-8")
      .then(data => {
        const options = {
          beautify: true,
          filePath: resolve("snippets"),
          minify: true
        };

        const { html } = mjml2html(data, options);

        const newFile = `dist/${dirName}/${name}.html`;

        outputFile(newFile, html).catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  });

  // create html file for viewing compiled html
  const listHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <meta name="robots" content="noindex, nofollow">
            <title>Email Repo</title>
            <link rel="stylesheet" href="https://unpkg.com/tachyons/css/tachyons.min.css"/>
            <style>.bar {height: 5px; width: 0%; background: #331f65; position: fixed;top: 0;left: 0;}</style>
        </head>
        <body class="w-100 avenir bg-white">
            <div class="pa3 pa5-ns">
                <h1 class="tc">Email Repo</h1>
                <ul class="list pl0 measure center">
                    ${arr.join("")}
                </ul>
            </div>
            <div class="bar"></div>
            <script>
                let bar = document.querySelector(".bar");
                window.addEventListener("scroll", () => {
                    let max = document.body.scrollHeight - innerHeight;
                    bar.style.width = (pageYOffset / max) * 100 + '%';
                });
            </script>
        </body>
        </html>
    `;

  outputFile("dist/index.html", listHTML);
});
