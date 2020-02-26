
import 'package:equatable/equatable.dart';

abstract class NavigationEvent extends Equatable {
  const NavigationEvent();
}

class AppStarted extends NavigationEvent {
  @override
  List<Object> get props => [this];
}
