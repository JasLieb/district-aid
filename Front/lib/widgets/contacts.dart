import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nowaste/contact/bloc/contact.dart';
import 'package:nowaste/models/contact.dart';
import 'package:nowaste/navigation/bloc/navigation.dart';

class Contacts extends StatefulWidget {
  final fontSize = const TextStyle(fontSize: 18);
  @override
  State<StatefulWidget> createState() => _ContactsState();
}

class _ContactsState extends State<Contacts> {
  var contacts;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('My contact App'),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.list),
              onPressed: () {
                BlocProvider.of<NavigationBloc>(context).add(ShowFavourites());
              },
            )
          ],
        ),
        /// Listener for state change
        /// Useful in statefulwidget
        /// but how to rebuild or display change ?
        /// allows update informations about infinite scroll ?
        body: BlocListener<ContactBloc, ContactState>(
          bloc: context.bloc<ContactBloc>(),
          listener: (BuildContext context, ContactState state) {
            if (state is ContactUninitialized) {
              contacts = List<Contact>();
            } else if (state is WithContacts) {
                contacts = state.contacts;
            }
          },
          child: BlocBuilder<ContactBloc, ContactState>(
            builder: (context, state) {
              if (state is WithContacts) {
                return _buildContactList(state.contacts, context);
              } else {
                return Text('Here is no contact to display');
              }
            },
          ),
        )
      );
  }

  Widget _buildContactList(contacts, context) {
    return ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: contacts.length,
        itemBuilder: (context, i) {
          return _buildContactLine(contacts[i], context);
        }
      );
  }

  Widget _buildContactLine(Contact contact, context) {
    return ListTile(
      title: Text(contact.name, style: widget.fontSize),
      trailing: Icon(
        contact.isFavourite ? Icons.favorite : Icons.favorite_border,
        color: contact.isFavourite ? Colors.red : null,
      ),
      onTap: () {
        BlocProvider.of<ContactBloc>(context).add(SwitchFavorite(contact));
      },
    );
  }
}