Provide Graphql Backend for restaurnat 

---

Folder structure:

<pre>
/migrations: Database migration files  
/scripts: Script to load data  
/src   
    /model: Database models  
    /repo: Provides wrapper functions for database  
    /service: Contains all buiness logic  
    /resolver: Graphql resolvers  
    /schema: Graphql schema  
    /interfaces: Typescript interfaces  
    /lib: External libs
</pre>
---

Project setup:

`git clone git@github.com:ankkho/interview-assignment.git `  
`cd interview-assignment`   
`npm i`  
`npm run dev`

Run ETL script:
`npm run seed`

Starting docker:  
`cd interview-assignment`  
`docker-compose build && docker-compose up`

Run a migration:  
`npx sequelize db:migrate`

More options:  
`npx sequelize --help`