import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong/latlong.dart';

import '../models/position.dart';
import 'bloc/map_bloc.dart';

class Map extends StatelessWidget {
  static const String route = '/';
  final _mapBloc = MapBloc()..add(MapInitializationEvent());
  final MapController mapController = new MapController();

  @override
  Widget build(BuildContext context) {
    Position position = new Position(51.5, -0.09);
    var markers = <Marker>[];

    return Scaffold(
        appBar: AppBar(title: Text('district-aid - Accueil')),
        body: BlocBuilder<MapBloc, MapState>(
          cubit: _mapBloc,
          builder: (context, state) {
            if (state is MapDisplayState) {
              markers.clear();
              markers.addAll(_makeMarkers(state.interestPoints));
              if (state.position != null) {
                position = new Position(
                    state.position.latitude, state.position.longitude);
                mapController.fitBounds(new LatLngBounds(
                    LatLng(position.lat + 0.5, position.lng + 0.5),
                    LatLng(position.lat - 0.5, position.lng - 0.5)));
                mapController.move(LatLng(position.lat, position.lng), 13.5);
              }
            }

            return Padding(
              padding: EdgeInsets.all(8.0),
              child: Column(children: [
                Padding(
                  padding: EdgeInsets.only(top: 8.0, bottom: 8.0),
                  child: Text(position.getCoordinateSentence()),
                ),
                Row(children: [
                  ToggleButtons(
                    children: <Widget>[Icon(Icons.info_outline)],
                    onPressed: (_) => _mapBloc
                      ..add(MapShowPointsEvent(!state.pointsAreVisible)),
                    isSelected: [state.pointsAreVisible],
                  ),
                ]),
                Flexible(
                  child: FlutterMap(
                    mapController: mapController,
                    options: MapOptions(
                        center: LatLng(position.lat, position.lng),
                        onLongPress: _handleLongPress,
                        nePanBoundary:
                            LatLng(position.lat + 0.5, position.lng + 0.5),
                        swPanBoundary:
                            LatLng(position.lat - 0.5, position.lng - 0.5)),
                    layers: [
                      new TileLayerOptions(
                        urlTemplate: "https://api.mapbox.com/styles/v1/jaslieb"
                            "/ck7hbpwbg0g4g1iqivxr3c6jk/tiles/256/{z}/{x}/{y}@2x"
                            "?access_token={accessToken}",
                        additionalOptions: {
                          'accessToken': DotEnv().env['MAP_BOX_TOKEN'],
                          'id': 'mapbox.streets',
                        },
                      ),
                      MarkerLayerOptions(markers: markers)
                    ],
                  ),
                ),
              ]),
            );
          },
        ));
  }

  void _handleLongPress(LatLng point) {
    _mapBloc.add(MapAddPointEvent(point));
  }

  List<Marker> _makeMarkers(List<LatLng> points) {
    return points
        .map((latlng) => Marker(
              width: 32,
              height: 32,
              point: latlng,
              builder: (ctx) => Container(
                child: FlutterLogo(),
              ),
            ))
        .toList();
  }
}
