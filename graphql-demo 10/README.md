## GraphQL ProjectMgmt App with Mongoose

```
npm i express
npm i graphql
npm i graphql-http
```

```
query Authorization {
  authorization
}

fragment ClientData on Client {
  id
  name
  email
  phone
}

fragment ProjectData on Project {
  id
  name
  description
  status
}

mutation AddClient {
  addClient(name: "Tomy", email: "tomy@email.com", phone: "775275") {
    ...ClientData
  }
}

mutation UpdateClient {
  updateClient(id: "64a53cd3268b149fcfcf33ee", phone: "888888") {
    ...ClientData
  }
}

query Clients {
  clients {
    ...ClientData
    projects {
      id
    }
  }
}

query Client {
  client(id: "64a52285aea52c51212048c4") {
    ...ClientData
    projects {
      id
    }
  }
}

mutation AddProject {
  addProject(
    name: "Project 1"
    description: "description"
    clientId: "64a52285aea52c51212048c4"
  ) {
    ...ProjectData
    client {
      name
    }
  }
}

mutation UpdateProject {
  updateProject(id: "64a52a72ad268864001783da", status: progress) {
    ...ProjectData
    client {
      name
    }
  }
}

query Projects {
  projects {
    ...ProjectData
    client {
      name
    }
  }
}

query Project {
  project(id: "64a52a96ad268864001783dd") {
    ...ProjectData
    client {
      name
    }
  }
}

mutation DeleteProject {
  deleteProject(id: "64a52aabad268864001783e7") {
    ...ProjectData
    client {
      name
    }
  }
}

mutation DeleteClient {
  deleteClient(id: "64a522b4aea52c51212048c6") {
    ...ClientData
    projects {
      id
    }
  }
}
```
