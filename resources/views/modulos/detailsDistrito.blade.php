@extends('layouts.app')

@section('content')
<div class="container m-t-md">
    <div id="app" >
        <details-distrito id_distrito="{{$id_distrito}}" mes="{{$mes}}"></details-distrito>
    </div>
</div>
@endsection
