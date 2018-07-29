const { ApolloServer, gql } = require('apollo-server')
const Pokedex = require('pokedex-promise-v2')
const P = new Pokedex()

const books = [
  {
    title: 'blah',
    author: 'blahblah',
  },
  {
    title: 'wibble',
    author: 'wobble',
  }
]

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type PokemonAbility {
    is_hidden: Boolean
    slot: Int
    ability: Ability
  }

  type Ability {
    name: String
  }

  type PokemonType {
    slot: Int
    type: Type
  }

  type Type {
    name: String,
  }

  type Pokemon {
    id: Int,
    name: String
    base_experience: Int
    height: Int
    is_default: Boolean
    order: Int
    weight: Int
    abilities: [PokemonAbility]
    # forms: [{
    #     name: butterfree,
    # }],
    # game_indices: [{
    #     game_index: 12,
    #     version: {
    #         name: white-2,
    #     }
    # }],
    # held_items: [{
    #     item: {
    #         name: silver-powder,
    #     },
    #     version_details: [{
    #         rarity: 5,
    #         version: {
    #             name: y,
    #         }
    #     }]
    # }],
    # location_area_encounters: [{
    #     location_area: {
    #         name: kanto-route-2-south-towards-viridian-city,
    #     },
    #     version_details: [{
    #         max_chance: 10,
    #         encounter_details: [{
    #             min_level: 7,
    #             max_level: 7,
    #             condition_values: [{
    #                 name: time-morning,
    #             }],
    #             chance: 5,
    #             method: {
    #                 name: walk,
    #             }
    #         }],
    #         version: {
    #             name: heartgold,
    #         }
    #     }]
    # }],
    # moves: [{
    #     move: {
    #         name: flash,
    #     },
    #     version_group_details: [{
    #         level_learned_at: 0,
    #         version_group: {
    #             name: x-y,
    #         },
    #         move_learn_method: {
    #             name: machine,
    #         }
    #     }]
    # }],
    # species: {
    #     name: butterfree,
    # },
    # sprites: {
    #     back_female: http://pokeapi.co/media/sprites/pokemon/back/female/12.png,
    #     back_shiny_female: http://pokeapi.co/media/sprites/pokemon/back/shiny/female/12.png,
    #     back_default: http://pokeapi.co/media/sprites/pokemon/back/12.png,
    #     front_female: http://pokeapi.co/media/sprites/pokemon/female/12.png,
    #     front_shiny_female: http://pokeapi.co/media/sprites/pokemon/shiny/female/12.png,
    #     back_shiny: http://pokeapi.co/media/sprites/pokemon/back/shiny/12.png,
    #     front_default: http://pokeapi.co/media/sprites/pokemon/12.png,
    #     front_shiny: http://pokeapi.co/media/sprites/pokemon/shiny/12.png
    # },
    # stats: [{
    #     base_stat: 70,
    #     effort: 0,
    #     stat: {
    #         name: speed,
    #     }
    # }],
    types: [PokemonType]
  }

  type Query {
    books: [Book]
    pokemon(names: [String]!): [Pokemon]
  }
`

const resolvers = {
  Query: {
    books: () => books,
    pokemon: (parent, args) => P.getPokemonByName(args.names).catch(e => { console.log('error', e); return [] })
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`server started on ${url}`)
})
