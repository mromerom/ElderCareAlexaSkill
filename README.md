# ElderCare Alexa Skill

## Motivation
This was created as an independent investigation for CMP_SC 4990. The motivation to take on this project can be divided into three parts: creating a piece of software using a non-visual interface, creating a simple way for patients to access personal health information bypassing complex visual interfaces, and learning something new.

## Use of Node Modules
In order for the various Node.js modules to work with our skill, we need to include them in a folder, and before that we need to ensure that we have Node.js installed on our machine. If we do not have it installed, we can go to [nodejs.org] (https://nodejs.org/en/) and download LTS Node.js. We then need to create a directory in which our project will exist. Once that directory is created, in our terminal we will run the following command:

`npm init`

It will make us fill out some prompts, but we can just hit our return key until it is done prompting us. After this we will need to run a separate command for the required node modules, inside of our project folder. The command is

`npm i alexa-sdk aws-sdk es6-promisify request@2.81.0 --save`

This will create a node_modules folder in our project directory. Once this is done, we can create our code file and we will title it index.js. Then, after we have written and saved our code, we will select our node_modules folder and our index.js file and compress those into a .ZIP file (NOTE: we cannot simply compress the directory with the modules and the index file, we need to specifically select those two items in the project directory and compress those). With this new .ZIP file, we will return to our tab with our Lambda function, ensure that the in-browser’s code editor dropdown menu is set to “Upload a .ZIP file”, upload our .ZIP file, and click the “Save” button. Once this is saved, we are essentially done setting up our skill, and it should be ready to test.

