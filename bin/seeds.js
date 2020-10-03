const mongoose = require('mongoose')

const User = require('../models/User.model.js')
const Host = require('../models/Host.model.js')

const DB_NAME = 'meetyourfood'

mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to the DB !')
})

const data = [{
    userId: {
      firstName: 'Jean-Claude',
      lastName: 'Dupont',
      email: 'jdupont@gmail.com',
      userName: "jdupont",
      host: true,
    },
    farmName: 'La ferme de test',
    farmType: ['poultry farming', 'pig farming'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['aop', 'hve'],
    description: 'Les enfants adorent venir à la ferme car tous leurs sens sont en éveil. Pour la plupart d’entre eux, c’est la première fois qu’ils peuvent voir des animaux si près et les toucher. C’est aussi une manière de découvrir quel est le véritable trésor de la vie, ce que nous donne chaque jour la terre : la nourriture.',
    openingDays: ['monday', 'thursday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'german'],
    activitiesType: ['guided-tour', 'direct-selling'],
    maximumVisitors: 5
  }, {
    userId: {
      firstName: 'Marie',
      lastName: 'Bernard',
      email: 'mbernard@gmail.com',
      userName: "mbernard",
      host: true,
    },
    farmName: 'Le Potager des Princes',
    farmType: ['market gardener', 'beekeeping'],
    city: 'bergerac',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['bio', 'biodynamic'],
    description: 'Malgré son nom, le Potager des Princes n’est pas qu’un jardin. C’est aussi un parc animalier et un théâtre pour les enfants comme pour les parents. Une escapade nature près de Paris, au Jardin de Chantilly, pour toute la tribu en quête d’une sortie plein air dépaysante. Des animations spéciales sont également programmées régulièrement',
    openingDays: ['monday', 'tuesday', 'thursday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish'],
    activitiesType: ['tasting', 'direct-selling'],
    maximumVisitors: 10
  },
  {
    userId: {
      firstName: 'Sarah',
      lastName: 'Damag',
      email: 'sdamag@gmail.com',
      userName: "sdamag",
      host: true,
    },
    farmName: 'La Ferme de Gally',
    farmType: ['poultry farming', 'viticulture'],
    city: 'clermont-ferrand',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['aop', 'aoc'],
    description: 'Spécialistes de l’élevage et de la culture de la terre depuis 1746, les Fermes de Gally sont aujourd’hui une référence en matière de pédagogie agricole à destination des enfants et de la famille. Rendez-vous à Saint-Cyr-l’École ou à Sartrouville dans les Yvelines, à côté de Paris.',
    openingDays: ['tuesday', 'wednesday', 'thursday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'english'],
    public: ['children'],
    activitiesType: ['tasting', 'direct-selling', 'workshops'],
    maximumVisitors: 17
  },
  {
    userId: {
      firstName: 'Nina',
      lastName: 'Quaresma',
      email: 'nquaresma@gmail.com',
      userName: "nquaresma",
      host: true,
    },
    farmName: 'Ferme Kellerman',
    farmType: ['sheep farming', 'cheese maker', 'dairy maker'],
    city: 'clermont-ferrand',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['rse', 'biodynamic'],
    description: 'Une ferme pédagogique accueille les enfants en plein Paris. Située dans le 13e arrondissement, elle est au sein du Parc Kellermann et propose aux familles des visites au plus près des animaux.',
    openingDays: ['thursday', 'friday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french'],
    activitiesType: ['tasting', 'direct-selling', 'workshops', 'self-tour'],
    maximumVisitors: 3
  }, {
    userId: {
      firstName: 'Laura',
      lastName: 'Bonavent',
      email: 'lbonavent@gmail.com',
      userName: "lbonavent",
      host: true,
    },
    farmName: 'Les cueillets de Compans',
    farmType: ['cow farming', 'cheese maker', 'dairy maker'],
    city: 'bergerac',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['rse', 'biodynamic', 'aop', 'aoc'],
    description: "Les Cueillettes de Compans sont situées vers Roissy près de Paris. D'avril à novembre, elles proposent des produits frais variés à venir récolter en famille. L'occasion d'une sortie nature avec les enfants.",
    openingDays: ['monday', 'thursday', 'friday', 'saturday', 'sunday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'german'],
    activitiesType: ['workshops', 'self-tour'],
    maximumVisitors: 7
  }, {
    userId: {
      firstName: 'Antoine',
      lastName: 'Bernier',
      email: 'abernier@gmail.com',
      userName: "abernier",
      host: true,
    },
    farmName: 'Les cueillettes de test',
    farmType: ['cow farming', 'cheese maker', 'dairy maker'],
    city: 'bergerac',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['rse', 'biodynamic', 'aop', 'aoc'],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ",
    openingDays: ['monday', 'thursday', 'saturday', ],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'german', 'spanish'],
    activitiesType: ['workshops', 'self-tour'],
    maximumVisitors: 20
  }, {
    userId: {
      firstName: 'Cassandre',
      lastName: 'Vanzetta',
      email: 'cvanzetta@gmail.com',
      userName: "cvanzetta",
      host: true,
    },
    farmName: 'Les cueillettes des ruches',
    farmType: ['beekeeping'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'aop', 'aoc'],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ",
    openingDays: ['monday', 'thursday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour'],
    maximumVisitors: 20
  },
  {
    userId: {
      firstName: 'Claire',
      lastName: 'Lacanal',
      email: "clacanal@gmail.com",
      userName: "clacanal",
      host: true,
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'aop', 'aoc', 'rse'],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ",
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11
  }, {
    userId: {
      firstName: 'Elodie',
      lastName: 'Cassignol',
      email: "ecassignol@gmail.com",
      userName: "ecassignol",
      host: true,
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'aop', 'aoc', 'rse'],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ",
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11
  },
  {
    userId: {
      firstName: 'Clémentine',
      lastName: 'Incognito',
      email: "cincognito@gmail.com",
      userName: "cincognito",
      host: true,
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'aop', 'aoc', 'rse'],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ",
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11
  },
  {
    userId: {
      firstName: 'Enine',
      lastName: 'Incognito',
      email: "eincognito@gmail.com",
      userName: "eincognito",
      host: true,
    },
    farmName: 'Les plantes en folie',
    farmType: ['market gardener'],
    city: 'compiegne',
    address: '8, Chemin  des Vignes',
    zipCode: 32189,
    certifications: ['biodynamic', 'aop', 'aoc', 'rse'],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi tristique ipsum non neque condimentum tristique. Pellentesque mollis consequat blandit. Nam leo libero, tempor eu finibus efficitur, aliquam eget lacus. Duis a dolor nec justo vehicula varius feugiat sed nulla. Nulla tempor a mi quis imperdiet. Nulla massa augue, sodales non mauris a, laoreet accumsan nisi. Proin sodales sit amet ipsum eget dictum. Pellentesque ac rhoncus nibh, ut pretium risus. ",
    openingDays: ['monday', 'tuesday', 'saturday', 'wednesday'],
    openingHoursStart: '08:00',
    openingHoursEnd: '17:00',
    spokenLanguages: ['french', 'spanish', 'english'],
    activitiesType: ['workshops', 'self-tour', 'guided-tour', 'tasting'],
    maximumVisitors: 11
  }
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