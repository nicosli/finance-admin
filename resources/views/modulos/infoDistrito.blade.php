@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <info-distrito id_pastor="{{$id_pastor}}"
        id_distrito="{{$id_distrito}}" mes="{{$mes}}"></info-distrito>
    </div>
</div>
@endsection
