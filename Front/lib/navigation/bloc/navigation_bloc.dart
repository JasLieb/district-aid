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
      await Future.delayed(new Duration(seconds: 3));
      if (kIsWeb) {
        yield WebAppInitializedState();
      } else {
        yield AppInitializedState();
      }
    }
  }

  @override
  String toString() => "Navigtion bloc";
}
