const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }, //aller chercher les infos du User
    farmName: {
      type: String,
      required: true,
    },
    farmType: {
      type: [String],
      enum: [
        'poultry farming',
        'pig farming',
        'cow farming',
        'sheep farming',
        'market gardener',
        'viticulture',
        'beekeeping',
        'cheese maker',
        'dairy maker',
      ],
      required: true,
    },
    city: {
      type: String,
      enum: ['bergerac', 'compiegne', 'clermont-ferrand'],
      required: true,
    }, //prendre une base de données avec toutes les villes de France (API Insee)
    address: {
      type: String,
      required: true,
    },
    zipCode: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      default: 'france',
      required: true,
    },
    latitude: String,
    longitude: String,
    certifications: {
      type: [String],
      enum: ['bio', 'aoc', 'aop', 'hve', 'rse', 'biodynamic'],
    },
    public: {
      type: [String],
      enum: ['children', 'seniors', 'disabled'],
    },
    description: {
      type: String,
      required: true,
    },
    website: String,
    openingDays: {
      type: [String],
      enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
      required: true,
    },
    openingHoursStart: {
      type: String,
      required: true,
    },
    openingHoursEnd: {
      type: String,
      required: true,
    },
    spokenLanguages: {
      type: [String],
      enum: ['french', 'english', 'spanish', 'german'],
      required: true,
    },
    activitiesType: {
      type: [String],
      enum: [
        'tasting',
        'guided-tour',
        'self-tour',
        'direct-selling',
        'workshops',
      ],
      required: true,
    },
    // A gérer
    // photos: {
    //   type: String,
    //   required: true,
    // },
    maximumVisitors: {
      type: Number,
      min: 1,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Host = mongoose.model('Host', hostSchema);
module.exports = Host;
