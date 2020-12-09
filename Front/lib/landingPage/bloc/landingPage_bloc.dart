import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:url_launcher/url_launcher.dart';

part 'landingPage_event.dart';
part 'landingPage_state.dart';

class LandingPageBloc extends Bloc<LandingPageEvent, LandingPageState> {
  LandingPageBloc() : super(LandingPageInitial());

  @override
  Stream<LandingPageState> mapEventToState(
    LandingPageEvent event,
  ) async* {
    if (event is DownloadAPKEvent) {
      launch("https://district-aid.jaslieb.com/downloads");
      yield DownloadAPKState(true);
    }
  }
}
