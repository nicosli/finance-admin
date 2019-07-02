@extends('layouts.app')

@section('outContainer')
<section class="hero is-info">
    <div class="hero-body">
        <div class="container">
            <h1 class="title">
                Login 
            </h1>
            <h2 class="subtitle">
                Introduce tus credenciales para poder entrar
            </h2>
        </div>
    </div>
</section>
@endsection

@section('content')
<div class="container m-t-md">
    <div id="app"></div>
    <div class="columns is-centered is-gapless">
        <div class="column is-5-desktop is-5-widescreen is-4-fullhd">
            <div class="card is-rounded">
                <div class="card-content">
                    <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}
                        <div class="field">
                            <label class="label">Correo</label>
                            <div class="control has-icons-left has-icons-right">
                                <input 
                                    id="email" 
                                    type="email" 
                                    class="input {{ $errors->has('email') ? 'is-danger' : '' }}" 
                                    name="email" 
                                    value="{{ old('email') }}">
                                <span class="icon is-small is-left">
                                    <i class="far fa-envelope"></i>
                                </span>
                                @if ($errors->has('email'))
                                <span class="icon is-small is-right">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </span>
                                @endif
                            </div>
                            @if ($errors->has('email'))
                                <p class="help is-danger">{{ $errors->first('email') }}</p>
                            @endif
                        </div>
                        <div class="field">
                            <label class="label">Password</label>
                            <div class="control has-icons-left has-icons-right">
                                <input 
                                id="password" 
                                type="password"
                                class="input {{ $errors->has('password') ? 'is-danger' : '' }}" 
                                name="password">
                                <span class="icon is-small is-left">
                                    <i class="fas fa-lock"></i>
                                </span>
                                @if ($errors->has('password'))
                                <span class="icon is-small is-right">
                                    <i class="fas fa-exclamation-triangle"></i>
                                </span>
                                @endif
                            </div>
                            @if ($errors->has('password'))
                                <p class="help is-danger">{{ $errors->first('password') }}</p>
                            @endif
                        </div>
                        <label class="checkbox">
                            <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                            Recordarme
                        </label>
                        <div class="field m-b-md">
                            <a class="btn btn-link" href="{{ route('password.request') }}">
                                Recuperar Password
                            </a>
                        </div>
                        <div class="field">
                            <button type="submit" class="button is-primary">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>            
        </div>
    </div>
</div>
@endsection
