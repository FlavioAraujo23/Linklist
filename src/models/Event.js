const { Schema, models, model } = require("mongoose");

const EventSchema = new Schema({
  type: String,  // evento de click ou visualização
  page: String, // por exemplo "Flavio"
  uri: String,  // /flavio ou https://
}, {timestamps: true});

export const Event = models?.Event || model('Event', EventSchema);