import 'package:dio/dio.dart';

class HttpBaseClient {
  Dio dio;

  HttpBaseClient() {
    // or new Dio with a BaseOptions instance.
    BaseOptions options = new BaseOptions(
      baseUrl: "https://www.district-aid.jaslieb.com/api/",
      connectTimeout: 5000,
      receiveTimeout: 3000,
    );

    dio = new Dio(options);

    // dio.interceptors.add(
    //   InterceptorsWrapper(
    //     onRequest:(RequestOptions options) async {
    //     // Do something before request is sent
    //       return options; //continue
    //     // If you want to resolve the request with some custom data，
    //     // you can return a `Response` object or return `dio.resolve(data)`.
    //     // If you want to reject the request with a error message,
    //     // you can return a `DioError` object or return `dio.reject(errMsg)`
    //     },
    //     onResponse:(Response response) async {
    //     // Do something with response data
    //       return response;
    //     },
    //     onError: (DioError e) async {
    //     // Do something with response error
    //       return  e;
    //     }
    //   )
    // );
  }

  Future<Response> getRequest(String route, {options = ''}) async {
    try {
      Response res = await dio.get(route);
      return res;
      //return Future.wait(res);//dio.resolve(res.data);
    } catch (e) {
      print(e);
      return dio.reject(e);
    }
  }
}
