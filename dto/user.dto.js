module.exports = class UserDto {
  id;
  userName;
  activated;
  firstName;
  lastName;
  hospital;
  phone;
  role;

  constructor(model) {
    this.id = model._id;
    this.userName = model.userName;
    this.activated = model.activated;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.hospital = model.hospital;
    this.phone = model.phone;
    this.role = model.role;
  }
};
