require('dotenv').config();
require('./database');

const Card = require('../models/card');
const List = require('../models/list');
const Board = require('../models/board');
const User = require('../models/user');

(async function() {

  await Card.deleteMany({});
  const cards = await Card.create([
    {title: 'Create ERD', description:'sign into lucid and create an ERD'},
    {title: 'Create Wireframe', description:'Create a wireframe using Balsamiq'},
    {title: 'Create Git Hub Repo', description:'Sign into GitHub create a new repo, and use the SSH link to clone in your local compuert'},
    {title: 'Create React Application', description:'in the terminal type: npx create-react-app <nameOfApp>'},
    {title: 'Build backend', description:'downlaod expresse, mongoDb etc...'},
    {title: 'Build your project architecture', description:'Create your models, controllers and views'},
    {title: 'Test routes on postman', description:'create CRUD functionality for all components'},
  ]);

  await List.deleteMany({});
  const lists = await List.create([
    {title: 'IceBox', 
    card:[
        cards[6]
    ]},
    {title: 'MVP', 
    card:[
        cards[5],
        cards[4]
    ]},
    {title: 'Inprogress', 
    card:[
        cards[3],
        cards[2]
    ]},
    {title: 'Completed', 
    card:[
        cards[1],
        cards[0]
    ]}
  ]);

  await Board.deleteMany({});
  const boards = await Board.create([
    {title: 'SEI:Trello Board', 
    list:[
        lists[0],
        lists[1],
        lists[2],
        lists[3]
    ]},
    {title: 'New Year New Me', 
    list:[
        lists[0],
        lists[1],
        lists[2]
    ]}
  ]);

  await User.deleteMany({});
  const user = await User.create([
    {
      name:'Rosa',
      email:'rosa@pena.com',
      password:'test1',
      boards:boards[0]
    },
    {
      name:'Lina',
      email:'Lina@diaz.com',
      password:'test2',
      boards:boards[1]
    },
  ])
  console.log(user)

  process.exit();

})();