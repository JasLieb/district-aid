abstract class NavigationState {
  const NavigationState();
}

class AppNotInitialized extends NavigationState {}

class AppInitialized extends NavigationState {}

class MapShown extends NavigationState {}
