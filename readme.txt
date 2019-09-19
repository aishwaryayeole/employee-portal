Please find below information of the employee management portal(UI coding assignment).

### Prerequisites

(Node >= 6 and npm >= 5.2)

Install NodeJS
	Make sure to install latest NodeJS in your computer. Then, run:
	sudo npm install npm -g 
	
Install Java
	Make sure to install Java in your computer. you can check by running:
	java -version
	(else Install from here: https://www.java.com/en/download/help/download_options.xml)
	
Chrome browser 


### Please follow below steps for running application.
Step 1: To run the application
	Open the amdocs-employee-portal folder in terminal/command prompt and execute following commands:
		1. cd my-app
		2. npm install
		3. npm start
	Application will be hosted on url: http://localhost:3000/#/
	
Step 2: To perform end to end testing on application
	Open the amdocs-employee-portal folder in terminal/command prompt and execute following commands:
		1. cd my-app
		2. npm start (only if any other instance on another terminal/command prompt is not running)
		3. npm run nightwatch
	Apllication will get start automatically on http://localhost:3000/#/ and e2e testing will start.
	
	
	
I have completed the below Bonus Questions asked:
1. Add a local pagination to the interface showing results so that five users are shown at a time.
-> Addeddded pagination in the search list of User

2. Implement some kind of automatic testing for this application.
-> Implemented end to end testing using Nightwatch.js testing framework ans Selenium (webDriver)

3. Make sure 'alias' is not hard-coded and comes from some configuration 
settings. 
-> Value of alias is stored in .properties file and is retrieved from the same.

Extra functinality added:
1. Logout functionality
2. Added sorting functionality to user table