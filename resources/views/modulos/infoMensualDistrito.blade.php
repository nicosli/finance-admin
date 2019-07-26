@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <informe-mensual-distrito id_distrito="{{$id_distrito}}"></informe-mensual-distrito>
    </div>
</div>
@endsection
