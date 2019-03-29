## Email Starter

We use an email templating language to build our emails called [MJML](https://mjml.io/). 

This helps provide a more consisent & simple development process for creating emails that work in all email clients.

Please visit the documentation to learn how to properly use it this system.

**https://mjml.io/documentation/**

#### Prerequisites

Please make sure the following are installed before starting.

- Git
- [Node.JS + NPM](https://nodejs.org/en/download/)

#### Development

Your working file will be called `index.mjml`. 

You can create this file yourself or use `npm start` to create one for you. Once you have finished working with this email 

1. `npm start` - Create a new email based on an existing template.

1. `npm run dev` - Start the dev enviroment for your email in progress

#### Testing

1. `npm test` -  Send your email from the CLI - useful for testing via Litmus or Email On Acid.

To use this, you will need a Sendgrid account & set their API Key in the .env file as `API_KEY`

#### Cleanup

Once you have finished working with your email:

 - Rename your file and place in the archive folder.
 - `npm run build-all` to generate your final HTML.


-----

#### NPM Commands


|  |   |
|---|---|
|`npm start`   | Create a new email from a template with live-reload preview. |
|`npm run dev`   | Starts the dev enviroment for your email work in progress. |
|`npm run build-all`   | Creates / updates HTML versions of all .mjml files located in the archive. |
|`npm test`   | Sends your email to Litmus for testing. |