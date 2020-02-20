import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:nowaste/navigation/bloc/navigation.dart';
import 'package:nowaste/splash/splash_page.dart';
import 'package:nowaste/utils/delegates.dart';
import 'package:nowaste/widgets/contacts.dart';


void main() async {
  BlocSupervisor.delegate = SimpleBlocDelegate();
  runApp(
    BlocProvider<NavigationBloc>(
      create: (context) => NavigationBloc()..add(AppStarted())
    )
  );
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Welcome to Flutter',
      home: BlocListener<NavigationBloc, NavigationState>(
        bloc: context.bloc<NavigationBloc>(),
        listener: (BuildContext context, NavigationState state) {},
        child: BlocBuilder<NavigationBloc, NavigationState>(
          builder: (context, state) {
            if (state is AppInitialized) {
              return Contacts();
            }
            return SplashPage();
          },
        ),
      )
    );
  }
}