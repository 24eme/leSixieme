<!DOCTYPE html>
<html lang="fr">
 <head>
    @include('layouts.head') 
 </head>
 <body>
    @include('layouts.header')
      @yield('content')
    @include('layouts.footer')
    @include('layouts.footer-scripts')
 </body>
</html>
