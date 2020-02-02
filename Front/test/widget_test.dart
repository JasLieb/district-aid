// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility that Flutter provides. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:nowaste/main.dart';

void main() {
  testWidgets('favourite smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(MyApp());

    // Verify that our counter starts at 0.
    expect(find.text('toto'), findsOneWidget);
    

    // Tap the '+' icon and trigger a frame.
    await tester.tap(find.byIcon(Icons.favorite_border));
    await tester.pump();

    // Verify that our counter has incremented.
    expect(find.byIcon(IconData(Icons.favorite.codePoint)), findsOneWidget);
  });
}
