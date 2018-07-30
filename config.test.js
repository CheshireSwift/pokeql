const { mockServer } = require("graphql-tools");

const { typeDefs } = require("./config");

describe("the API", () => {
  const server = mockServer(typeDefs);

  it("has valid type definitions", async () => {
    expect(async () => {
      await server.query(`{ __schema { types { name } } }`);
    }).not.toThrow();
  });

  it("finds Pokémon by name", async () => {
    const { data } = await server.query(`{
      pokemon(names: ["charizard"]) {
        id
        name
      }
    }`);

    expect(data.pokemon[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String)
    });
  });
});
