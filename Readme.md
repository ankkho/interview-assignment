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
`npx sequelize db:migrate`

Run ETL script:
`npm run seed`

Starting docker:  
`cd interview-assignment`  
`docker-compose build && docker-compose up`

More options:  
`npx sequelize --help`

----

Query:

<pre>

Search restaurant by name

query Query($query: String!, $limit: Int!, $offset: Int!) {
  searchRestaurantQuery(query: $query, limit: $limit, offset: $offset) {
    id
    name
  }
}

variables:

{
  "query": "sam",
  "limit": 10,
  "offset": 0
}

</pre>

<pre>

Search menu by name

query Query($query: String!) {
  searchMenuQuery(query: $query) {
    id
    dishName
    price
    restaurant {
      name
      id
    }
  }
}

variables:

{
  "query": "sam"
}

</pre>

<pre>

Search restaurant based on datetime

query Query($dateTime: DateTime!) {
  getRestaurantsQuery(dateTime: $dateTime) {
    restaurantId
    from
    to
    day
    restaurant {
      name
      id
    }
  }
}

variables:

{
  "dateTime": "2022-04-03T19:46:15.849Z"
}

</pre>

<pre>

Search menu and restaurant based on min and max price

query Query($maxPrice: Int!, $minPrice: Int!) {
  searchMenuByPriceRangeQuery(maxPrice: $maxPrice, minPrice: $minPrice) {
    id
    dishName
    price
    restaurant {
      id
      name
    }
  }
}

variables:

{
  "minPrice": 10,
  "maxPrice": 20,
}

</pre>

Mutation:

<pre>

Create new order

mutation Mutation($newOrderParams: newOrderAttr) {
  newOrderMutation(newOrderParams: $newOrderParams) {
    message
    data {
      transactionId
      orderNumber
      status
      createdAt
    }
  }
}

variables:

{
  "newOrderParams": {
    "userId": 2,
    "restaurantId": 1,
    "itemDetails": [
      {
        "id": 1,
        "qty": 2
      }
    ]
  }
}

</pre>