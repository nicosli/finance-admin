@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <info-anual-distrito id_distrito="{{$id_distrito}}" mes="{{$mes}}"></info-anual-distrito>
    </div>
</div>
@endsection
