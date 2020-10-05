const mongoose = require('mongoose');

const User = require('../models/User.model.js');
const Host = require('../models/Host.model.js');

const DB_NAME = 'meetyourfood';

mongoose
  .connect(`mongodb://localhost/${DB_NAME}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the DB !');
  });

const data = [
  {
    userId: {
      firstName: 'Jean-Claude',
      lastName: 'Dupont',
      email: 'jdupont@gmail.com',
      userName: 'jdupont',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1542275658-fa28c48e8954?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
    },
    farmName: 'La ferme de test',
    farmType: ['poultry farming', 'pig farming'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['AOP', 'HVE'],
    description:
      'Les enfants adorent venir à la ferme car tous leurs sens sont en éveil. Pour la plupart d’entre eux, c’est la première fois qu’ils peuvent voir des animaux si près et les toucher. C’est aussi une manière de découvrir quel est le véritable trésor de la vie, ce que nous donne chaque jour la terre : la nourriture.',
    openingDays: ['monday', 'thursday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'german'],
    activitiesType: ['guided-tour', 'direct-selling'],
    maximumVisitors: 5,
  },
  {
    userId: {
      firstName: 'Marie',
      lastName: 'Bernard',
      email: 'mbernard@gmail.com',
      userName: 'mbernard',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1336&q=80',
    },
    farmName: 'Le Potager des Princes',
    farmType: ['market gardener', 'beekeeping'],
    city: 'bergerac',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['bio', 'biodynamic'],
    description:
      'Malgré son nom, le Potager des Princes n’est pas qu’un jardin. C’est aussi un parc animalier et un théâtre pour les enfants comme pour les parents. Une escapade nature près de Paris, au Jardin de Chantilly, pour toute la tribu en quête d’une sortie plein air dépaysante. Des animations spéciales sont également programmées régulièrement',
    openingDays: ['monday', 'tuesday', 'thursday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish'],
    activitiesType: ['tasting', 'direct-selling'],
    maximumVisitors: 10,
  },
  {
    userId: {
      firstName: 'Sarah',
      lastName: 'Damag',
      email: 'sdamag@gmail.com',
      userName: 'sdamag',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80',
    },
    farmName: 'La Ferme de Gally',
    farmType: ['poultry farming', 'viticulture'],
    city: 'clermont-ferrand',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['AOP', 'AOC'],
    description:
      'Spécialistes de l’élevage et de la culture de la terre depuis 1746, les Fermes de Gally sont aujourd’hui une référence en matière de pédagogie agricole à destination des enfants et de la famille. Rendez-vous à Saint-Cyr-l’École ou à Sartrouville dans les Yvelines, à côté de Paris.',
    openingDays: ['tuesday', 'wednesday', 'thursday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'english'],
    public: ['children'],
    activitiesType: ['tasting', 'direct-selling', 'workshops'],
    maximumVisitors: 17,
  },
  {
    userId: {
      firstName: 'Nina',
      lastName: 'Quaresma',
      email: 'nquaresma@gmail.com',
      userName: 'nquaresma',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1536657464919-892534f60d6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1506&q=80',
    },
    farmName: 'Ferme Kellerman',
    farmType: ['sheep farming', 'cheese maker', 'dairy maker'],
    city: 'clermont-ferrand',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['RSE', 'biodynamic'],
    description:
      'Une ferme pédagogique accueille les enfants en plein Paris. Située dans le 13e arrondissement, elle est au sein du Parc Kellermann et propose aux familles des visites au plus près des animaux.',
    openingDays: ['thursday', 'friday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french'],
    activitiesType: ['tasting', 'direct-selling', 'workshops', 'self-tour'],
    maximumVisitors: 3,
  },
  {
    userId: {
      firstName: 'Laura',
      lastName: 'Bonavent',
      email: 'lbonavent@gmail.com',
      userName: 'lbonavent',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1484557985045-edf25e08da73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
    },
    farmName: 'Les cueillets de Compans',
    farmType: ['cow farming', 'cheese maker', 'dairy maker'],
    city: 'bergerac',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['RSE', 'biodynamic', 'AOP', 'AOC'],
    description:
      "Les Cueillettes de Compans sont situées vers Roissy près de Paris. D'avril à novembre, elles proposent des produits frais variés à venir récolter en famille. L'occasion d'une sortie nature avec les enfants.",
    openingDays: ['monday', 'thursday', 'friday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'german'],
    activitiesType: ['workshops', 'self-tour'],
    maximumVisitors: 7,
  },
  {
    userId: {
      firstName: 'Antoine',
      lastName: 'Bernier',
      email: 'abernier@gmail.com',
      userName: 'abernier',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1475260151973-4b51c9c9af2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
    },
    farmName: 'Les cueillettes de test',
    farmType: ['cow farming', 'cheese maker', 'dairy maker'],
    city: 'bergerac',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['RSE', 'biodynamic', 'AOP', 'AOC'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ',
    openingDays: ['monday', 'thursday', 'saturday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'german', 'spanish'],
    activitiesType: ['workshops', 'self-tour'],
    maximumVisitors: 20,
  },
  {
    userId: {
      firstName: 'Cassandre',
      lastName: 'Vanzetta',
      email: 'cvanzetta@gmail.com',
      userName: 'cvanzetta',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1486328228599-85db4443971f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    },
    farmName: 'Les cueillettes des ruches',
    farmType: ['beekeeping'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'AOP', 'AOC'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ',
    openingDays: ['monday', 'thursday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour'],
    maximumVisitors: 20,
  },
  {
    userId: {
      firstName: 'Claire',
      lastName: 'Lacanal',
      email: 'clacanal@gmail.com',
      userName: 'clacanal',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1484759288640-783b22c95d54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2560&q=80',
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'AOP', 'AOC', 'RSE'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ',
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11,
  },
  {
    userId: {
      firstName: 'Elodie',
      lastName: 'Cassignol',
      email: 'ecassignol@gmail.com',
      userName: 'ecassignol',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1530844230930-8168b52d2d88?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80',
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'AOP', 'AOC', 'RSE'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ',
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11,
  },
  {
    userId: {
      firstName: 'Clémentine',
      lastName: 'Incognito',
      email: 'cincognito@gmail.com',
      userName: 'cincognito',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1585499193151-0f50d54c4e1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1504&q=80',
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'AOP', 'AOC', 'RSE'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ',
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11,
  },
  {
    userId: {
      firstName: 'Enine',
      lastName: 'Incognito',
      email: 'eincognito@gmail.com',
      userName: 'eincognito',
      host: true,
      profilePic:
        'https://images.unsplash.com/photo-1569588655434-e5476bfe939e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'AOP', 'AOC', 'RSE'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ',
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11,
  },
];

const users = data.map((host) => host.userId);

User.create(users)
  .then((users) => {
    console.log(`${users.length} users created.`);
    const userIds = users.map((user) => user.id);
    const hosts = data.map((host, i) => {
      host.userId = userIds[i];
      return host;
    });
    Host.create(hosts)
      .then((hosts) => {
        console.log(`${hosts.length} hosts created.`);
        mongoose.connection.close();
      })
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error(err));
