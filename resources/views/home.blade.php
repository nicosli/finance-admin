@extends('layouts.app')

@section('content')
<div id="app">
    <div class="container m-t-md">
        <div class="card">
            <div class="card-content">
                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @endif

                <dashboard empresa="{{ config('licencia.empresa') }}"></dashboard>

            </div>
        </div>
    </div>
</div>
@endsection
