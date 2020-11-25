import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'landingPage/landingPage.dart';
import 'navigation/bloc/navigation.dart';
import 'splash/splash_page.dart';
import 'map/map.dart';

void main() async {
  await DotEnv().load('.env');
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (context) => NavigationBloc()..add(AppStarted()),
        child: MaterialApp(
            title: 'Welcome to Flutter',
            home: BlocBuilder<NavigationBloc, NavigationState>(
                builder: (BuildContext context, NavigationState state) {
              if (state is AppInitializedState) {
                return Map();
              } else if (state is WebAppInitializedState) {
                return LandingPage();
              }
              return SplashPage();
            })));
  }
}

/// Maybe useful to extract following code into style app configuration  ?
// const int _bluePrimary = 0xFF395afa;
// const MaterialColor mapBoxBlue = MaterialColor(
//   _bluePrimary,
//   <int, Color>{
//     50: Color(0xFFE7EBFE),
//     100: Color(0xFFC4CEFE),
//     200: Color(0xFF9CADFD),
//     300: Color(0xFF748CFC),
//     400: Color(0xFF5773FB),
//     500: Color(_bluePrimary),
//     600: Color(0xFF3352F9),
//     700: Color(0xFF2C48F9),
//     800: Color(0xFF243FF8),
//     900: Color(0xFF172EF6),
//   },
// );
