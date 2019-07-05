@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <info-pastores id="{{$id}}" mes="{{$mes}}"></info-pastores>
    </div>
</div>
@endsection
