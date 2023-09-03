# BIDDING PROCESSES - BUILT WITH NESTJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Running the project


```bash
npm i
cp .env.example .env
docker compose up -d
```

After running these commands you will be able to use the api!

* Visualize it easily with the Swagger UI on http://localhost:3000/docs


## Available routes

***POST*** /bidding/start-extraction
This route will start the extraction of the bidding processes and save them on MongoDB

***GET*** /bidding?
This route is for listing the existing saved biddings, accepting these query parameters:

* startDate
* processNumber
* summary
* itemDescription
* page
* take
