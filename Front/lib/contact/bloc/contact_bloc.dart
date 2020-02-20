import 'dart:async';

import 'contact.dart';
import 'package:bloc/bloc.dart';
import 'package:nowaste/models/contact.dart';

class ContactBloc extends Bloc<ContactEvent, ContactState> {
  var contacts = [
    new Contact('toto', false),
    new Contact('tata', false),
    new Contact('titi', false)
  ];

  @override
  ContactState get initialState => ContactInitial();

  @override
  Stream<ContactState> mapEventToState(
    ContactEvent event,
  ) async* {
    if (event is ContactUninitialized) {
      yield WithContacts(contacts);
    } else if (event is SwitchFavorite) {
      final contact = event.contact;
      contacts = contacts
          .map((e) =>
            e != contact
              ? e
              : new Contact(contact.name, !contact.isFavourite)
          )
          .toList();
      yield UpdateContacts(contacts);
    } else {
      yield ContactInitial();
    }
  }

  @override
  String toString() => "Contact bloc";
}
