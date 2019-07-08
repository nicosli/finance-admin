@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <info-pastores id_pastor="{{$id_pastor}}" mes="{{$mes}}"></info-pastores>
    </div>
</div>
@endsection
