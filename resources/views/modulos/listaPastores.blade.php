@extends('layouts.app')

@section('content')
<section class="hero is-primary">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Lista de Pastores
      </h1>
      <h2 class="subtitle">
        Módulo para dar seguimiento al perfil de cada pastor
      </h2>
    </div>
  </div>
</section>
<div class="container m-t-md">
    <div class="card">
        <div class="card-content">
            @if (session('status'))
                <div class="alert alert-success">
                    {{ session('status') }}
                </div>
            @endif
            <div id="app" >
                <tabla-pastores></tabla-pastores>
            </div>
        </div>
    </div>
</div>
@endsection
