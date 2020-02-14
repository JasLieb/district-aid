import 'package:equatable/equatable.dart';
import 'package:nowaste/models/contact.dart';

abstract class ContactEvent extends Equatable {
  const ContactEvent();
}

class ContactUninitialized extends ContactEvent{
  @override
  List<Object> get props => [this];
}

class SwitchFavorite extends ContactEvent{
  final Contact contact;

  SwitchFavorite(this.contact);

  @override
  List<Object> get props => [contact];
}
