import 'dart:developer';

import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nowaste/contact/bloc/contact.dart';
import 'package:nowaste/navigation/bloc/navigation.dart';
import 'package:nowaste/splash/splash_page.dart';

import 'widgets/contacts.dart';

class SimpleBlocDelegate extends BlocDelegate {
  @override
  void onEvent(Bloc bloc, Object event) {
    super.onEvent(bloc, event);
    print(event);
  }

  @override
  void onTransition(Bloc bloc, Transition transition) {
    super.onTransition(bloc, transition);
    print(transition);
  }

  @override
  void onError(Bloc bloc, Object error, StackTrace stacktrace) {
    super.onError(bloc, error, stacktrace);
    print(error);
  }
}

void main() async {
  BlocSupervisor.delegate = SimpleBlocDelegate();
  runApp(
    // BlocProvider<NavigationBloc>(
    //   create: (context) {
    //     return NavigationBloc()..add(AppStarted());
    //   },
    //   child: App(),
    // ),
    MultiBlocProvider(
      providers: [
        BlocProvider<NavigationBloc>(
          create: (context) => NavigationBloc()..add(AppStarted())
        ),
        BlocProvider<ContactBloc>(
          create: (context) => ContactBloc()..add(ContactUninitialized())
        )
      ],
      child: App(),
    )
  );
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: BlocBuilder<NavigationBloc, NavigationState>(
        builder: (context, state) {
          if (state is AppInitialized) {
            return Contacts();
          }

          return SplashPage();
        },
      )
    );
  }
}