const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hostSchema = new Schema(
  {
    userId: [{ type: Schema.Types.ObjectId, ref: 'User' }], //aller chercher les infos du User
    exploitationName: { type: String, required: true },
    exploitationType: {
      type: String,
      enum: [
        'Poultry farming',
        'Pig farming',
        'Cow farming',
        'Sheep farming',
        'Market gardener',
        'Winery',
        'Beekeeping',
        'Cheese maker',
        'Dairy maker',
      ],
      required: true,
    },
    city: {
      type: String,
      enum: ['Bergerac', 'Compiègne', 'Clermont-Ferrand'],
      required: true,
    }, //prendre une base de données avec toutes les villes de France (API Insee)
    address: { String, required: true },
    zipCode: { Number, required: true },
    country: { type: String, default: 'France', required: true },
    latitude: String,
    longitude: String,
    certifications: {
      type: String,
      enum: ['Bio', 'AOP', 'AOC', 'HVE', 'RSE Agro', 'Biodynamic'],
    },
    public: {
      type: String,
      enum: ['Children', 'Senior', 'Disabled access'],
    },
    description: { String, required: true },
    openingDays: {
      type: String,
      enum: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      required: true,
    },
    openingHours: { String, required: true },
    spokenLanguages: {
      type: String,
      enum: ['French', 'English', 'Spanish', 'German'],
      required: true,
    },
    activitiesType: {
      type: String,
      enum: [
        'Tasting',
        'Guided Tour',
        'Self tour',
        'Direct selling',
        'Workshops',
      ],
      required: true,
    },
    photos: { type: [String], required: true },
    maximumVisitor: { type: Number, min: 1, required: true },
  },
  {
    timestamps: true,
  }
);

const Host = mongoose.model('Host', hostSchema);
module.exports = Host;
