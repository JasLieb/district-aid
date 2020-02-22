part of 'map_bloc.dart';

@immutable
abstract class MapState {
  final List<LatLng> interestPoints;
  final bool pointsAreVisible;

  MapState(this.interestPoints, this.pointsAreVisible);
}

class MapInitialState extends MapState {
  MapInitialState(List<LatLng> interestPoints, bool pointsAreVisible) : super(interestPoints, pointsAreVisible);
}

class MapDisplayState extends MapState {
  MapDisplayState(List<LatLng> interestPoints, bool pointsAreVisible) : super(interestPoints, pointsAreVisible);
}
