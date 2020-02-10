import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:nowaste/src/models/contact.dart';
import 'package:nowaste/src/screens/favouritesContacts.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: Contacts()
    );
  }
}

class Contacts extends StatefulWidget {
  Contacts({Key key}) : super(key: key);

  @override
  _ContactsState createState() => _ContactsState();
}

class _ContactsState extends State<Contacts> {
  final _contacts = <Contact>[new Contact("toto"), new Contact("tata"), new Contact("titi")];
  final _favouriteContacts = Set<Contact>();
  final _fontSize = const TextStyle(fontSize: 18);
  
  @override
  Widget build(BuildContext context) { 
    return Scaffold(
        appBar: AppBar(
          title: Text('My contact App'),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.list),
              onPressed: _showFavouriteContact,
            )
          ],
        ),
        body: Center(
          child: _buildContactList(),
        ),
    );
  }

  Widget _buildContactList() {
    return ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemCount: _contacts.length,
      itemBuilder: (context, i) {
          return _buildContactLine(_contacts[i]);
      });
  }

  Widget _buildContactLine(Contact contact) {
    final bool isFavourite = _favouriteContacts.contains(contact);
    return ListTile(
      title: Text(
        contact.name,
        style: _fontSize
      ),
      trailing: Icon(
        isFavourite ? Icons.favorite : Icons.favorite_border,
        color: isFavourite ? Colors.red : null,
      ),
      onTap: (){
        setState(() {
          if(isFavourite) {
            _favouriteContacts.remove(contact);
          } else {
            _favouriteContacts.add(contact);
          }
        });
      },
    );
  }

  void addContat(var name){
    _contacts.add(new Contact(name));
  }

  void _showFavouriteContact() {
    Navigator.of(context).push(
      MaterialPageRoute<void>(
        builder: (BuildContext context) {
          final Iterable<ListTile> tiles =
            _favouriteContacts.map(
              (Contact contact) {
                return ListTile(
                  title: Text(
                    contact.name,
                    style: _fontSize,
                  ),
                );
              },
            );
          
          final List<Widget> divided = ListTile
            .divideTiles(
              context: context,
              tiles: tiles,
            )
            .toList();

          return FavouriteContacts(favouriteContacts: divided,);
        },
      ),
    );
  }
}
