### Query

```
query getAllCourses {
  getCourses {
    id
    title
    author
    description
    topic
    url
  }
}

/////////////////////////////////

query getSingleCourse($courseID: Int!) {
  getCourse(id: $courseID) {
    title
    author
    description
    topic
    url
  }
}

{
  "courseID": 3
}

/////////////////////////////

query getCoursesForTopic($courseTopic: String!) {
  getCourses(topic: $courseTopic) {
    title
    author
    description
    topic
    url
  }
}

{
  "courseTopic": "Javascript"
}

///////////////////////

query getCoursesWithFragments($courseID1: Int!, $courseID2: Int!) {
  course1: getCourse(id: $courseID1) {
    ...courseFields
  }
  course2: getCourse(id: $courseID2) {
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

{
  "courseID1": 1,
  "courseID2": 3
}
```

### Mutation

```
mutation updateCourseTopic($id: Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

{
  "id": 1,
  "topic": "Python"
}
```