import 'package:latlong/latlong.dart';

class InterestPoint {
  final String id;
  final LatLng location;
  final String name;
  final DateTime creationDate;
  final DateTime dueDate;
  final String type;

  InterestPoint(this.id, this.location, this.name, this.creationDate,
      this.dueDate, this.type);

  static InterestPoint fromJson(Map<String, dynamic> json) {
    final dueDate = json['properties']['dueDate'] != null
        ? DateTime.parse(json['properties']['dueDate'])
        : DateTime.now();
    dynamic coordinates = json['localization']['coordinates'];
    dynamic properties = json['properties'];

    return InterestPoint(
        json['_id'].toString(),
        LatLng(coordinates[0].toDouble(), coordinates[1].toDouble()),
        properties['name'],
        DateTime.parse(properties['creationDate']),
        dueDate,
        properties['type']);
  }
}
