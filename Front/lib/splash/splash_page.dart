import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        fit: StackFit.expand,
        children: <Widget>[
          Container(
              decoration: BoxDecoration(
                image: new DecorationImage(
                    image: AssetImage('assets/splashscreen_1920px.png'),
                    fit: BoxFit.cover),
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  stops: [0.4, 1],
                  colors: [
                    Color.fromRGBO(5, 80, 83, 1),
                    Color.fromRGBO(56, 239, 125, 1.0),
                  ],
                ),
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Image(
                      image: AssetImage('assets/logo_small.png'),
                      height: 250,
                      fit: BoxFit.contain),
                  SizedBox(height: 64),
                  SizedBox(
                    height: 64,
                    width: 64,
                    child: CircularProgressIndicator(
                        valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                        strokeWidth: 5),
                  ),
                ],
              )),
        ],
      ),
    );
  }
}
