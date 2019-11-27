import { idArg, makeSchema, objectType, stringArg, booleanArg } from 'nexus';


export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.first_name();
    t.model.last_name();
    t.model.birth_date();
    t.model.email();
    t.model.emails({
      pagination: false
    });
    t.model.phones({
      pagination: false
    });
    t.model.depots({
      pagination: false
    });
    t.model.ratings({
      pagination: false
    });
  }
});

export const Depot = objectType({
  name: 'Depot',
  definition(t) {
    t.model.id();
    t.model.address_1();
    t.model.address_2();
    t.model.city();
    t.model.province();
    t.model.zipcode();
    t.model.owner();
    t.model.tools({
      pagination: false
    });
  }
});

export const Tool = objectType({
  name: 'Tool',
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.category();
    t.model.description();
    t.model.price();
    t.model.depot();
    t.model.pictures({
      pagination: false
    });
  }
});

export const Email = objectType({
  name: 'Email',
  definition(t) {
    t.model.id();
    t.model.address();
    t.model.purpose();
    t.model.owner();
  }
});

export const Phone = objectType({
  name: 'Phone',
  definition(t) {
    t.model.id();
    t.model.num();
    t.model.purpose();
    t.model.owner();
  }
});

export const Rating = objectType({
  name: 'Rating',
  definition(t) {
    t.model.id();
    t.model.point();
    t.model.kind();
    t.model.comment();
    t.model.user();
  }
});

export const ToolPicture = objectType({
  name: 'ToolPicture',
  definition(t) {
    t.model.id();
    t.model.image();
    t.model.description();
    t.model.tool();
  }
});