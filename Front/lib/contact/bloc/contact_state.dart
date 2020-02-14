import 'package:equatable/equatable.dart';
import 'package:nowaste/models/contact.dart';

abstract class ContactState extends Equatable {
  const ContactState();
}

class ContactInitial extends ContactState {
  @override
  List<Object> get props => [];
}

class WithContacts extends ContactState {
  final List<Contact> contacts;

  WithContacts(this.contacts);

  @override
  List<Object> get props => [contacts];
}
