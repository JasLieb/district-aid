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
  final position = new Position(51.5, -0.09);

  @override
  Widget build(BuildContext context) {
    var markers = <Marker>[];
    return Scaffold(
        appBar: AppBar(title: Text('district-aid - Accueil')),
        body: BlocBuilder<MapBloc, MapState>(
          cubit: _mapBloc,
          builder: (context, state) {
            if (state is MapDisplayState) {
              markers.clear();
              markers.addAll(_makeMarkers(state.interestPoints));
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
                    options: MapOptions(
                        center: LatLng(43.60444832310661, 1.4433717727661133),
                        onLongPress: _handleLongPress,
                        nePanBoundary:
                            LatLng(43.72049745570917, 1.522979736328125),
                        swPanBoundary:
                            LatLng(43.46089378008257, 1.3128662109375)),
                    layers: [
                      new TileLayerOptions(
                        urlTemplate: "https://api.tiles.mapbox.com/v4/"
                            "{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}",
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
