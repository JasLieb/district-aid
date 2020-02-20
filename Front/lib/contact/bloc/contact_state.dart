import 'package:nowaste/models/contact.dart';

abstract class ContactState {
  const ContactState();
}

class ContactInitial extends ContactState {}

class WithContacts extends ContactState {
  final List<Contact> contacts;

  WithContacts(this.contacts);
}