# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
    - Preuzeti NodeJS sa oficijalnog sajta verziju v6.10.2 i instalirati.
   
    - Preuzeti MongoDB sa oficijalnog sajta verziju 3.2 i instalirati. Otvoriti folder gde je MongoDB instalirat (MongoDB\Servers\3.2) i sa komandom 'mongod' pokrenuti bazu.
   
    - Za importovanje baze, otvoriti terminal i iskoristiti komandu
        mongorestore -d <database_name> <directory_backup>
        baza se nalazi u folderu test_cvcreator.db.
        Gde ce:
            database_name - test_cvcreator
            directory_backup - putanja do folder test_cvcreator.db koji se nalazi u projektu
   
    - U root projekta porkenuti npm install, komanda ce preuztei sve dependecies za back-end.
   
    - Pokrenuti bower install, komanda ce preuztei sve dependencies za front-end.
   
    - Pokrenuti app preko terminala node server.js. Za uspesan pokrentu server dobice se poruka 'Server started on http://localhost:3000'.
   
    - Pristupiti sajtu na adresi i portu 'http://localhost:3000'.
    
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact