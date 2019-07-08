@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <info-iglesia 
        id_pastor="{{$id_pastor}}"
        id_iglesia="{{$id_iglesia}}"
        mes="{{$mes}}">
        </info-iglesia>
    </div>
</div>
@endsection
