import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nowaste/contact/bloc/contact.dart';
import 'package:nowaste/models/contact.dart';

class Contacts extends StatelessWidget {
  var contacts;
  final _fontSize = const TextStyle(fontSize: 18);

  @override
  Widget build(BuildContext context) {
    // final contactBloc = context.bloc<ContactBloc>();
    // contactBloc.add(event)
    return Scaffold(
        appBar: AppBar(
          title: Text('My contact App'),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.list),
              onPressed: () {
                //BlocProvider.of<NavigationBloc>(context).add(ShowFavourites());
                //BlocProvider.of<NavigationBloc>(context).add(ShowFavourites());
              },
            )
          ],
        ),
        body: BlocListener<ContactBloc, ContactState>(
          bloc: context.bloc<ContactBloc>(),
          listener: (BuildContext context, ContactState state) {
            if (state is ContactUninitialized) {
              contacts = List<Contact>();
            } else if (state is UpdateContacts) {
              contacts = state.contacts;
            } else if (state is WithContacts) {
                contacts = state.contacts;
            }
            //     //return _buildContactList(state.contacts, context);
            //     var contacts = state.contacts;
            //     return ListView.builder(
            //         padding: const EdgeInsets.all(16.0),
            //         itemCount: contacts.length,
            //         itemBuilder: (context, i) {
            //           //return _buildContactLine(contacts[i], context);
            //           return ListTile(
            //             title: Text(contacts[i].name, style: _fontSize),
            //             trailing: Icon(
            //               contacts[i].isFavourite
            //                   ? Icons.favorite
            //                   : Icons.favorite_border,
            //               color: contacts[i].isFavourite ? Colors.red : null,
            //             ),
            //             onTap: () {
            //               // BlocProvider.of<ContactBloc>(context)
            //               //     .add(SwitchFavorite(contacts[i]));
            //             },
            //           );
            //         });
            //   } else {
            //     return Text('Here is no contact to display');
            //   }
          },
          child: BlocBuilder<ContactBloc, ContactState>(
            builder: (context, state) {
              if(state is UpdateContacts) {
                contacts = state.contacts;
                return ListView.builder(
                  padding: const EdgeInsets.all(16.0),
                  itemCount: contacts.length,
                  itemBuilder: (context, i) {
                    //return _buildContactLine(contacts[i], context);
                    return ListTile(
                      title: Text(contacts[i].name, style: _fontSize),
                      trailing: Icon(
                        contacts[i].isFavourite
                            ? Icons.favorite
                            : Icons.favorite_border,
                        color: contacts[i].isFavourite ? Colors.red : null,
                      ),
                      onTap: () {
                        BlocProvider.of<ContactBloc>(context).add(SwitchFavorite(contacts[i]));
                      },
                    );
                  }
                );
              }
              else if (state is WithContacts) {
                //return _buildContactList(state.contacts, context);
                return ListView.builder(
                  padding: const EdgeInsets.all(16.0),
                  itemCount: contacts.length,
                  itemBuilder: (context, i) {
                    //return _buildContactLine(contacts[i], context);
                    return ListTile(
                      title: Text(contacts[i].name, style: _fontSize),
                      trailing: Icon(
                        contacts[i].isFavourite
                            ? Icons.favorite
                            : Icons.favorite_border,
                        color: contacts[i].isFavourite ? Colors.red : null,
                      ),
                      onTap: () {
                        BlocProvider.of<ContactBloc>(context).add(SwitchFavorite(contacts[i]));
                      },
                    );
                  }
                );
              } else {
                return Text('Here is no contact to display');
              }
            },
          ),
        )
      );
    //   BlocProvider<ContactBloc>(
    //       create: (context) => ContactBloc()..add(ContactUninitialized()),
    //       child: BlocBuilder<ContactBloc, ContactState>(
    //         builder: (context, state) {
    //           if (state is WithContacts) {
    //             //return _buildContactList(state.contacts, context);
    //             var contacts = state.contacts;
    //             return ListView.builder(
    //                 padding: const EdgeInsets.all(16.0),
    //                 itemCount: contacts.length,
    //                 itemBuilder: (context, i) {
    //                   //return _buildContactLine(contacts[i], context);
    //                   return ListTile(
    //                     title: Text(contacts[i].name, style: _fontSize),
    //                     trailing: Icon(
    //                       contacts[i].isFavourite
    //                           ? Icons.favorite
    //                           : Icons.favorite_border,
    //                       color: contacts[i].isFavourite ? Colors.red : null,
    //                     ),
    //                     onTap: () {
    //                       BlocProvider.of<ContactBloc>(context)
    //                           .add(SwitchFavorite(contacts[i]));
    //                     },
    //                   );
    //                 });
    //           } else {
    //             return Text('Here is no contact to display');
    //           }
    //         },
    //       )),
    // );
  }

  // Widget _buildContactList(contacts, context) {
  //   return ListView.builder(
  //       padding: const EdgeInsets.all(16.0),
  //       itemCount: contacts.length,
  //       itemBuilder: (context, i) {
  //         return _buildContactLine(contacts[i], context);
  //       }
  //     );
  // }

  // Widget _buildContactLine(Contact contact, context) {
  //   return ListTile(
  //     title: Text(contact.name, style: _fontSize),
  //     trailing: Icon(
  //       contact.isFavourite ? Icons.favorite : Icons.favorite_border,
  //       color: contact.isFavourite ? Colors.red : null,
  //     ),
  //     onTap: () {
  //       BlocProvider.of<ContactBloc>(context).add(SwitchFavorite(contact));
  //     },
  //   );
  // }

  // void addContat(var name) {
  //   contacts.add(new Contact(name, false));
  // }
}
