<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Arca System') }}</title>

    <!-- Styles -->
    <link rel="stylesheet" href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <nav class="navbar is-light" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="{{ asset('/') }}">
                <img src="{{ asset('/img/logo.png') }}" width="112" height="28">
            </a>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            @if (!Auth::guest())
            <div class="navbar-start">
                <a class="navbar-item" href="{{asset('/home')}}">Home</a>

                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">Mayordomía</a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item" href="{{asset('list/pastores')}}">
                            Lista de Pastores
                        </a>
                        <a class="navbar-item" href="{{asset('list/iglesias')}}">
                            Lista de Iglesias
                        </a>
                        <a class="navbar-item" href="{{asset('list/distritos')}}">
                            Lista de Distritos
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item" href="{{asset('report/nivel-asociacion')}}">
                            Reporte Nivel Asociación
                        </a>
                    </div>
                </div>
            </div>
            @endif

            <div class="navbar-end">
                <div class="navbar-item">
                    @if (Auth::guest())
                    <div class="buttons">
                        <a class="button is-light">
                            Log in
                        </a>
                    </div>
                    @else
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">{{ Auth::user()->name }}</a>
                        <div class="navbar-dropdown">
                            <a class="navbar-item" href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                            document.getElementById('logout-form').submit();">
                                Logout
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                {{ csrf_field() }}
                            </form>
                        </div>
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </nav>

    @yield('outContainer')

    @yield('content')

    <footer class="footer">
        <div class="content has-text-centered">
            <p>
            <strong>{{ config('app.name', 'Arca System') }} System</strong> by Montaria Software. Ver <a href="{{asset('licencia')}}" class="lc">Licencia</a>
            </p>
        </div>
    </footer>
    
    <!-- Scripts -->
    <script src="{{ asset('js/manifest.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
    <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>
 
    <script>
        $(document).ready(function() {
            // Check for click events on the navbar burger icon
            $(".navbar-burger").click(function() {

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                $(".navbar-burger").toggleClass("is-active");
                $(".navbar-menu").toggleClass("is-active");

            });
        });
    </script>
</body>
</html>
