@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <reporte-nivelasociacion empresa="{{config('licencia.empresa')}}"></reporte-nivelasociacion>
    </div>
</div>
@endsection
