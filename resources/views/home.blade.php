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
                <div class="column p-b-none">
                    <div class="">
                        Dashboard
                    </div>
                </div>
                <div class="column p-t-none">
                    <div class="level">
                        <div class="level-left">
                            <div class="title">
                                Bienvenido {{ Auth::user()->name }}
                            </div>
                        </div>
                    </div>
                </div>
                <dashboard></dashboard>
            </div>
        </div>
    </div>
</div>
@endsection
