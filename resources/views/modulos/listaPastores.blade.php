@extends('layouts.app')

@section('content')
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
