const { GraphQLServer } = require("graphql-yoga");
const fetch = require("node-fetch");

const typeDefs = `
type Query {
  hello(name: String): String!
  getPost(author_name: String!): Post
}

type Post {
  _id: Int
  slug: String
  title: String
  PublishedDate: String
  author_name: String
  image: [Image]  
  content: [Content]
  meta: [Meta]
}

type Content {
  brief: String
  extended: String
}

type Image {
    secure_url: String
    public_id: Int
}

type Meta {
  description: String
  keywords: String
  site_name: String
  title: String
  type: String
  url: String
}
`;

const resolveImage = parent => {
  const promises = image.map(async url => {
    const response = await fetch(url);
    return response.json();
  });

  return Promise.all(promises);
};

const resolvers = {
  Post: {
    image: resolveImage
  },
  
  Query: {
    hello: (_, { name }) => `Hello ${name || "World"}`,
    getPost: async (_, { id }) => {
      const response = await fetch(`http://localhost:3000/api/post/${id}/`);
      return response.json();
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
