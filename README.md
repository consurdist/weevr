# Weevr

For *local development*, clone the repo and switch to the ***dev*** branch:
* `git clone https://github.com/fischsauce/weevr.git && cd weevr`
* `git checkout dev && git pull`

Check the current branch:
* `git branch`

***
***
## local setup (**dev branch**):

Install dependencies (frontend):
* `npm install`

Install dependencies (backend):
* `cd backend && npm install && cd ..`

Run local server (from root directory):
* `npm run dev`

*the server should now be accessible at `http://localhost:3000`*
***
Install mariadb:
* `sudo apt install mariadb && sudo mariadb`

Add a new database and user:
* `create database birdidapp;`
* `grant all privileges on birdidapp.* TO 'birdy'@'%' identified by 'W33verDB';`
* `flush privileges;`
* `quit`

Migrate the backup db:

* `sudo mysqldump -u root -p birdidapp < birdidapp.sql`

If you have issues with root user/password, try following these steps: https://mariadb.com/kb/en/mysql_secure_installation/


***
***

## Remote setup (**prod**)
