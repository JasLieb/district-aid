import 'dart:async';
import 'dart:developer';

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import 'package:latlong/latlong.dart';
import 'package:geolocator/geolocator.dart';

import '../../httpClients/httpBaseClient.dart';
import '../../models/interestPoint.dart';

part 'map_event.dart';
part 'map_state.dart';

class MapBloc extends Bloc<MapEvent, MapState> {
  HttpBaseClient client = HttpBaseClient();
  List<LatLng> interestPoints = List<LatLng>();
  bool pointsAreVisible = false;
  Position position;
  MapBloc() : super(_defaultMapState());

  @override
  Stream<MapState> mapEventToState(
    MapEvent event,
  ) async* {
    if (position == null) {
      try {
        position = await _determinePosition();
      } catch (e) {
        log(e.toString());
      }
    }

    if (event is MapShowPointsEvent) {
      _getPoints();
      pointsAreVisible = event.mustShowPoints;
    }

    if (event is MapAddPointEvent && pointsAreVisible) {
      interestPoints.add(event.point);
    }

    yield _makeMapState();
  }

  static MapState _defaultMapState() {
    return MapInitialState(List<LatLng>(), false);
  }

  MapState _makeMapState() {
    var points = pointsAreVisible ? interestPoints : List<LatLng>();
    return MapDisplayState(points, pointsAreVisible, position);
  }

  _getPoints() {
    final req = position != null ? 'points/nearMe' : 'points/';
    final queryParams = position != null
        ? {
            'lat': position.latitude,
            'lng': position.longitude,
            'maxDistance': 5000
          }
        : null;
    var res = client.getRequest(req, queryParams);
    res.then((value) {
      this.interestPoints = value.data
          .map<LatLng>((model) => InterestPoint.fromJson(model).location)
          .toList();

      this.add(MapMakeStateEvent());
    });
  }

  Future<Position> _determinePosition() async {
    LocationPermission permission;

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.deniedForever) {
      await Geolocator.openAppSettings();
      return Future.error(
          'Location permissions are permantly denied, we cannot request permissions.');
    }

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission != LocationPermission.whileInUse &&
          permission != LocationPermission.always) {
        return Future.error(
            'Location permissions are denied (actual value: $permission).');
      }
    }

    return await Geolocator.getCurrentPosition();
  }
}
