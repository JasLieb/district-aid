import 'dart:async';
import 'package:flutter/foundation.dart';
import 'package:bloc/bloc.dart';

import 'navigation.dart';

class NavigationBloc extends Bloc<NavigationEvent, NavigationState> {
  NavigationBloc() : super(AppNotInitializedState());

  @override
  Stream<NavigationState> mapEventToState(
    NavigationEvent event,
  ) async* {
    if (event is AppStarted) {
      if (kIsWeb) {
        await Future.delayed(new Duration(seconds: 2));
        yield WebAppInitializedState();
      } else {
        try {
          await Future.delayed(new Duration(seconds: 2));
          yield AppInitializedState();
        } catch (e) {
          print(e);
        }
      }
    }
  }

  @override
  String toString() => "Navigtion bloc";
}
