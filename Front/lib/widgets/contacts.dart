import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nowaste/contact/bloc/contact.dart';
import 'package:nowaste/navigation/bloc/navigation.dart';

class Contacts extends StatelessWidget {
  final _contactBloc = ContactBloc()..add(ContactUninitialized());
  final _fontSize = const TextStyle(fontSize: 18);

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
        body: BlocBuilder<ContactBloc, ContactState>(
          bloc: _contactBloc,
          builder: (context, state) =>
            state is WithContacts 
              ?
                ListView.builder(
                  padding: const EdgeInsets.all(16.0),
                  itemCount: state.contacts.length,
                  itemBuilder: (_, i) =>
                    ListTile(
                      title: Text(state.contacts[i].name, style: _fontSize),
                      trailing: Icon(
                        state.contacts[i].isFavourite ? Icons.favorite : Icons.favorite_border,
                        color: state.contacts[i].isFavourite ? Colors.red : null,
                      ),
                      onTap: () =>
                        _contactBloc.add(SwitchFavorite(state.contacts[i])),
                    )
                )
              :
                Text('Here is no contact to display')
        ),
      );
  }
}
