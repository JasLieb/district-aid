import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:latlong/latlong.dart';
import '../models/interestPoint.dart';

class FormScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return FormScreenState();
  }
}

class FormScreenState extends State<FormScreen> {
  String _name;
//LatLng _location;
  String _location;
  String _type;
  DateTime _dueDate;

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  Widget _buildNameField() {
    return TextFormField(
        decoration: InputDecoration(labelText: 'Name'),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Name is required';
          }
          return null;
        },
        onSaved: (String value) {
          _name = value;
        });
  }

  Widget _buildTypeField() {
    return TextFormField(
        decoration: InputDecoration(labelText: 'Type'),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Type is required';
          }
          return null;
        },
        onSaved: (String value) {
          _name = value;
        });
  }

  Widget _buildLocationField() {
    return TextFormField(
        decoration: InputDecoration(labelText: 'Location'),
        validator: (String value) {
          if (value.isEmpty) {
            return 'Location is required';
          }
          return null;
        },
        onSaved: (String value) {
          _location = value;
        });
  }

  Widget _buildDueDateField(BuildContext context) {
    return RaisedButton(
      child: Text('Pick a date'),
      onPressed: () {
        showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime.now(),
                lastDate: DateTime(2022))
            .then((date) {
          setState(() {
            _dueDate = date;
          });
        });
      },
    );
  }

  //return TextFormField(
  //    decoration: InputDecoration(labelText: 'Due Date'),
  //    validator: (String value) {
  //      if (value.isEmpty) {
  //        return 'Due Date is required';
  //      }
  //      return null;
  //    },
  //    onSaved: (String value) {
  //      _location = value;
  //    });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Form Demo")),
      body: Container(
        margin: EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              _buildNameField(),
              _buildTypeField(),
              _buildLocationField(),
              _buildDueDateField(context),
              SizedBox(height: 100),
              RaisedButton(
                child: Text(
                  'Submit',
                  style: TextStyle(color: Colors.blue, fontSize: 16),
                ),
                onPressed: () {
                  if (!_formKey.currentState.validate()) {
                    return;
                  }

                  _formKey.currentState.save();

                  print(_location);
                  print(_name);
                  print(_type);
                },
              )
            ],
          ),
        ),
      ),
    );
  }
}
