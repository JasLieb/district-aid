import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nowaste/navigation/bloc/navigation.dart';
import 'package:nowaste/splash/splash_page.dart';

import 'widgets/contacts.dart';

class SimpleBlocDelegate extends BlocDelegate {
  @override
  void onEvent(Bloc bloc, Object event) {
    super.onEvent(bloc, event);
    print('$bloc : $event');
  }

  @override
  void onTransition(Bloc bloc, Transition transition) {
    super.onTransition(bloc, transition);
    print('$bloc : $transition');
  }

  @override
  void onError(Bloc bloc, Object error, StackTrace stacktrace) {
    super.onError(bloc, error, stacktrace);
    print('$bloc : $error');
  }
}

void main() async {
  BlocSupervisor.delegate = SimpleBlocDelegate();
  runApp(
    App()
  );
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => NavigationBloc()..add(AppStarted()),
      child:
        MaterialApp(
          title: 'Welcome to Flutter',
          home: BlocBuilder<NavigationBloc, NavigationState>(
            builder: (BuildContext context, NavigationState state) {
              if (state is AppInitialized) {
                return Contacts();
              }
              return SplashPage();
            }
          )
        )
    );
  }
}